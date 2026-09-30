const MAX = { name: 200, email: 320, type: 100, brief: 5000 };
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissions = new Map();

function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };
}

function esc(s) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed.' }, { Allow: 'POST' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, error: 'Invalid request body.' });
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return json(200, { ok: true });
  }

  const name = String(body.name || '').trim().slice(0, MAX.name);
  const email = String(body.email || '').trim().slice(0, MAX.email);
  const type = String(body.type || '').trim().slice(0, MAX.type);
  const brief = String(body.brief || '').trim().slice(0, MAX.brief);

  if (!name || !brief || !/^\S+@\S+\.\S+$/.test(email)) {
    return json(400, { ok: false, error: 'Please provide a name, a valid email and a short brief.' });
  }

  const ip = String(event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown')
    .split(',')[0]
    .trim();
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return json(429, { ok: false, error: 'Too many submissions - please try again later.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return json(503, { ok: false, error: 'The contact form is not configured yet.' });
  }

  recent.push(now);
  submissions.set(ip, recent);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Ossolut Website <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'ossolut1@gmail.com'],
      reply_to: email,
      subject: `Project inquiry - ${name}${type ? ` (${type})` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${type || '-'}\n\n${brief}`,
      html: `<h2 style="margin:0 0 16px">New project inquiry</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:4px 16px 4px 0;color:#666">Name</td><td>${esc(name)}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Project type</td><td>${esc(type) || '-'}</td></tr>
</table>
<p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;margin-top:16px">${esc(brief)}</p>`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('Resend error:', response.status, detail);
    return json(502, { ok: false, error: 'Could not send your message - please email ossolut1@gmail.com directly.' });
  }

  return json(200, { ok: true });
};
