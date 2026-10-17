'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type Props = {
  /** Contact Worker URL. When empty, the form falls back to composing an email. */
  endpoint: string;
  email: string;
  firstName: string;
};

export function ContactForm({ endpoint, email, firstName }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const mailto = (name: string, from: string, message: string) => {
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Hi ${firstName},\n\n${message}\n\n— ${name}\n${from}`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!endpoint) {
      window.location.href = mailto(data.name, data.email, data.message);
      setStatus('sent');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'Could not send right now.');
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send right now.');
      setStatus('error');
    }
  };

  const label = { idle: 'Submit', sending: 'Sending…', sent: 'Sent', error: 'Try again' }[status];

  return (
    <form className="v3-form" onSubmit={onSubmit} onChange={() => status === 'sent' && setStatus('idle')}>
      <label>
        <span className="sr-only">Name</span>
        <input name="name" placeholder="Name" autoComplete="name" maxLength={100} required />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input name="email" type="email" placeholder="Email" autoComplete="email" maxLength={200} required />
      </label>
      <label className="v3-form-message">
        <span className="sr-only">Message</span>
        <textarea name="message" placeholder="What are you building?" rows={4} maxLength={5000} />
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <label className="v3-hp" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" className={status === 'sent' ? 'is-sent' : undefined} disabled={status === 'sending'}>
        <span>{label}</span>
        <span aria-hidden="true">{status === 'sent' ? '✓' : '↵'}</span>
      </button>
      <p className="v3-form-note" aria-live="polite">
        {status === 'sent' && (endpoint ? 'Thanks, your message is on its way. I’ll get back to you soon.' : 'Your email app should open with the message ready to send.')}
        {status === 'error' && (
          <>
            {error} You can also email me at <a href={`mailto:${email}`}>{email}</a>.
          </>
        )}
      </p>
    </form>
  );
}
