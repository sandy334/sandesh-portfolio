import { Fragment } from 'react';
import { capabilities } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { delay } from '@/lib/motion';

export function WhatIDo() {
  return (
    <section id="what-i-do" className="section" aria-labelledby="what-title">
      <div className="container-x">
        <SectionHeading
          id="what-title"
          num="02"
          title="What I Do"
          intro="I work across the entire digital layer, from the first line of code to the moment someone discovers the finished product."
        />

        <ol className="caps">
          {capabilities.map((cap) => (
            <li className="cap" key={cap.num}>
              <span className="cap-num" data-reveal>
                {cap.num}
              </span>

              <div data-reveal style={delay(60)}>
                <h3 className="cap-title">
                  {cap.title}
                  {cap.kicker && <span className="cap-kicker">{cap.kicker}</span>}
                </h3>
              </div>

              <div className="cap-body" data-reveal style={delay(120)}>
                <p>
                  <strong>{cap.summary}</strong>
                </p>
                <p>{cap.detail}</p>

                <ul className="cap-focus" aria-label={`${cap.title} focus areas`}>
                  {cap.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                {cap.chain && (
                  <p className="chain" aria-label="How discovery flows">
                    {cap.chain.map((step, i) => (
                      <Fragment key={step}>
                        <span>{step}</span>
                        {cap.chain && i < cap.chain.length - 1 && (
                          <span className="arrow" aria-hidden="true">
                            →
                          </span>
                        )}
                      </Fragment>
                    ))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
