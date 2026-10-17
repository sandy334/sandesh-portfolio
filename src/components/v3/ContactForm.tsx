'use client';

import { useState } from 'react';

// No backend on this site: the form composes an email in the visitor's own mail app.
export function ContactForm({ email, firstName }: { email: string; firstName: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const from = String(data.get('email') || '').trim();
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Hi ${firstName},\n\n\n\n— ${name}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className="v3-form" onSubmit={onSubmit}>
      <label>
        <span className="sr-only">Name</span>
        <input name="name" placeholder="Name" autoComplete="name" required />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input name="email" type="email" placeholder="Email" autoComplete="email" required />
      </label>
      <button type="submit" className={sent ? 'is-sent' : undefined}>
        <span>{sent ? 'Opening your mail app' : 'Submit'}</span>
        <span aria-hidden="true">↵</span>
      </button>
      <p className="v3-form-note" aria-live="polite">
        {sent ? 'Your email app should open with the message ready to send.' : ''}
      </p>
    </form>
  );
}
