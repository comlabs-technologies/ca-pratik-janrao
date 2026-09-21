import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { getAllKnowledgeResources, getKnowledgeResource } from "@/content/knowledge-bank";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

type PageProps = { params: Promise<{ section: string; slug: string }> };

export async function generateStaticParams() {
  return getAllKnowledgeResources()
    .filter(({ resource }) => !resource.external)
    .map(({ section, resource }) => ({ section: section.slug, slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const match = getKnowledgeResource(section, slug);
  if (!match) return {};

  return createMetadata({
    title: `${match.resource.title} | Knowledge Bank`,
    description: match.resource.excerpt ?? `Reference resource: ${match.resource.title}`,
    path: `/knowledge-bank/${section}/${slug}`,
  });
}

export default async function KnowledgeBankDetailPage({ params }: PageProps) {
  const { section, slug } = await params;
  const match = getKnowledgeResource(section, slug);
  if (!match) notFound();

  if (match.resource.external) {
    redirect(match.resource.href);
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Knowledge Bank", href: "/knowledge-bank" },
    { label: match.section.title, href: `/knowledge-bank/${match.section.slug}` },
    { label: match.resource.title },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero eyebrow={match.section.title} title={match.resource.title} breadcrumbs={breadcrumbs} />

      <section className="section page-copy narrow-copy reveal">
        <div className="migration-state">
          <p>This resource is being migrated from the previous website.</p>
          <p>If you need this reference urgently, please contact the firm or check the relevant government portal directly.</p>
          <Link href={`/knowledge-bank/${match.section.slug}`} className="pill pill-dark">
            Back to {match.section.title}
          </Link>
        </div>
      </section>
    </>
  );
}
