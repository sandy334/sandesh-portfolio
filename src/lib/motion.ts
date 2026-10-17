import type { CSSProperties } from 'react';

/** Stagger helper for [data-reveal] elements: delay(120) → 120ms after the previous one. */
export function delay(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties;
}
