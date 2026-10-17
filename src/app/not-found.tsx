import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not found',
};

export default function NotFound() {
  return (
    <main id="main" className="v3-404">
      <p className="v3-404-code">404</p>
      <h1>This page didn’t make it into the index.</h1>
      <Link className="v3-btn v3-btn--dark" href="/">
        Back to the start
      </Link>
    </main>
  );
}
