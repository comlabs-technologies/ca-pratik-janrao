import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  dark?: boolean;
};

export function SectionHeading({ eyebrow, title, description, action, dark = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${action ? "section-heading-split" : ""}`}>
      <div>
        {eyebrow ? <p className={`eyebrow ${dark ? "dark-label" : ""}`}>{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="section-heading-copy">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
