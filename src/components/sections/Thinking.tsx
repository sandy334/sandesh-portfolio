import { beliefs } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { delay } from '@/lib/motion';

export function Thinking() {
  return (
    <section id="thinking" className="section" aria-labelledby="thinking-title">
      <div className="container-x">
        <SectionHeading
          id="thinking-title"
          num="03"
          title="How I Think"
          intro="Not a skills list. The five ideas that decide how I build."
        />

        <ol className="beliefs">
          {beliefs.map((belief, i) => (
            <li className="belief" key={belief.title} data-reveal style={delay((i % 2) * 90)}>
              <h3>{belief.title}</h3>
              <p>{belief.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
