import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ResourceCard } from "@/components/knowledge-bank/resource-card";
import { knowledgeBankSections } from "@/content/knowledge-bank";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Knowledge Bank",
  description: "Acts, rules, bulletins, utilities and important links for tax and regulatory reference.",
  path: "/knowledge-bank",
});

export default function KnowledgeBankPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Knowledge Bank" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Reference hub"
        title="Structured resources for tax, GST and corporate law."
        description="Browse Acts, Rules, Bulletins, Utilities and Important Links. External government resources open in a new tab."
        breadcrumbs={breadcrumbs}
      />

      {knowledgeBankSections.map((section) => (
        <section className="section" key={section.id}>
          <div className="section-heading section-heading-split reveal">
            <div>
              <p className="eyebrow">{section.title}</p>
              <h2>{section.title}</h2>
              <p className="section-heading-copy">{section.description}</p>
            </div>
            <Link className="pill pill-dark" href={`/knowledge-bank/${section.slug}`}>
              View section <ArrowRight size={15} />
            </Link>
          </div>
          <div className="resource-grid reveal">
            {section.featuredItems.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
