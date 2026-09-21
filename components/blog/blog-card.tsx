import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/content/blogs";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`blog-card ${featured ? "blog-card-featured" : ""} reveal`}>
      <p className="eyebrow">{post.category}</p>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card-meta">
        <span>{formatDate(post.date)}</span>
        <Link href={`/blogs/${post.slug}`} className="text-link">
          Read article <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
