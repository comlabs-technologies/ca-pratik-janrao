import Link from "next/link";
import type { BlogPost } from "@/content/blogs";

export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <aside className="related-panel">
      <span>Related articles</span>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
