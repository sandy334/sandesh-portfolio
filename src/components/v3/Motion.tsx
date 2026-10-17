'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import Lenis from 'lenis';

const ACCENT = '#ff5b24';

export function V3Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin);

    const root = document.querySelector<HTMLElement>('.v3');
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    html.classList.add('v3-js');

    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (!reduce) {
      lenis = new Lenis({ anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      /* ---------- Intro loader ---------- */
      const loader = document.querySelector<HTMLElement>('[data-v3-loader]');
      const navItems = document.querySelectorAll('[data-v3-nav-item]');
      if (loader && !reduce) {
        const letters = loader.querySelectorAll('.v3-ll');
        const box = loader.querySelector<HTMLElement>('[data-v3-box]')!;
        const img = loader.querySelector<HTMLElement>('[data-v3-box-img]')!;
        const line = loader.querySelector<HTMLElement>('.v3-loader-line')!;
        const [left, , right] = Array.from(line.children) as HTMLElement[];
        window.scrollTo(0, 0);
        lenis?.stop();
        html.classList.add('v3-locked');
        const unlock = () => {
          html.classList.remove('v3-locked');
          lenis?.start();
          ScrollTrigger.refresh();
        };
        const boxH = () => img.getBoundingClientRect().height || 100;
        gsap.set(line, { x: 0, y: 0, xPercent: -50, yPercent: -50 });
        gsap
          .timeline({ defaults: { ease: 'expo.inOut' }, onComplete: unlock })
          .fromTo(letters, { y: 0, yPercent: 110 }, { yPercent: 0, stagger: 0.035, duration: 1.1, ease: 'expo.out' })
          .fromTo(box, { width: 0 }, { width: () => Math.min((boxH() * 16) / 9, window.innerWidth * 0.5), duration: 1.15 }, '-=0.45')
          .to(box, { width: () => window.innerWidth, duration: 1.35 }, '+=0.2')
          .to(img, { height: () => window.innerHeight, duration: 1.35 }, '<')
          // The two halves differ in width, so slide the line to keep the photo centred.
          .to(line, { x: () => (right.offsetWidth - left.offsetWidth) / 2, duration: 1.35 }, '<')
          .to(loader, { autoAlpha: 0, duration: 0.3, ease: 'none' })
          .from(navItems, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.06 }, '-=0.15');
      } else if (loader) {
        gsap.set(loader, { autoAlpha: 0 });
      }

      /* ---------- Nav: hide on scroll down, show on scroll up ---------- */
      const nav = document.querySelector<HTMLElement>('[data-v3-nav]');
      if (nav && !reduce) {
        ScrollTrigger.create({
          start: 'top top',
          end: 'max',
          onUpdate: (self) => {
            const hide = self.direction === 1 && self.scroll() > 120;
            gsap.to(nav, { yPercent: hide ? -110 : 0, duration: 0.5, ease: 'power3.out', overwrite: true });
          },
        });
      }

      /* ---------- Rolling text on hover ---------- */
      if (!reduce && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll<HTMLElement>('[data-roll]').forEach((roll) => {
          const host = roll.closest('a, button') ?? roll;
          const a = SplitText.create(roll.querySelector('.v3-roll-a'), { type: 'chars' });
          const b = SplitText.create(roll.querySelector('.v3-roll-b'), { type: 'chars' });
          const tl = gsap
            .timeline({ paused: true, defaults: { duration: 0.45, ease: 'power3.inOut', stagger: 0.022 } })
            .to(a.chars, { yPercent: -100 }, 0)
            .to(b.chars, { yPercent: -100 }, 0);
          const on = () => tl.play();
          const off = () => tl.reverse();
          host.addEventListener('mouseenter', on);
          host.addEventListener('mouseleave', off);
          host.addEventListener('focusin', on);
          host.addEventListener('focusout', off);
          cleanups.push(() => {
            host.removeEventListener('mouseenter', on);
            host.removeEventListener('mouseleave', off);
            host.removeEventListener('focusin', on);
            host.removeEventListener('focusout', off);
          });
        });
      }

      /* ---------- Hero: scattered letters assemble while pinned ---------- */
      const scatter = $('[data-v3-scatter]');
      if (scatter && !reduce) {
        const split = SplitText.create(scatter, { type: 'words,chars', charsClass: 'v3-ch' });
        const hero = $('[data-v3-hero]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        });
        tl.from(
          split.chars,
          {
            x: () => gsap.utils.random(-1, 1) * Math.min(280, window.innerWidth * 0.35),
            y: () => gsap.utils.random(-80, 300),
            rotation: () => gsap.utils.random(-30, 30),
            ease: 'power2.out',
            stagger: { each: 0.004, from: 'random' },
          },
          0,
        ).fromTo('[data-v3-hero-media]', { scale: 1.12 }, { scale: 1, ease: 'none' }, 0);
      }

      /* ---------- Statement: colour wave follows scroll ---------- */
      const wave = $('[data-v3-wave]');
      if (wave) {
        const chars = SplitText.create(wave, { type: 'words,chars' }).chars as HTMLElement[];
        const ink = getComputedStyle(wave).color;
        const dim = 'rgba(28, 28, 28, 0.16)';
        if (!reduce) {
          gsap.set(chars, { color: dim });
          let active = 0;
          ScrollTrigger.create({
            trigger: wave,
            start: 'top 85%',
            end: 'bottom 45%',
            onUpdate: (self) => {
              const n = Math.round(self.progress * chars.length);
              if (n > active) {
                for (let i = active; i < n; i++) {
                  gsap
                    .timeline()
                    .to(chars[i], { color: ACCENT, duration: 0.12, ease: 'power2.out', overwrite: true })
                    .to(chars[i], { color: ink, duration: 0.3, ease: 'power2.in' });
                }
              } else {
                for (let i = n; i < active; i++) gsap.to(chars[i], { color: dim, duration: 0.2, overwrite: true });
              }
              active = n;
            },
          });
        }
      }

      /* ---------- Experience: rows rise in one after another ---------- */
      const expRows = $$('[data-v3-exp-row]');
      if (expRows.length && !reduce) {
        gsap.from(expRows, {
          yPercent: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: expRows[0], start: 'top 85%' },
        });
      }

      /* ---------- Reel: grows and parallaxes ---------- */
      const reel = $('[data-v3-reel]');
      if (reel && !reduce) {
        gsap.fromTo(
          reel,
          { scale: 0.5, borderRadius: 28 },
          {
            scale: 1,
            borderRadius: 0,
            ease: 'none',
            scrollTrigger: { trigger: reel, start: 'top bottom', end: 'center center', scrub: 0.4 },
          },
        );
        $$('[data-v3-depth]').forEach((el) => {
          const d = Number(el.dataset.v3Depth);
          gsap.fromTo(
            el,
            { yPercent: 25 * d },
            {
              yPercent: -25 * d,
              ease: 'none',
              scrollTrigger: { trigger: reel, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });
      }

      /* ---------- Services: hover/tap accordion ---------- */
      const items = $$('[data-v3-svc]');
      if (items.length) {
        const OPEN = 'inset(0% 0% 0% 0%)';
        const CLOSED = 'inset(0% 0% 100% 0%)';
        let current = 0;
        const parts = items.map((item) => ({
          item,
          head: item.querySelector<HTMLButtonElement>('.v3-svc-head')!,
          body: item.querySelector<HTMLElement>('[data-v3-svc-body]')!,
          media: item.querySelector<HTMLElement>('[data-v3-svc-media]')!,
        }));
        parts.forEach((p, i) => {
          p.item.classList.toggle('is-open', i === 0);
          gsap.set(p.body, { height: i === 0 ? 'auto' : 0, opacity: i === 0 ? 1 : 0 });
          gsap.set(p.media, { clipPath: i === 0 ? OPEN : CLOSED });
        });
        const activate = (i: number) => {
          if (i === current) return;
          const prev = parts[current];
          const next = parts[i];
          current = i;
          prev.item.classList.remove('is-open');
          next.item.classList.add('is-open');
          prev.head.setAttribute('aria-expanded', 'false');
          next.head.setAttribute('aria-expanded', 'true');
          const d = reduce ? 0 : 1;
          gsap.to(prev.body, { height: 0, opacity: 0, duration: 0.4 * d, ease: 'power2.inOut', overwrite: true });
          gsap.to(next.body, { height: 'auto', opacity: 1, duration: 0.5 * d, ease: 'power2.inOut', overwrite: true });
          gsap.fromTo(prev.media, { clipPath: OPEN, y: 0 }, { clipPath: CLOSED, y: -24, duration: 0.45 * d, ease: 'power3.inOut' });
          gsap.fromTo(next.media, { clipPath: CLOSED, y: -24 }, { clipPath: OPEN, y: 0, duration: 0.8 * d, ease: 'power3.out' });
        };
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        parts.forEach((p, i) => {
          const go = () => activate(i);
          p.head.addEventListener('click', go);
          p.head.addEventListener('focus', go);
          if (fine) p.item.addEventListener('mouseenter', go);
          cleanups.push(() => {
            p.head.removeEventListener('click', go);
            p.head.removeEventListener('focus', go);
            p.item.removeEventListener('mouseenter', go);
          });
        });
      }

      /* ---------- Curved text along an arc ---------- */
      $$('[data-v3-arc]').forEach((section) => {
        if (reduce) return;
        const path = section.querySelector<SVGPathElement>('path')!;
        const textPath = section.querySelector<SVGTextPathElement>('textPath')!;
        const measure = section.querySelector<SVGTextElement>('.v3-arc-measure')!;
        const pathLen = path.getTotalLength();
        const textLen = () => measure.getComputedTextLength();
        // How much of the path is on screen depends on the viewport's shape (the SVG is
        // cropped to fill it), so find where the path crosses each screen edge.
        const edges = () => {
          const ctm = path.getScreenCTM();
          if (!ctm) return { enter: pathLen * 0.84, exit: pathLen * 0.16 };
          const screenX = (l: number) => {
            const p = path.getPointAtLength(l);
            return ctm.a * p.x + ctm.c * p.y + ctm.e;
          };
          let enter = pathLen;
          let exit = 0;
          for (let l = 0; l <= pathLen; l += 8) {
            const x = screenX(l);
            if (x < 0) exit = l;
            if (x > window.innerWidth && l < enter) enter = l;
          }
          return { enter, exit };
        };
        gsap.fromTo(
          textPath,
          { attr: { startOffset: () => edges().enter } },
          {
            attr: { startOffset: () => edges().exit - textLen() },
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      /* ---------- Cases: stacked cards tilt away as the next arrives ---------- */
      const cases = $$('[data-v3-case]');
      // A card taller than the screen sticks only once its bottom is in view, so it can be read in full.
      const setStickyTops = () =>
        cases.forEach((c) => c.style.setProperty('--stick-top', `${Math.min(0, window.innerHeight - c.offsetHeight)}px`));
      setStickyTops();
      ScrollTrigger.addEventListener('refreshInit', setStickyTops);
      cleanups.push(() => ScrollTrigger.removeEventListener('refreshInit', setStickyTops));
      if (!reduce) {
        cases.forEach((slide, i) => {
          const next = cases[i + 1];
          if (!next) return;
          gsap.to(slide.querySelector('[data-v3-case-card]'), {
            rotationX: 38,
            rotationZ: gsap.utils.random(-5, 5),
            scale: 0.72,
            ease: 'power1.in',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: 0.8 },
          });
        });
      }

      /* ---------- Acts: fanned cards with momentum hover ---------- */
      const acts = $('[data-v3-acts]');
      if (acts) {
        const wraps = $$('[data-v3-act-wrap]');
        const mm = gsap.matchMedia();
        cleanups.push(() => mm.revert());
        mm.add(
          { desktop: '(min-width: 992px)', mobile: '(max-width: 991px)' },
          (c) => {
            if (c.conditions?.desktop) {
              const center = (wraps.length - 1) / 2;
              wraps.forEach((el, i) => {
                const dist = i - center;
                gsap.set(el, { rotation: 6 * dist, x: () => window.innerWidth * 0.24 * dist, y: 40 * dist * dist });
              });
              if (!reduce) {
                gsap.from(wraps, {
                  rotation: 40,
                  y: 200,
                  stagger: 0.08,
                  ease: 'elastic.out(1, 0.75)',
                  duration: 1.6,
                  scrollTrigger: { trigger: acts, start: 'top 70%', toggleActions: 'play none none reverse' },
                });
              }
              if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
              let px = 0, py = 0, vx = 0, vy = 0;
              const onMove = (e: MouseEvent) => {
                vx = e.clientX - px;
                vy = e.clientY - py;
                px = e.clientX;
                py = e.clientY;
              };
              acts.addEventListener('mousemove', onMove);
              const clampXY = gsap.utils.clamp(-320, 320);
              const clampRot = gsap.utils.clamp(-50, 50);
              const handlers = wraps.map((el) => {
                const card = el.querySelector<HTMLElement>('[data-v3-act]')!;
                const h = (e: MouseEvent) => {
                  const r = card.getBoundingClientRect();
                  const ox = e.clientX - (r.left + r.width / 2);
                  const oy = e.clientY - (r.top + r.height / 2);
                  const torque = (ox * vy - oy * vx) / (Math.hypot(ox, oy) || 1);
                  gsap.to(card, {
                    inertia: {
                      x: { velocity: clampXY(vx * 50), end: 0 },
                      y: { velocity: clampXY(vy * 50), end: 0 },
                      rotation: { velocity: clampRot(torque * 36), end: 0 },
                      resistance: 140,
                    },
                  });
                };
                el.addEventListener('mouseenter', h);
                return () => el.removeEventListener('mouseenter', h);
              });
              return () => {
                acts.removeEventListener('mousemove', onMove);
                handlers.forEach((off) => off());
              };
            }
            if (!reduce) {
              wraps.forEach((el) =>
                gsap.from(el, {
                  y: 60,
                  opacity: 0,
                  duration: 0.9,
                  ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 88%' },
                }),
              );
            }
          },
        );
      }

      /* ---------- Contact: parallax in, cursor-lit email ---------- */
      const contact = $('[data-v3-contact]');
      if (contact && !reduce) {
        gsap.from('[data-v3-contact-inner]', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: contact, start: 'top bottom', end: 'top top', scrub: 0.6 },
        });
      }
      const mail = $('[data-v3-mail]');
      if (mail && !reduce) {
        const dup = mail.querySelector<HTMLElement>('.v3-mail-dup')!;
        const xTo = gsap.quickTo(dup, '--mx', { duration: 0.4, ease: 'back' });
        const yTo = gsap.quickTo(dup, '--my', { duration: 0.4, ease: 'back' });
        const move = (e: MouseEvent) => {
          const r = mail.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width) * 100);
          yTo(((e.clientY - r.top) / r.height) * 100);
        };
        mail.addEventListener('mousemove', move);
        cleanups.push(() => mail.removeEventListener('mousemove', move));
      }
    }, root);

    // Positions depend on web fonts and images; measure again once they settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    // The mobile menu should freeze smooth scrolling while open.
    const menuObserver = new MutationObserver(() => {
      if (html.classList.contains('v3-menu-open')) lenis?.stop();
      else if (!html.classList.contains('v3-locked')) lenis?.start();
    });
    menuObserver.observe(html, { attributes: true, attributeFilter: ['class'] });

    return () => {
      menuObserver.disconnect();
      window.removeEventListener('load', refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      html.classList.remove('v3-js', 'v3-locked');
    };
  }, []);

  return null;
}
