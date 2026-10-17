import type { Config } from 'tailwindcss';

/**
 * Tailwind is used for layout utilities. The visual system itself lives in
 * CSS custom properties (see src/app/globals.css) so both themes share one
 * set of tokens.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', 'html[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};

export default config;
