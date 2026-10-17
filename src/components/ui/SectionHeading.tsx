import { delay } from '@/lib/motion';

type Props = {
  /** id of the h2, referenced by the section's aria-labelledby */
  id: string;
  num: string;
  title: string;
  intro?: string;
};

export function SectionHeading({ id, num, title, intro }: Props) {
  return (
    <div className="section-head">
      <h2 id={id} className="section-title display-2" data-reveal>
        <span className="section-num">{num}</span>
        <span>{title}</span>
      </h2>
      {intro && (
        <p className="lede section-intro" data-reveal style={delay(120)}>
          {intro}
        </p>
      )}
    </div>
  );
}
