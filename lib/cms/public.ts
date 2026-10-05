import { blogPosts, type BlogPost } from "@/content/blogs";
import { listContent } from "./content";
import type { CmsCaseStudy } from "./types";

/** Static posts plus published CMS posts, newest first. Static slugs win on collision. */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const cms = (await listContent("post", { status: "published" })).map<BlogPost>((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: (post.publishedAt ?? post.createdAt).slice(0, 10),
    author: post.author,
    category: post.category,
    heroImage: post.heroImage,
    sections: [],
    contentHtml: post.contentHtml,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
  }));
  return [...blogPosts, ...cms].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedCaseStudies(): Promise<CmsCaseStudy[]> {
  return (await listContent("case-study", { status: "published" })).sort((a, b) =>
    (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt),
  );
}
