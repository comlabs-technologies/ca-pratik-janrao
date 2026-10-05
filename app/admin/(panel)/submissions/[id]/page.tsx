import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Mail, Phone } from "lucide-react";
import { removeSubmission, saveSubmission } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { Badge, formatDateTime, PageHeader } from "@/components/admin/ui";
import { getSubmission } from "@/lib/cms/submissions";

export const metadata = { title: "Submission" };

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getSubmission(id);
  if (!item) notFound();

  return (
    <>
      <Link href="/admin/submissions" className="adm-link adm-back">
        <ArrowLeft size={14} /> All submissions
      </Link>
      <PageHeader
        title={item.name}
        subtitle={`${item.kind === "career" ? `Career application · ${item.role}` : "Contact enquiry"} · ${formatDateTime(item.createdAt)}`}
        actions={<Badge value={item.status} />}
      />

      <div className="adm-two-col">
        <section className="adm-card">
          <h2>Details</h2>
          <dl className="adm-dl">
            <dt>Email</dt>
            <dd><a href={`mailto:${item.email}`} className="adm-link"><Mail size={14} /> {item.email}</a></dd>
            <dt>Phone</dt>
            <dd>{item.phone ? <a href={`tel:${item.phone}`} className="adm-link"><Phone size={14} /> {item.phone}</a> : "—"}</dd>
            {item.role ? (<><dt>Role</dt><dd>{item.role}</dd></>) : null}
            {item.resume ? (
              <>
                <dt>Resume</dt>
                <dd>
                  <a href={`/api/admin/resumes/${item.id}`} className="adm-link">
                    <Download size={14} /> {item.resume.originalName} ({Math.max(1, Math.round(item.resume.size / 1024))} KB)
                  </a>
                </dd>
              </>
            ) : null}
          </dl>
          <h2>Message</h2>
          <p className="adm-message">{item.message}</p>
        </section>

        <section className="adm-card">
          <h2>Follow-up</h2>
          <form action={saveSubmission.bind(null, item.id)} className="adm-form">
            <label>
              <span>Status</span>
              <select name="status" defaultValue={item.status}>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label>
              <span>Internal notes</span>
              <textarea name="notes" rows={5} defaultValue={item.notes} placeholder="Only visible to admins" />
            </label>
            <button className="adm-btn adm-btn-primary">Save</button>
          </form>
          <form action={removeSubmission.bind(null, item.id)} className="adm-danger-zone">
            <ConfirmButton message="Delete this submission permanently?">Delete submission</ConfirmButton>
          </form>
        </section>
      </div>
    </>
  );
}
