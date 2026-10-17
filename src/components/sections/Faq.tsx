import { faq } from '@/data/content';
import { delay } from '@/lib/motion';

/**
 * Short, direct answers to the questions people (and answer engines) ask.
 * Mirrored as FAQPage structured data in JsonLd.tsx.
 */
export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container-x">
        <div className="section-head">
          <h2 id="faq-title" className="display-3" data-reveal>
            Straight answers.
          </h2>
          <p className="lede section-intro" data-reveal style={delay(100)}>
            For people skimming, and for the answer engines reading along.
          </p>
        </div>

        <div className="faq" data-reveal>
          {faq.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <span className="plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
