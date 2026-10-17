import { now } from '@/data/content';
import { site } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { delay } from '@/lib/motion';

export function Now() {
  return (
    <section id="now" className="section" aria-labelledby="now-title">
      <div className="container-x">
        <SectionHeading id="now-title" num="05" title="Currently" intro="What has my attention right now." />

        <div className="now-grid">
          {now.map((item, i) => (
            <div className="now-item" key={item.label} data-reveal style={delay((i % 2) * 90)}>
              <span className="label">{item.label}</span>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <p className="contact-note" data-reveal>
          Last updated{' '}
          <time dateTime={site.updated} className="mono">
            {site.updatedLabel}
          </time>
          .
        </p>
      </div>
    </section>
  );
}
