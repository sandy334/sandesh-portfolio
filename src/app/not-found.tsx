import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from './(site)/layout';

export const metadata: Metadata = {
  title: 'Not found',
};

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="nf">
        <div className="container-x">
          <p className="label">404</p>
          <h1 className="display-2" style={{ marginTop: '1rem', maxWidth: '14ch' }}>
            This page didn’t make it into the index.
          </h1>
          <p className="lede" style={{ marginTop: '1.25rem', maxWidth: '34ch' }}>
            The rest of the site did. Head back to the start.
          </p>
          <p style={{ marginTop: '2rem' }}>
            <Link className="btn btn-primary" href="/">
              Back to the start{' '}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
