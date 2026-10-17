import { journey, needs } from '@/data/content';
import { delay } from '@/lib/motion';

export function Differentiator() {
  return (
    <section id="beyond-launch" className="diff" aria-labelledby="diff-title">
      <div className="container-x">
        <p className="label" data-reveal>
          The difference
        </p>

        <h2 id="diff-title" className="diff-title" data-reveal style={delay(80)}>
          Most people stop at “launch.”
          <span className="serif-i">I don’t.</span>
        </h2>

        <ol className="journey" aria-label="How I work">
          {journey.map((step, i) => (
            <li className="journey-step" key={step} data-reveal style={delay(160 + i * 90)}>
              <span className="idx">0{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="diff-text">
          <p className="statement" data-reveal>
            A website is not finished when it goes live.
          </p>
          <ul className="needs">
            {needs.map((need, i) => (
              <li key={need} data-reveal style={delay(i * 80)}>
                {need}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
