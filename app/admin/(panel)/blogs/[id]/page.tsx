import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContentForm } from "@/components/admin/content-form";
import { Badge, PageHeader } from "@/components/admin/ui";
import { getContent } from "@/lib/cms/content";

export const metadata = { title: "Edit post" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const item = await getContent("post", (await params).id);
  if (!item) notFound();
  return (
    <>
      <Link href="/admin/blogs" className="adm-link adm-back"><ArrowLeft size={14} /> Blogs</Link>
      <PageHeader title={item.title} actions={<Badge value={item.status} />} />
      <ContentForm key={item.updatedAt} kind="post" item={item} />
    </>
  );
}
