import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { PageHero } from "@/components/shared/page-hero";
import { getContent } from "@/lib/cms/content";
import { sanitizeHtml } from "@/lib/cms/sanitize";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

// Case studies can be published from the admin/MCP at any time, so render on request.
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

async function findPublished(slug: string) {
  const study = await getContent("case-study", slug);
  return study?.status === "published" ? study : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = await findPublished((await params).slug);
  if (!study) return {};
  return createMetadata({ title: study.seoTitle, description: study.seoDescription, path: `/case-studies/${study.slug}`, image: study.heroImage });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const study = await findPublished((await params).slug);
  if (!study) notFound();

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: study.title }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow={[study.industry, study.client].filter(Boolean).join(" · ") || "Case study"}
        title={study.title}
        description={study.excerpt}
        breadcrumbs={breadcrumbs}
      />

      <section className="section article-layout">
        <article className="article-main">
          {study.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="article-hero-image" src={study.heroImage} alt="" />
          ) : null}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(study.contentHtml) }} />
        </article>
        {study.results.length ? (
          <aside className="related-panel">
            <span>Key results</span>
            <ul>
              {study.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </aside>
        ) : null}
      </section>

      <ConsultationCta dark />
    </>
  );
}
