import { site } from '@/data/site';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { delay } from '@/lib/motion';

const subject = encodeURIComponent('Let’s build something');

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="label" data-reveal>
          Contact
        </p>
        <h2 id="contact-title" className="contact-title" data-reveal style={delay(80)}>
          Have something worth building?
        </h2>
        <p className="lede contact-lede" data-reveal style={delay(160)}>
          Let’s build it, and make sure people can find it.
        </p>

        <div className="contact-cta" data-reveal style={delay(240)}>
          <a className="btn btn-primary" href={`mailto:${site.email}?subject=${subject}`}>
            Start a conversation{' '}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <div className="contact-links" data-reveal style={delay(320)}>
          <div className="contact-link">
            <span className="label">Email</span>
            <a className="val link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>

          <a className="contact-link" href={site.social.linkedin.url} target="_blank" rel="noopener noreferrer">
            <span className="label">LinkedIn</span>
            <span className="val">
              {site.social.linkedin.handle}{' '}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>

          <a className="contact-link" href={site.social.github.url} target="_blank" rel="noopener noreferrer">
            <span className="label">GitHub</span>
            <span className="val">
              {site.social.github.handle}{' '}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>

          <a className="contact-link" href={site.resume} target="_blank" rel="noopener noreferrer">
            <span className="label">Résumé</span>
            <span className="val">
              PDF{' '}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>
        </div>

        <p className="contact-note" data-reveal>
          Based in {site.location.city}, {site.location.country}. {site.availability}
        </p>
      </div>
    </section>
  );
}
