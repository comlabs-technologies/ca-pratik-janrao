import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentForm } from "@/components/admin/content-form";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "New case-study" };

export default function Page() {
  return (
    <>
      <Link href="/admin/case-studies" className="adm-link adm-back"><ArrowLeft size={14} /> Case studies</Link>
      <PageHeader title="New case-study" />
      <ContentForm kind="case-study" />
    </>
  );
}
