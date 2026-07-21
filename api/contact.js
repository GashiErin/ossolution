// Vercel serverless function — receives the site's contact form and forwards
// it by email via Resend (https://resend.com).
//
// Configure in Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY  (required)  from https://resend.com/api-keys
//   CONTACT_TO      (optional)  where inquiries land        — default contact@ossolut.com
//   CONTACT_FROM    (optional)  verified sender address     — default onboarding@resend.dev
//                               (switch to e.g. "Ossolut <inquiry@ossolut.com>"
//                               once ossolut.com is verified in Resend → Domains)

const MAX = { name: 200, email: 320, type: 100, brief: 5000 };
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;
const submissions = new Map(); // best-effort per-instance rate limit

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const body = req.body || {};

  // Honeypot: the hidden "website" field is invisible to humans. Bots fill it
  // in — pretend success so they don't retry.
  if (typeof body.website === 'string' && body.website.trim()) {
    return res.status(200).json({ ok: true });
  }

  const name = String(body.name || '').trim().slice(0, MAX.name);
  const email = String(body.email || '').trim().slice(0, MAX.email);
  const type = String(body.type || '').trim().slice(0, MAX.type);
  const brief = String(body.brief || '').trim().slice(0, MAX.brief);

  if (!name || !brief || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a name, a valid email and a short brief.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return res.status(429).json({ ok: false, error: 'Too many submissions — please try again later.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ ok: false, error: 'The contact form is not configured yet.' });
  }

  recent.push(now);
  submissions.set(ip, recent);

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Ossolut Website <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'contact@ossolut.com'],
      reply_to: email,
      subject: `Project inquiry — ${name}${type ? ` (${type})` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${type || '—'}\n\n${brief}`,
      html: `<h2 style="margin:0 0 16px">New project inquiry</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:4px 16px 4px 0;color:#666">Name</td><td>${esc(name)}</td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
  <tr><td style="padding:4px 16px 4px 0;color:#666">Project type</td><td>${esc(type) || '—'}</td></tr>
</table>
<p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;margin-top:16px">${esc(brief)}</p>`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('Resend error:', response.status, detail);
    return res.status(502).json({ ok: false, error: 'Could not send your message — please email contact@ossolut.com directly.' });
  }

  return res.status(200).json({ ok: true });
};
