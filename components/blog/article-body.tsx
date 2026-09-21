import type { BlogSection } from "@/content/blogs";

export function ArticleBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="article-body">
      {sections.map((section, index) => {
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
