import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArticleBody } from "@/components/blog/article-body";
import { RelatedArticles } from "@/components/blog/related-articles";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationCta } from "@/components/shared/consultation-cta";
import { blogPosts, getBlogBySlug, getRelatedPosts } from "@/content/blogs";
import { getServiceBySlug } from "@/content/services";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blogs/${slug}`,
    image: post.heroImage,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: post.title },
  ];
  const related = getRelatedPosts(post.slug);
  const relatedService = post.relatedServiceSlug ? getServiceBySlug(post.relatedServiceSlug) : null;
  const shareUrl = `${site.url}/blogs/${post.slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema(post, `/blogs/${post.slug}`))} />
      <PageHero eyebrow={post.category} title={post.title} description={`${formatDate(post.date)} · ${post.author}`} breadcrumbs={breadcrumbs} />

      <section className="section article-layout">
        <article className="article-main reveal">
          <ArticleBody sections={post.sections} />
          <div className="share-links">
            <span>Share</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
              LinkedIn
            </a>
            <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} aria-label="Share by email">
              Email
            </a>
          </div>
          {relatedService ? (
            <div className="article-service-cta">
              <p>Related service</p>
              <Link href={`/our-services/${relatedService.slug}`} className="text-link">
                {relatedService.shortTitle} <ArrowRight size={14} />
              </Link>
            </div>
          ) : null}
        </article>
        <RelatedArticles posts={related} />
      </section>

      <ConsultationCta dark />
    </>
  );
}
