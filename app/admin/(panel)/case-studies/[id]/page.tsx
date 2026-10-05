import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContentForm } from "@/components/admin/content-form";
import { Badge, PageHeader } from "@/components/admin/ui";
import { getContent } from "@/lib/cms/content";

export const metadata = { title: "Edit case-study" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const item = await getContent("case-study", (await params).id);
  if (!item) notFound();
  return (
    <>
      <Link href="/admin/case-studies" className="adm-link adm-back"><ArrowLeft size={14} /> Case studies</Link>
      <PageHeader title={item.title} actions={<Badge value={item.status} />} />
      <ContentForm key={item.updatedAt} kind="case-study" item={item} />
    </>
  );
}
