import { AdminSidebar } from "@/components/admin/sidebar";
import { requireAdmin } from "@/lib/admin/auth";
import { submissionCounts } from "@/lib/cms/submissions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const { unread } = await submissionCounts();

  return (
    <div className="adm-shell">
      <AdminSidebar unread={unread} />
      <div className="adm-main">{children}</div>
    </div>
  );
}
