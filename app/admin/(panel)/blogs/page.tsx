import { ContentList } from "@/components/admin/content-list";
import { listContent } from "@/lib/cms/content";

export const metadata = { title: "Blogs" };

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  return <ContentList kind="post" items={await listContent("post")} params={await searchParams} />;
}
