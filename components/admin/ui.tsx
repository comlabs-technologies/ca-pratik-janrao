import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="adm-page-head">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p className="adm-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="adm-actions">{actions}</div> : null}
    </header>
  );
}

const TONES: Record<string, string> = {
  new: "amber",
  reviewed: "green",
  archived: "grey",
  draft: "grey",
  published: "green",
  contact: "blue",
  career: "violet",
};

export function Badge({ value, label }: { value: string; label?: string }) {
  return <span className={`adm-badge adm-badge-${TONES[value] ?? "grey"}`}>{label ?? value}</span>;
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

export function Notice({ params }: { params: { saved?: string; deleted?: string } }) {
  if (params.saved) return <p className="adm-flash">Saved successfully.</p>;
  if (params.deleted) return <p className="adm-flash">Deleted.</p>;
  return null;
}
