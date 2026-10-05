import type { BlogPost } from "@/content/blogs";
import { sanitizeHtml } from "@/lib/cms/sanitize";

export function ArticleBody({ post }: { post: Pick<BlogPost, "sections" | "contentHtml"> }) {
  if (post.contentHtml) {
    return <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.contentHtml) }} />;
  }

  return (
    <div className="article-body">
      {post.sections.map((section, index) => {
        if (section.type === "paragraph") {
          return <p key={index}>{section.content}</p>;
        }
        if (section.type === "heading") {
          const Tag = section.level === 3 ? "h3" : "h2";
          return <Tag key={index}>{section.content}</Tag>;
        }
        return (
          <ul key={index}>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
