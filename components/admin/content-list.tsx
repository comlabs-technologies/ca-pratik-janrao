import Link from "next/link";
import { Eye, EyeOff, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { removeContent, setContentStatus } from "@/app/admin/actions";
import { ConfirmButton } from "./confirm-button";
import { Badge, formatDate, Notice, PageHeader } from "./ui";
import type { CmsCaseStudy, CmsPost, ContentKind } from "@/lib/cms/types";

const COPY = {
  post: { title: "Blogs", subtitle: "Articles published on the Blogs page.", base: "/admin/blogs", live: "/blogs", noun: "post" },
  "case-study": { title: "Case studies", subtitle: "Client stories published on the Case Studies page.", base: "/admin/case-studies", live: "/case-studies", noun: "case study" },
} as const;

export function ContentList({ kind, items, params }: { kind: ContentKind; items: (CmsPost | CmsCaseStudy)[]; params: { saved?: string; deleted?: string } }) {
  const copy = COPY[kind];
  return (
    <>
      <PageHeader
        title={copy.title}
        subtitle={copy.subtitle}
        actions={
          <Link className="adm-btn adm-btn-primary" href={`${copy.base}/new`}>
            <Plus size={15} /> New {copy.noun}
          </Link>
        }
      />
      <Notice params={params} />

      <section className="adm-card">
        {items.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr><th>Title</th><th>{kind === "post" ? "Category" : "Client"}</th><th>Status</th><th>Updated</th><th aria-label="Actions" /></tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const published = item.status === "published";
                  return (
                    <tr key={item.id}>
                      <td>
                        <Link href={`${copy.base}/${item.id}`} className="adm-row-link">{item.title}</Link>
                        <small>/{item.slug}</small>
                      </td>
                      <td>{kind === "post" ? (item as CmsPost).category : (item as CmsCaseStudy).client || "—"}</td>
                      <td><Badge value={item.status} /></td>
                      <td className="adm-nowrap">{formatDate(item.updatedAt)}</td>
                      <td>
                        <div className="adm-row-actions">
                          <Link href={`${copy.base}/${item.id}`} className="adm-icon-btn" aria-label="Edit" title="Edit"><Pencil size={15} /></Link>
                          {published ? (
                            <Link href={`${copy.live}/${item.slug}`} target="_blank" className="adm-icon-btn" aria-label="View live" title="View live"><ExternalLink size={15} /></Link>
                          ) : null}
                          <form action={setContentStatus.bind(null, kind, item.id, published ? "draft" : "published")}>
                            <button className="adm-icon-btn" aria-label={published ? "Unpublish" : "Publish"} title={published ? "Unpublish" : "Publish"}>
                              {published ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </form>
                          <form action={removeContent.bind(null, kind, item.id)}>
                            <ConfirmButton message={`Delete “${item.title}” permanently?`} className="adm-icon-btn adm-icon-danger">
                              <Trash2 size={15} />
                            </ConfirmButton>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">No {copy.noun}s yet. Create one here, or ask an LLM connected to the MCP server to draft it.</p>
        )}
      </section>
    </>
  );
}
