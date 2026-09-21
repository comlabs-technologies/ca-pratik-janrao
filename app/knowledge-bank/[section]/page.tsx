import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { ResourceCard } from "@/components/knowledge-bank/resource-card";
import { getKnowledgeSection, knowledgeBankSections } from "@/content/knowledge-bank";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

type PageProps = { params: Promise<{ section: string }> };

export async function generateStaticParams() {
  return knowledgeBankSections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: sectionSlug } = await params;
  const section = getKnowledgeSection(sectionSlug);
  if (!section) return {};

  return createMetadata({
    title: `${section.title} | Knowledge Bank`,
    description: section.description,
    path: `/knowledge-bank/${sectionSlug}`,
  });
}

export default async function KnowledgeBankSectionPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = getKnowledgeSection(sectionSlug);
  if (!section) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Knowledge Bank", href: "/knowledge-bank" },
    { label: section.title },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero eyebrow="Knowledge Bank" title={section.title} description={section.description} breadcrumbs={breadcrumbs} />

      {section.groups?.map((group) => (
        <section className="section" key={group.title}>
          <div className="section-heading reveal">
            <h2>{group.title}</h2>
          </div>
          <div className="resource-grid reveal">
            {group.items.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
