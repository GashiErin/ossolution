// Vercel Edge Function — the Ossolut chatbot backend, same-origin with the
// site (no separate server, no CORS). Streams SSE events the widget
// understands: {type:'text'|'error'|'done'}.
//
// Vercel env vars:
//   ANTHROPIC_API_KEY  (required)
//   CLAUDE_MODEL       (optional)  default claude-haiku-4-5
//   RESEND_API_KEY     (optional)  lead emails — shared with api/contact.js
//   CONTACT_TO         (optional)  where lead emails land — default contact@ossolut.com
//
// Local dev uses the Express server in the ossolut-chatbot repo instead
// (CRA proxy → localhost:4000); keep behavior in sync when editing.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '../lib/chat-config.js';

export const config = { runtime: 'edge' };

const MODEL = process.env.CLAUDE_MODEL || 'claude-haiku-4-5';
const MAX_TOKENS = 2048;
const MAX_HISTORY_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 4000;
const RATE_LIMIT_PER_MINUTE = 20;

const tools = [
  {
    name: 'record_lead',
    description:
      'Save a potential client (lead) so the Ossolut team can follow up. ' +
      'Call this as soon as the visitor shares an email address in the context ' +
      'of wanting help, a quote, or a follow-up. Do not call it for made-up or ' +
      'example email addresses.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "The visitor's name, if they gave one" },
        email: { type: 'string', description: "The visitor's email address, exactly as they wrote it" },
        company: { type: 'string', description: "The visitor's company, if mentioned" },
        problem: { type: 'string', description: "One or two sentences summarizing the visitor's problem or project" },
      },
      required: ['email', 'problem'],
      additionalProperties: false,
    },
  },
];

// Best-effort per-instance rate limit (edge isolates are regional; the goal
// is stopping one visitor from running up the API bill, not perfection).
const requestLog = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - 60_000;
  const timestamps = (requestLog.get(ip) || []).filter((t) => t > windowStart);
  if (timestamps.length >= RATE_LIMIT_PER_MINUTE) return true;
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  if (requestLog.size > 5000) requestLog.clear();
  return false;
}

// Accept only plain text-message history from the browser; drop anything else.
function sanitizeHistory(raw) {
  if (!Array.isArray(raw)) return null;
  const messages = raw
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') return null;
  return messages;
}

// Leads arrive as email via Resend (no writable disk on Vercel). Always
// logged too, so nothing is lost if email sending fails.
async function recordLead(input, page) {
  const lead = { ...input, page, capturedAt: new Date().toISOString() };
  console.log('🎉 New chatbot lead:', JSON.stringify(lead));
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || 'Ossolut Website <onboarding@resend.dev>',
          to: [process.env.CONTACT_TO || 'contact@ossolut.com'],
          subject: `Chatbot lead — ${lead.email}`,
          text:
            `Name: ${lead.name || '—'}\nEmail: ${lead.email}\nCompany: ${lead.company || '—'}\n` +
            `Problem: ${lead.problem}\nPage: ${lead.page || '—'}\nCaptured: ${lead.capturedAt}`,
        }),
      });
      if (!response.ok) console.error('Lead email failed:', response.status, await response.text().catch(() => ''));
    } catch (error) {
      console.error('Lead email error:', error && error.message);
    }
  }
  return 'Lead saved. The Ossolut team has been notified and will follow up.';
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) {
    return Response.json({ error: 'Too many messages — please wait a minute.' }, { status: 429 });
  }

  let body;
  try { body = await request.json(); } catch { body = null; }
  const messages = sanitizeHistory(body && body.messages);
  if (!messages) {
    return Response.json({ error: 'Invalid message history.' }, { status: 400 });
  }
  const page = body && typeof body.page === 'string' ? body.page.slice(0, 300) : undefined;

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: 'The assistant is not configured yet (missing API key).' },
      { status: 503 }
    );
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (payload) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      try {
        // Agentic loop: stream text to the browser; if Claude calls
        // record_lead, execute it and let Claude continue with the result.
        for (let turn = 0; turn < 4; turn++) {
          const messageStream = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            system: SYSTEM_PROMPT,
            tools,
            messages,
          });
          messageStream.on('text', (delta) => sendEvent({ type: 'text', text: delta }));
          const message = await messageStream.finalMessage();

          if (message.stop_reason === 'tool_use') {
            const toolUses = message.content.filter((b) => b.type === 'tool_use');
            messages.push({ role: 'assistant', content: message.content });
            const results = [];
            for (const toolUse of toolUses) {
              const content =
                toolUse.name === 'record_lead'
                  ? await recordLead(toolUse.input, page)
                  : `Unknown tool: ${toolUse.name}`;
              results.push({ type: 'tool_result', tool_use_id: toolUse.id, content });
            }
            messages.push({ role: 'user', content: results });
            continue;
          }
          if (message.stop_reason === 'pause_turn') {
            messages.push({ role: 'assistant', content: message.content });
            continue;
          }
          break;
        }
        sendEvent({ type: 'done' });
      } catch (error) {
        console.error('Chat error:', error && error.message);
        let friendly = 'Something went wrong on our side. Please try again.';
        if (error instanceof Anthropic.AuthenticationError) {
          friendly = 'The assistant is not configured yet (missing or invalid API key).';
        } else if (error instanceof Anthropic.RateLimitError) {
          friendly = 'The assistant is very busy right now — try again in a moment.';
        } else if (error instanceof Anthropic.APIConnectionError) {
          friendly = 'Could not reach the AI service. Please try again.';
        }
        sendEvent({ type: 'error', error: friendly });
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
