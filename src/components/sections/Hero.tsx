import Image from 'next/image';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container-x">
        <p className="label hero-eyebrow">
          {site.name} — Full-Stack / SEO / AEO / GEO
        </p>

        <h1 id="hero-title" className="display-1">
          <span className="hero-line">
            <span>I don’t just build websites.</span>
          </span>
          <span className="hero-line">
            <span>
              I build them to be <em className="serif-i">found.</em>
            </span>
          </span>
        </h1>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="lede hero-slide hero-slide--1">{site.lede}</p>

            <div className="hero-ctas hero-fade hero-fade--1">
              <a className="btn btn-primary" href="#work">
                Explore my work{' '}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="arrow-link" href="#contact">
                Let’s build something{' '}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <ul className="hero-meta hero-fade hero-fade--2" aria-label="Disciplines">
              {site.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="hero-portrait hero-slide hero-slide--2">
            <figure className="portrait">
              <div className="portrait-frame">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  width={site.portrait.width}
                  height={site.portrait.height}
                  sizes="(min-width: 1024px) 320px, (min-width: 500px) 280px, 230px"
                  quality={80}
                  priority
                />
              </div>
              <figcaption>
                <span>{site.name}</span>
                <span>
                  {site.location.city}, {site.location.country}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        Scroll <span />
      </div>
    </section>
  );
}
