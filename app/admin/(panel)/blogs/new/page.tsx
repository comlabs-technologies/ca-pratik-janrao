import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentForm } from "@/components/admin/content-form";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "New post" };

export default function Page() {
  return (
    <>
      <Link href="/admin/blogs" className="adm-link adm-back"><ArrowLeft size={14} /> Blogs</Link>
      <PageHeader title="New post" />
      <ContentForm kind="post" />
    </>
  );
}
