import { ContentList } from "@/components/admin/content-list";
import { listContent } from "@/lib/cms/content";

export const metadata = { title: "Case studies" };

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  return <ContentList kind="case-study" items={await listContent("case-study")} params={await searchParams} />;
}
