import { PageHero } from "@/components/shared/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/content/blogs";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Blogs",
  description: "Insights on GST, tax compliance, regulatory updates and practical guidance for businesses.",
  path: "/blogs",
});

export default function BlogsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs" },
  ];
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Insights"
        title="Practical guidance on tax, GST and compliance."
        description="Editorial articles grounded in regulatory change and day-to-day business questions."
        breadcrumbs={breadcrumbs}
      />

      <section className="section">
        {featured ? <BlogCard post={featured} featured /> : null}
        <div className="blog-grid reveal">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        {blogPosts.length === 0 ? (
          <div className="empty-state reveal">
            <h2>No articles yet</h2>
            <p>New insights will appear here as they are published.</p>
          </div>
        ) : null}
      </section>
    </>
  );
}
