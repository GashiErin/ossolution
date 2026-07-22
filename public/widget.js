/**
 * Ossolut chat widget — embed on any site with:
 *   <script src="https://YOUR-SERVER/widget.js" defer
 *           data-endpoint="https://YOUR-SERVER/api/chat"
 *           data-name="Ossolut Assistant"
 *           data-color="#0b1730"
 *           data-greeting="Hi! Tell me about the problem you're trying to solve."
 *           data-teaser="Got a problem we can solve? Ask me."></script>
 * All data-* attributes are optional.
 */
(function () {
  'use strict';

  const script = document.currentScript;
  const config = {
    endpoint: (script && script.dataset.endpoint) || '/api/chat',
    name: (script && script.dataset.name) || 'Ossolut Assistant',
    color: (script && script.dataset.color) || '#0b1730',
    greeting:
      (script && script.dataset.greeting) ||
      "Hi! I'm the Ossolut assistant. Tell me about the problem you're trying to solve and I'll show you how we can fix it.",
    teaser: (script && script.dataset.teaser) || 'Got a problem we can solve? Ask me.',
  };

  const STARTERS = [
    'Automate a workflow for us',
    'We need a website',
    'Security check on our app',
    'What would my project cost?',
  ];

  const STORE_KEY = 'ossolut-chat-history';
  const TEASER_KEY = 'ossolut-chat-teased';

  let history = [];
  try {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        history = parsed.filter(
          (m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
        );
      }
    }
  } catch { /* corrupted storage — start fresh */ }

  function persist() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-40))); } catch { /* storage full/blocked */ }
  }

  const host = document.createElement('div');
  host.id = 'ossolut-chat-widget';
  const shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      .root {
        position: fixed; bottom: 24px; right: 24px; z-index: 2147483000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
      }
      .teaser {
        display: none; align-items: center; gap: 10px; max-width: 260px;
        background: #fff; color: #1e293b; border: 1px solid #e2e8f0;
        border-radius: 14px; padding: 12px 14px; font-size: 13.5px; line-height: 1.4;
        box-shadow: 0 8px 24px rgba(0,0,0,.18); cursor: pointer;
        animation: teaser-in .4s ease;
      }
      .teaser.show { display: flex; }
      .teaser .x { border: 0; background: none; color: #94a3b8; font-size: 15px; cursor: pointer; padding: 2px; flex: none; }
      @keyframes teaser-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      .launcher {
        width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
        background: ${config.color}; color: #fff; display: flex; align-items: center;
        justify-content: center; box-shadow: 0 8px 24px rgba(0,0,0,.25);
        transition: transform .15s ease;
      }
      .launcher:hover { transform: scale(1.06); }
      .launcher svg { width: 28px; height: 28px; }
      .panel {
        display: none; flex-direction: column; width: 370px; max-width: calc(100vw - 32px);
        height: 540px; max-height: calc(100vh - 120px); background: #fff;
        border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,.28);
      }
      .panel.open { display: flex; }
      .header {
        background: ${config.color}; color: #fff; padding: 14px 16px;
        display: flex; align-items: center; gap: 10px;
      }
      .header .dot { width: 9px; height: 9px; border-radius: 50%; background: #4ade80; flex: none; }
      .header .title { font-size: 15px; font-weight: 600; flex: 1; }
      .header .close {
        background: none; border: none; color: #fff; cursor: pointer;
        font-size: 20px; line-height: 1; padding: 4px; opacity: .85;
      }
      .header .close:hover { opacity: 1; }
      .messages {
        flex: 1; overflow-y: auto; padding: 16px; display: flex;
        flex-direction: column; gap: 10px; background: #f8fafc;
      }
      .msg {
        max-width: 85%; padding: 10px 13px; border-radius: 14px;
        font-size: 14px; line-height: 1.45; white-space: pre-wrap;
        overflow-wrap: break-word;
      }
      .msg.bot { background: #fff; color: #1e293b; align-self: flex-start;
        border: 1px solid #e2e8f0; border-bottom-left-radius: 4px; }
      .msg.user { background: ${config.color}; color: #fff; align-self: flex-end;
        border-bottom-right-radius: 4px; }
      .msg.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
      .msg code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px;
        font-size: 13px; font-family: ui-monospace, Consolas, monospace; }
      .msg.user code { background: rgba(255,255,255,.2); }
      .chips { display: flex; flex-wrap: wrap; gap: 8px; align-self: flex-start; }
      .chips button {
        border: 1px solid ${config.color}; color: ${config.color}; background: #fff;
        border-radius: 20px; padding: 8px 13px; font-size: 12.5px; cursor: pointer;
        transition: .15s;
      }
      .chips button:hover { background: ${config.color}; color: #fff; }
      .typing { display: inline-flex; gap: 4px; padding: 4px 0; }
      .typing span { width: 7px; height: 7px; border-radius: 50%; background: #94a3b8;
        animation: blink 1.2s infinite both; }
      .typing span:nth-child(2) { animation-delay: .2s; }
      .typing span:nth-child(3) { animation-delay: .4s; }
      @keyframes blink { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
      .inputRow { display: flex; gap: 8px; padding: 12px; background: #fff;
        border-top: 1px solid #e2e8f0; }
      .inputRow textarea {
        flex: 1; resize: none; border: 1px solid #cbd5e1; border-radius: 10px;
        padding: 9px 12px; font-size: 14px; font-family: inherit; height: 40px;
        outline: none; line-height: 1.4;
      }
      .inputRow textarea:focus { border-color: ${config.color}; }
      .inputRow button {
        border: none; background: ${config.color}; color: #fff; border-radius: 10px;
        width: 44px; cursor: pointer; display: flex; align-items: center;
        justify-content: center; flex: none;
      }
      .inputRow button:disabled { opacity: .5; cursor: default; }
      .inputRow button svg { width: 18px; height: 18px; }
      .brand { text-align: center; font-size: 11px; color: #94a3b8; padding: 0 0 8px;
        background: #fff; }
      @media (prefers-reduced-motion: reduce) {
        .teaser, .typing span { animation: none; }
      }
    </style>
    <div class="root">
      <div class="teaser" role="button" tabindex="0">
        <span class="text"></span>
        <button class="x" aria-label="Dismiss">&#10005;</button>
      </div>
      <div class="panel" role="dialog" aria-label="${config.name}">
        <div class="header">
          <span class="dot"></span>
          <span class="title">${config.name}</span>
          <button class="close" aria-label="Close chat">&#10005;</button>
        </div>
        <div class="messages"></div>
        <div class="inputRow">
          <textarea rows="1" placeholder="Describe your problem..." aria-label="Message"></textarea>
          <button class="send" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="brand">Powered by Ossolut</div>
      </div>
      <button class="launcher" aria-label="Open chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;

  const panel = shadow.querySelector('.panel');
  const launcher = shadow.querySelector('.launcher');
  const closeBtn = shadow.querySelector('.close');
  const messagesEl = shadow.querySelector('.messages');
  const textarea = shadow.querySelector('textarea');
  const sendBtn = shadow.querySelector('.send');
  const teaser = shadow.querySelector('.teaser');
  const teaserText = shadow.querySelector('.teaser .text');
  const teaserClose = shadow.querySelector('.teaser .x');

  let busy = false;
  let opened = false;
  let chipsEl = null;

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Minimal formatting: **bold** and `code`. Everything else stays plain text.
  function format(text) {
    return escapeHtml(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function addMessage(role, text) {
    const el = document.createElement('div');
    el.className = 'msg ' + role;
    el.innerHTML = format(text);
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'msg bot';
    el.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function showChips() {
    if (chipsEl) return;
    chipsEl = document.createElement('div');
    chipsEl.className = 'chips';
    STARTERS.forEach((label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', () => {
        textarea.value = label;
        send();
      });
      chipsEl.appendChild(b);
    });
    messagesEl.appendChild(chipsEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideChips() {
    if (chipsEl) { chipsEl.remove(); chipsEl = null; }
  }

  function renderHistory() {
    messagesEl.innerHTML = '';
    chipsEl = null;
    history.forEach((m) => addMessage(m.role === 'user' ? 'user' : 'bot', m.content));
    if (!history.some((m) => m.role === 'user')) showChips();
  }

  function openPanel() {
    opened = true;
    hideTeaser();
    panel.classList.add('open');
    launcher.style.display = 'none';
    if (history.length === 0) {
      history.push({ role: 'assistant', content: config.greeting });
      persist();
    }
    renderHistory();
    textarea.focus();
  }

  function closePanel() {
    panel.classList.remove('open');
    launcher.style.display = 'flex';
  }

  function hideTeaser() {
    teaser.classList.remove('show');
    try { sessionStorage.setItem(TEASER_KEY, '1'); } catch { /* ignore */ }
  }

  // Teaser bubble: invite the visitor once per browser session.
  try {
    if (!sessionStorage.getItem(TEASER_KEY) && history.length === 0) {
      setTimeout(() => {
        if (!opened) {
          teaserText.textContent = config.teaser;
          teaser.classList.add('show');
        }
      }, 6000);
    }
  } catch { /* storage blocked — skip teaser */ }

  async function send() {
    const text = textarea.value.trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    textarea.value = '';
    hideChips();

    addMessage('user', text);
    history.push({ role: 'user', content: text });
    persist();

    const bubble = addTyping();
    let botText = '';

    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, page: window.location.href }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed (' + response.status + ')');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n\n');
        buffer = lines.pop(); // keep incomplete chunk
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          let event;
          try {
            event = JSON.parse(line.slice(6));
          } catch {
            continue;
          }
          if (event.type === 'text') {
            botText += event.text;
            bubble.innerHTML = format(botText);
            messagesEl.scrollTop = messagesEl.scrollHeight;
          } else if (event.type === 'error') {
            throw new Error(event.error);
          }
        }
      }

      if (botText) {
        history.push({ role: 'assistant', content: botText });
        persist();
      } else {
        bubble.remove();
      }
    } catch (err) {
      bubble.className = 'msg error';
      bubble.textContent = err.message || 'Something went wrong. Please try again.';
      history.pop(); // let the user resend the same question
      persist();
    } finally {
      busy = false;
      sendBtn.disabled = false;
      textarea.focus();
    }
  }

  launcher.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  sendBtn.addEventListener('click', send);
  teaser.addEventListener('click', (e) => {
    if (e.target === teaserClose) return;
    openPanel();
  });
  teaser.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openPanel();
  });
  teaserClose.addEventListener('click', hideTeaser);
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  if (document.body) {
    document.body.appendChild(host);
  } else {
    document.addEventListener('DOMContentLoaded', () =>
      document.body.appendChild(host)
    );
  }
})();
