import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Inbox, Users } from "lucide-react";
import { Badge, formatDateTime, PageHeader } from "@/components/admin/ui";
import { listContent } from "@/lib/cms/content";
import { listSubmissions, submissionCounts } from "@/lib/cms/submissions";

export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const [counts, recent, posts, studies] = await Promise.all([
    submissionCounts(),
    listSubmissions(),
    listContent("post"),
    listContent("case-study"),
  ]);
  const published = (items: { status: string }[]) => items.filter((i) => i.status === "published").length;

  const stats = [
    { label: "New enquiries", value: counts.unread, hint: `${counts.total} total submissions`, icon: Inbox, href: "/admin/submissions?status=new" },
    { label: "Career applications", value: counts.career, hint: `${counts.contact} contact enquiries`, icon: Users, href: "/admin/submissions?kind=career" },
    { label: "Blog posts", value: posts.length, hint: `${published(posts)} published · ${posts.length - published(posts)} drafts`, icon: FileText, href: "/admin/blogs" },
    { label: "Case studies", value: studies.length, hint: `${published(studies)} published · ${studies.length - published(studies)} drafts`, icon: BookOpen, href: "/admin/case-studies" },
  ];

  return (
    <>
      <PageHeader title="Overview" subtitle="What needs your attention across the website." />

      <div className="adm-stats">
        {stats.map(({ label, value, hint, icon: Icon, href }) => (
          <Link key={label} href={href} className="adm-card adm-stat">
            <Icon size={18} />
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{hint}</small>
          </Link>
        ))}
      </div>

      <section className="adm-card">
        <div className="adm-card-head">
          <h2>Recent submissions</h2>
          <Link href="/admin/submissions" className="adm-link">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {recent.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr><th>Name</th><th>Type</th><th>Message</th><th>Status</th><th>Received</th></tr>
              </thead>
              <tbody>
                {recent.slice(0, 6).map((item) => (
                  <tr key={item.id}>
                    <td><Link href={`/admin/submissions/${item.id}`} className="adm-row-link">{item.name}</Link><small>{item.email}</small></td>
                    <td><Badge value={item.kind} label={item.kind === "career" ? item.role ?? "Career" : "Contact"} /></td>
                    <td className="adm-truncate">{item.message}</td>
                    <td><Badge value={item.status} /></td>
                    <td className="adm-nowrap">{formatDateTime(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">No submissions yet. They appear here when someone fills in the contact or careers form.</p>
        )}
      </section>
    </>
  );
}
