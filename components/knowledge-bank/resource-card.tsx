import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { KnowledgeResource } from "@/content/knowledge-bank";

export function ResourceCard({ resource }: { resource: KnowledgeResource }) {
  const content = (
    <>
      <h3>{resource.title}</h3>
      {resource.excerpt ? <p>{resource.excerpt}</p> : null}
      <span className="resource-link-label">
        {resource.external ? "External resource" : resource.migrated === false ? "Resource being migrated" : "View resource"}
        <ArrowUpRight size={14} />
      </span>
    </>
  );

  if (resource.external) {
    return (
      <a href={resource.href} className="resource-card reveal" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={resource.href} className="resource-card reveal">
      {content}
    </Link>
  );
}
