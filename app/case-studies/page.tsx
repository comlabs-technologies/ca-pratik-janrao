import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { getPublishedCaseStudies } from "@/lib/cms/public";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

// Reads CMS content at request time so newly published case studies appear immediately.
export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Case Studies",
  description: "How we have helped businesses with tax, compliance, audit and advisory engagements.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const studies = await getPublishedCaseStudies();
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Case Studies" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Client work"
        title="Problems solved, outcomes delivered."
        description="A closer look at engagements where careful advice made a measurable difference."
        breadcrumbs={breadcrumbs}
      />

      <section className="section">
        {studies.length ? (
          <div className="blog-grid">
            {studies.map((study) => (
              <article key={study.id} className="blog-card">
                <p className="eyebrow">{[study.industry, study.client].filter(Boolean).join(" · ") || "Case study"}</p>
                <h3>{study.title}</h3>
                <p>{study.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{study.results[0] ?? ""}</span>
                  <Link href={`/case-studies/${study.slug}`} className="text-link">
                    Read case study <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No case studies yet</h2>
            <p>Client stories will appear here as they are published.</p>
          </div>
        )}
      </section>
    </>
  );
}
