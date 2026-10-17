import Image from 'next/image';
import { site } from '@/data/site';
import { capabilities, processSteps } from '@/data/content';
import { featuredProjects, projects, hostname } from '@/data/projects';
import { V3Nav, Roll } from '@/components/v3/Nav';
import { ContactForm } from '@/components/v3/ContactForm';
import { V3Motion } from '@/components/v3/Motion';

const caseColors = [
  { bg: '#fdcb6e', ink: '#1c1c1c' },
  { bg: '#202020', ink: '#ececec' },
  { bg: '#fae6d6', ink: '#1c1c1c' },
  { bg: '#1149cc', ink: '#eef2ff' },
  { bg: '#a2998b', ink: '#f7f5f2' },
];

const serviceShots = ['branofy', 'siddaganga', 'manu-maharani', 'vetesta'].map(
  (slug) => projects.find((p) => p.slug === slug)?.image?.src ?? '',
);

const [firstHighlight, ...otherHighlights] = site.highlights;
const facts = [firstHighlight, `${projects.length} projects shipped`, ...otherHighlights];

const suits = ['♠', '♦', '♣', '♥'];
const acts = processSteps.map((s, i) => ({ ...s, suit: suits[i % suits.length] }));

function Label({ text, suit, id }: { text: string; suit: string; id?: string }) {
  return (
    <div className="v3-label">
      {id && (
        <h2 id={id} className="sr-only">
          {text}
        </h2>
      )}
      <span aria-hidden="true">{'{'}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="v3-suit">
        {suit}
      </span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">{'}'}</span>
    </div>
  );
}

function Arc({ text, label, suit }: { text: string; label: string; suit: string }) {
  const pathId = `v3-arc-${label.toLowerCase()}`;
  return (
    <section className="v3-arc" data-v3-arc aria-label={text}>
      <div className="v3-arc-stage">
        <Label text={label} suit={suit} />
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path id={pathId} d="M -420 640 Q 720 120 1860 640" fill="none" />
          <text className="v3-arc-measure">{text}</text>
          <text>
            <textPath href={`#${pathId}`} startOffset="100%">
              {text}
            </textPath>
          </text>
        </svg>
        <p className="v3-arc-plain">{text}</p>
      </div>
    </section>
  );
}

const portrait = site.portrait;

