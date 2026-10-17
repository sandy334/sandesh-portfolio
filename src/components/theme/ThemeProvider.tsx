'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '@/lib/theme';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  /** null until mounted (the inline script has already applied the real theme). */
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: null,
  setTheme: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  const apply = useCallback((next: Theme, persist: boolean) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    setThemeState(next);
    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable: theme still applies for this visit */
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    setThemeState(current === 'dark' ? 'dark' : 'light');

    // Enable colour transitions only after the first frame has painted.
    const frame = requestAnimationFrame(() => root.classList.add('theme-ready'));

    // Follow the system while the visitor has not chosen explicitly.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        /* ignore */
      }
      apply(e.matches ? 'dark' : 'light', false);
    };
    media.addEventListener('change', onChange);

    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener('change', onChange);
    };
  }, [apply]);

  const setTheme = useCallback((next: Theme) => apply(next, true), [apply]);
  const toggle = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    apply(current === 'dark' ? 'light' : 'dark', true);
  }, [apply]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
