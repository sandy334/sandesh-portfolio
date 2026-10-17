'use client';

import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/data/site';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Header surface + active section, throttled to one frame.
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 8);

      const line = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;

      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= line) current = id;
          else break;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape, manage focus.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const button = menuButton.current;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    firstLink.current?.focus();

    return () => {
      root.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      button?.focus();
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-menu-open={open ? 'true' : 'false'}>
      <div className="container-x header-inner">
        <a href="#top" className="wordmark" aria-label={`${site.name}, back to top`}>
          {site.shortName}
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          <ol>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="nav-link" aria-current={active === item.id ? 'true' : undefined}>
                  {item.num && <span className="num">{item.num}</span>}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <span className="scroll-progress" aria-hidden="true" />

      {open && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <nav aria-label="Primary, mobile">
            <ol>
              {nav.map((item, i) => (
                <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    className="menu-link"
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="num">{item.num || '—'}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mobile-menu-foot">
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="link" href={site.social.linkedin.url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="link" href={site.social.github.url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