export default function V3Page() {
  return (
    <>
      <V3Nav />

      {/* Intro loader: the name splits and the photo grows out of the gap */}
      <div className="v3-loader" data-v3-loader aria-hidden="true">
        <div className="v3-loader-line">
          <span className="v3-mask">
            {site.firstName.toUpperCase().split('').map((c, i) => (
              <span key={i} className="v3-ll">
                {c}
              </span>
            ))}
          </span>
          <span className="v3-box" data-v3-box>
            <span className="v3-box-img" data-v3-box-img>
              <Image src={portrait.src} alt="" fill sizes="100vw" priority />
            </span>
          </span>
          <span className="v3-mask">
            {site.lastName.toUpperCase().split('').map((c, i) => (
              <span key={i} className="v3-ll">
                {c}
              </span>
            ))}
          </span>
        </div>
      </div>

      <main id="main">
        {/* Hero: pinned photo, scattered letters assemble on scroll */}
        <section id="top" className="v3-hero" data-v3-hero>
          <div className="v3-hero-stage">
            <div className="v3-hero-media" data-v3-hero-media>
              <Image src={portrait.src} alt={portrait.alt} fill sizes="100vw" priority />
            </div>
            <h1 className="v3-hero-title" data-v3-scatter>
              I don’t just build websites. <span className="v3-accent">I build them to be found.</span>
            </h1>
            <p className="v3-scroll-hint" aria-hidden="true">
              Scroll
            </p>
          </div>
        </section>

        {/* Statement */}
        <section id="about" className="v3-statement" aria-labelledby="v3-statement-title">
          <h2 id="v3-statement-title" className="v3-wave" data-v3-wave>
            Full-stack developer. Search, answer and AI visibility. {projects.length} projects shipped. Built to be
            found.
          </h2>
          <div className="v3-statement-row">
            <p>{site.bio.short}</p>
            <div className="v3-ctas">
              <a href="#contact" className="v3-btn v3-btn--dark">
                <Roll>Let’s talk</Roll>
              </a>
              <a href="#work" className="v3-btn">
                <Roll>See the work</Roll>
              </a>
            </div>
          </div>
        </section>

        <div className="v3-marquee" aria-label="Quick facts">
          <ul className="v3-marquee-track">
            {[...facts, ...facts].map((f, i) => (
              <li key={i} aria-hidden={i >= facts.length ? true : undefined}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <section id="experience" className="v3-exp" aria-labelledby="v3-exp-title">
          <Label text="Experience" suit="♦" id="v3-exp-title" />
          <ol className="v3-exp-list">
            {site.experience.map((e) => (
              <li key={`${e.company}-${e.period}`} className="v3-exp-row" data-v3-exp-row>
                <span className="v3-exp-period">{e.period}</span>
                <span className="v3-exp-role">{e.role}</span>
                <span className="v3-exp-company">
                  {e.company}
                  {e.current && <span className="v3-exp-now">Now</span>}
                </span>
              </li>
            ))}
            <li className="v3-exp-row" data-v3-exp-row>
              <span className="v3-exp-period">{site.education.years}</span>
              <span className="v3-exp-role">{site.education.degree}</span>
              <span className="v3-exp-company">{site.education.schoolShort}</span>
            </li>
          </ol>
        </section>

        {/* Reel: a collage of real work that grows on scroll */}
        <section className="v3-reel-wrap" aria-label="Not magic. Just structure.">
          <div className="v3-reel" data-v3-reel>
            <p className="v3-reel-text" aria-hidden="true">
              <span>Not magic.</span>
              <span>Just</span>
              <span>structure.</span>
            </p>
            {featuredProjects.map((p, i) =>
              p.image ? (
                <div key={p.slug} className={`v3-reel-shot v3-reel-shot--${i}`} data-v3-depth={(i % 3) + 1}>
                  <Image src={p.image.src} alt="" width={p.image.width} height={p.image.height} sizes="30vw" />
                </div>
              ) : null,
            )}
          </div>
        </section>

        {/* What I do: hover accordion */}
        <section id="services" className="v3-services" aria-labelledby="v3-services-title">
          <Label text="What I do" suit="♥" id="v3-services-title" />
          <ul className="v3-svc-list" data-v3-services>
            {capabilities.map((c, i) => (
              <li key={c.title} className="v3-svc" data-v3-svc>
                <button type="button" className="v3-svc-head" aria-expanded={i === 0}>
                  <span className="v3-svc-num">[ {c.num} ]</span>
                  <span className="v3-svc-title">{c.kicker ? `${c.title} — ${c.kicker}` : c.title}</span>
                </button>
                <div className="v3-svc-body" data-v3-svc-body>
                  <p>{c.summary}</p>
                </div>
                <div className="v3-svc-media" data-v3-svc-media>
                  <Image
                    src={serviceShots[i]}
                    alt=""
                    width={1440}
                    height={900}
                    sizes="(min-width: 992px) 26vw, 90vw"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <div id="work">
          <Arc text="Every launch leaves evidence. Here is what remains." label="Work" suit="♠" />
        </div>

        <section className="v3-cases" aria-label="Selected work" data-v3-cases>
          {featuredProjects.map((p, i) => {
            const c = caseColors[i % caseColors.length];
            return (
              <article key={p.slug} className="v3-case" data-v3-case aria-labelledby={`case-${p.slug}`}>
                <div
                  className="v3-case-card"
                  data-v3-case-card
                  style={{ '--case-bg': c.bg, '--case-ink': c.ink } as React.CSSProperties}
                >
                  <div className="v3-case-top">
                    <h3 id={`case-${p.slug}`}>{p.title}</h3>
                    <span className="v3-case-num">({String(i + 1).padStart(2, '0')})</span>
                  </div>
                  <div className="v3-case-body">
                    <div className="v3-case-copy">
                      <p>{p.description}</p>
                      {p.outcome && <p className="v3-case-outcome">{p.outcome}</p>}
                      <p className="v3-case-meta">{p.category}</p>
                    </div>
                    {p.image && (
                      <div className="v3-case-image">
                        <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(min-width: 992px) 45vw, 90vw" />
                      </div>
                    )}
                  </div>
                  {p.url && (
                    <a className="v3-case-link" href={p.url} target="_blank" rel="noopener noreferrer">
                      <Roll>{`Visit ${hostname(p.url)} ↗`}</Roll>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* Process */}
        <div id="process">
          <Arc text="Behind every launch there are three acts." label="Process" suit="♣" />
        </div>

        <section className="v3-acts" aria-label="How I work" data-v3-acts>
          {acts.map((a) => (
            <div key={a.title} className="v3-act-wrap" data-v3-act-wrap>
              <article className="v3-act" data-v3-act>
                <div className="v3-act-top">
                  <span>{a.step}</span>
                  <span className="v3-act-suit" aria-hidden="true">
                    {a.suit}
                  </span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <ul>
                  {a.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <span className="v3-act-suit v3-act-suit--end" aria-hidden="true">
                  {a.suit}
                </span>
              </article>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section id="contact" className="v3-contact" aria-labelledby="v3-contact-title" data-v3-contact>
          <div className="v3-contact-inner" data-v3-contact-inner>
            <Label text="Let’s talk" suit="♦" />
            <h2 id="v3-contact-title" className="v3-cta-title">
              <span className="v3-cta-line">
                Got an
                <span className="v3-cta-photo" aria-hidden="true">
                  <Image src={portrait.src} alt="" width={portrait.width} height={portrait.height} sizes="14rem" />
                </span>
                idea
              </span>
              <span className="v3-cta-line">
                worth <span className="v3-cta-grad">building?</span>
              </span>
            </h2>

            <ContactForm email={site.email} firstName={site.firstName} />

            <div className="v3-contact-foot">
              <div>
                <p className="v3-small">Follow</p>
                <div className="v3-socials">
                  <a href={site.social.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    in
                  </a>
                  <a href={site.social.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    gh
                  </a>
                  <a href={site.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume (PDF)">
                    cv
                  </a>
                </div>
              </div>
              <div>
                <p className="v3-small">Write</p>
                <a className="v3-mail" href={`mailto:${site.email}`} data-v3-mail>
                  <span>{site.email.replace('@', '@​')}</span>
                  <span className="v3-mail-dup" aria-hidden="true">
                    {site.email.replace('@', '@​')}
                  </span>
                </a>
              </div>
            </div>

            <div className="v3-legal">
              <span>© {site.name}, {new Date().getFullYear()}</span>
              <span>Built to be found</span>
            </div>
          </div>
        </section>
      </main>

      <V3Motion />
    </>
  );
}
