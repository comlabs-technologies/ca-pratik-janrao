import Link from "next/link";
import { Download, Paperclip } from "lucide-react";
import { Badge, formatDateTime, Notice, PageHeader } from "@/components/admin/ui";
import { listSubmissions } from "@/lib/cms/submissions";
import type { SubmissionKind, SubmissionStatus } from "@/lib/cms/types";

export const metadata = { title: "Submissions" };

type Params = { kind?: string; status?: string; q?: string; deleted?: string };

const KINDS: { value: "" | SubmissionKind; label: string }[] = [
  { value: "", label: "All" },
  { value: "contact", label: "Contact" },
  { value: "career", label: "Careers" },
];
const STATUSES: SubmissionStatus[] = ["new", "reviewed", "archived"];

function href(params: Params, patch: Partial<Params>) {
  const merged = { ...params, ...patch, deleted: undefined };
  const query = new URLSearchParams(Object.entries(merged).filter(([, v]) => v) as [string, string][]).toString();
  return `/admin/submissions${query ? `?${query}` : ""}`;
}

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const kind = params.kind === "contact" || params.kind === "career" ? params.kind : undefined;
  const status = STATUSES.includes(params.status as SubmissionStatus) ? (params.status as SubmissionStatus) : undefined;
  const items = await listSubmissions({ kind, status, query: params.q });

  return (
    <>
      <PageHeader
        title="Submissions"
        subtitle="Everyone who has filled in the contact or careers form."
        actions={
          <a className="adm-btn" href={`/api/admin/export${kind ? `?kind=${kind}` : ""}`}>
            <Download size={15} /> Export CSV
          </a>
        }
      />
      <Notice params={params} />

      <div className="adm-toolbar">
        <div className="adm-tabs" role="tablist">
          {KINDS.map((k) => (
            <Link key={k.value} href={href(params, { kind: k.value || undefined })} className={(kind ?? "") === k.value ? "is-active" : undefined}>
              {k.label}
            </Link>
          ))}
        </div>
        <div className="adm-tabs">
          <Link href={href(params, { status: undefined })} className={!status ? "is-active" : undefined}>Any status</Link>
          {STATUSES.map((s) => (
            <Link key={s} href={href(params, { status: s })} className={status === s ? "is-active" : undefined}>
              {s}
            </Link>
          ))}
        </div>
        <form className="adm-search" action="/admin/submissions">
          {kind ? <input type="hidden" name="kind" value={kind} /> : null}
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <input name="q" defaultValue={params.q} placeholder="Search name, email, message…" aria-label="Search submissions" />
        </form>
      </div>

      <section className="adm-card">
        {items.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr><th>Name</th><th>Phone</th><th>Type</th><th>Message</th><th>Status</th><th>Received</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className={item.status === "new" ? "is-unread" : undefined}>
                    <td>
                      <Link href={`/admin/submissions/${item.id}`} className="adm-row-link">{item.name}</Link>
                      <small>{item.email}</small>
                    </td>
                    <td className="adm-nowrap">{item.phone || "—"}</td>
                    <td>
                      <Badge value={item.kind} label={item.kind === "career" ? item.role ?? "Career" : "Contact"} />
                      {item.resume ? <Paperclip size={13} className="adm-inline-icon" aria-label="Has resume" /> : null}
                    </td>
                    <td className="adm-truncate">{item.message}</td>
                    <td><Badge value={item.status} /></td>
                    <td className="adm-nowrap">{formatDateTime(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">{params.q || kind || status ? "No submissions match these filters." : "No submissions yet."}</p>
        )}
      </section>
    </>
  );
}
