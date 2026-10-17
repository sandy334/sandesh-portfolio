/**
 * Contact-form relay. The static site posts here; this Worker holds the Resend key
 * (as a secret, never in the repo) and emails the submission to the address in profile.json.
 */
import profile from '../../src/data/profile.json';

interface Env {
  RESEND_API_KEY: string;
  ALLOWED_ORIGINS: string;
}

type Payload = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, message: 5000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function cors(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  if (!origin || !allowed.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

const json = (body: object, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = cors(request.headers.get('Origin'), env);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, corsHeaders);
    // Browsers on other sites can't read the response anyway; refuse them outright to save the email quota.
    if (!corsHeaders['Access-Control-Allow-Origin']) return json({ error: 'Origin not allowed' }, 403, {});

    let data: Payload;
    try {
      data = await request.json();
    } catch {
      return json({ error: 'Invalid request' }, 400, corsHeaders);
    }

    // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
    if (typeof data.company === 'string' && data.company.trim()) return json({ ok: true }, 200, corsHeaders);

    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const message = typeof data.message === 'string' ? data.message.trim() : '';

    if (!name || name.length > LIMITS.name) return json({ error: 'Please add your name.' }, 400, corsHeaders);
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
      return json({ error: 'Please add a valid email.' }, 400, corsHeaders);
    if (message.length > LIMITS.message) return json({ error: 'Message is too long.' }, 400, corsHeaders);

    const text = `${message || '(no message)'}\n\n— ${name}\n${email}`;
    const html = `<p style="white-space:pre-wrap">${escapeHtml(message || '(no message)')}</p>
<p>— ${escapeHtml(name)}<br><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Resend's shared sender works without a verified domain, but only delivers to the account owner.
        from: 'Portfolio <onboarding@resend.dev>',
        to: [profile.email],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return json({ error: 'Could not send right now.' }, 502, corsHeaders);
    }
    return json({ ok: true }, 200, corsHeaders);
  },
};
