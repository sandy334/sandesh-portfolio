import Image from 'next/image';
import { featuredProjects, hostname, indexProjects, type Project } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { delay } from '@/lib/motion';

function ProjectPlate({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0');

  const media = project.image ? (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      sizes="(min-width: 1024px) 58vw, 100vw"
      quality={78}
    />
  ) : (
    <div className="plate-empty" aria-hidden="true">
      {project.title}
    </div>
  );

  return (
    <article className="plate" id={`work-${project.slug}`} aria-labelledby={`work-${project.slug}-title`}>
      <div className="plate-media" data-reveal>
        {project.url ? (
          <a
            className="plate-frame"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} (opens in a new tab)`}
          >
            {media}
          </a>
        ) : (
          <div className="plate-frame">{media}</div>
        )}
        <div className="plate-caption">
          <span>{project.url ? hostname(project.url) : project.note}</span>
          <span>{project.year}</span>
        </div>
      </div>

      <div className="plate-body">
        <p className="label plate-kicker" data-reveal>
          <span className="num">{num}</span>
          <span>{project.category}</span>
        </p>
        <h3 id={`work-${project.slug}-title`} className="display-3" data-reveal style={delay(60)}>
          {project.title}
        </h3>
        <p className="plate-desc" data-reveal style={delay(120)}>
          {project.description}
        </p>

        <dl className="facts" data-reveal style={delay(180)}>
          <dt>Role</dt>
          <dd>{project.role}</dd>
          <dt>Services</dt>
          <dd>{project.services.join(' · ')}</dd>
          <dt>Stack</dt>
          <dd>{project.stack.join(' · ')}</dd>
        </dl>

        {project.outcome && (
          <p className="outcome" data-reveal style={delay(240)}>
            <span className="label">Measured outcome</span>
            {project.outcome}
          </p>
        )}
        {!project.outcome && project.note && project.url && (
          <p className="outcome" data-reveal style={delay(240)}>
            <span className="label">Under the hood</span>
            {project.note}
          </p>
        )}

        {project.url && (
          <a className="arrow-link" href={project.url} target="_blank" rel="noopener noreferrer" data-reveal style={delay(300)}>
            Visit {hostname(project.url)}{' '}
            <span className="arrow arrow--diag" aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

function IndexRow({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  const inner = (
    <>
      <span className="num">{num}</span>
      <span className="title">
        <span>{project.title}</span>
        <span className="cat">{project.category}</span>
      </span>
      <p className="desc">{project.description}</p>
      <span className="year">{project.year}</span>
      <span className="arrow" aria-hidden="true">
        {project.url ? '↗' : project.note ? '·' : ''}
      </span>
    </>
  );

  return (
    <li data-reveal style={delay((index % 4) * 60)}>
      {project.url ? (
        <a className="work-row" href={project.url} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <div className="work-row" title={project.note}>
          {inner}
        </div>
      )}
    </li>
  );
}

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          num="01"
          title="Selected Work"
          intro="Things I’ve built, improved, optimized and shipped. Mostly for businesses that need to be found, not just launched."
        />

        <div className="plates">
          {featuredProjects.map((project, i) => (
            <ProjectPlate key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="work-more">
          <div className="work-more-head" data-reveal>
            <h3 className="display-3">Also built</h3>
            <span className="label">Index</span>
          </div>
          <ol className="work-index">
            {indexProjects.map((project, i) => (
              <IndexRow key={project.slug} project={project} index={featuredProjects.length + i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
