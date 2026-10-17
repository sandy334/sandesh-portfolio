import { Fragment } from 'react';
import { site } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { delay } from '@/lib/motion';

/** Renders *word* from the JSON copy as the serif-italic accent. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*([^*]+)\*/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="serif-i">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

const toneClass = { muted: 'muted', question: 'q' } as const;

export function About() {
  const [firstCert, ...otherCerts] = site.certifications;
  const currentRoles = site.experience.filter((e) => e.current);
  const pastRoles = site.experience.filter((e) => !e.current);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-x">
        <SectionHeading id="about-title" num="04" title="The person behind the code" />

        <div className="about">
          <div className="story">
            {site.bio.story.map((line) => (
              <p key={line.text} className={line.tone ? toneClass[line.tone] : undefined} data-reveal>
                <Emphasis text={line.text} />
              </p>
            ))}
          </div>

          <dl className="dossier" data-reveal style={delay(120)}>
            <div>
              <dt className="label">Based in</dt>
              <dd>
                {site.location.city}, {site.location.country}
              </dd>
            </div>
            {[
              { label: 'Now', items: currentRoles },
              { label: 'Before', items: pastRoles },
            ].map(
              (group) =>
                group.items.length > 0 && (
                  <div key={group.label}>
                    <dt className="label">{group.label}</dt>
                    <dd>
                      {group.items.map((e) => (
                        <Fragment key={`${e.company}-${e.period}`}>
                          {e.role}
                          <span>
                            {e.company} · {e.period}
                          </span>
                        </Fragment>
                      ))}
                    </dd>
                  </div>
                ),
            )}
            <div>
              <dt className="label">Education</dt>
              <dd>
                {site.education.degree}
                <span>
                  {site.education.school} · {site.education.years}
                </span>
              </dd>
            </div>
            {firstCert && (
              <div>
                <dt className="label">Certified</dt>
                <dd>
                  {firstCert.issuer} {firstCert.name}
                  {otherCerts.map((c) => (
                    <span key={c.issuer}>
                      {c.issuer} {c.name}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {site.recognition.map((r) => (
              <div key={r.title}>
                <dt className="label">Recognition</dt>
                <dd>
                  {r.detail}, {r.title}
                  <span>{r.note}</span>
                </dd>
              </div>
            ))}
            <div>
              <dt className="label">Tools</dt>
              <dd>
                {site.tools.build.join(', ')}
                <span>{site.tools.ship.join(', ')}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
