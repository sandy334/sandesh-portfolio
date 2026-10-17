import { site } from '@/data/site';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-x footer-inner">
        <div className="footer-brand">
          <span className="wordmark">{site.shortName}</span>
          <span>{site.roleShort}</span>
          <span className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
            © {year} {site.name}
          </span>
        </div>

        <ul className="footer-links">
          <li>
            <a className="link" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="link" href={site.social.linkedin.url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link" href={site.social.github.url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="arrow-link" href="#top" style={{ fontSize: 'inherit', fontWeight: 400 }}>
              Back to top <span className="arrow" aria-hidden="true">↑</span>
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </footer>
  );
}
