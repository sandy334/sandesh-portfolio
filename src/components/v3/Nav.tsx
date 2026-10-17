'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

export const v3Links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
];

export function Roll({ children }: { children: string }) {
  return (
    <span className="v3-roll" data-roll>
      <span className="v3-roll-a">{children}</span>
      <span className="v3-roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function V3Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('v3-menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="v3-nav" data-v3-nav>
        <a href="#top" className="v3-logo" aria-label={`${site.name}, back to top`}>
          <span className="v3-mask">
            <span data-v3-nav-item>{site.shortName.toUpperCase()}</span>
          </span>
        </a>
        <nav className="v3-links" aria-label="Primary">
          {v3Links.map((l) => (
            <span key={l.href} className="v3-mask">
              <a href={l.href} data-v3-nav-item>
                <Roll>{l.label}</Roll>
              </a>
            </span>
          ))}
        </nav>
        <span className="v3-mask v3-talk-wrap">
          <a href="#contact" className="v3-talk" data-v3-nav-item>
            <Roll>Let’s talk</Roll>
          </a>
        </span>
        <span className="v3-mask v3-menu-wrap">
          <button
            type="button"
            className="v3-menu-btn"
            aria-expanded={open}
            aria-controls="v3-menu"
            onClick={() => setOpen((v) => !v)}
            data-v3-nav-item
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </span>
      </header>

      <div id="v3-menu" className={`v3-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Primary, mobile">
          {[...v3Links, { href: '#contact', label: 'Let’s talk' }].map((l, i) => (
            <a key={l.href} href={l.href} onClick={close} style={{ '--i': i } as React.CSSProperties}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
