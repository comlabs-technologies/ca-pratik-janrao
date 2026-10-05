"use client";

import { useRef, useState } from "react";
import { Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Quote } from "lucide-react";

const TOOLS = [
  { label: "Heading", icon: Heading2, open: "<h2>", close: "</h2>", placeholder: "Heading" },
  { label: "Subheading", icon: Heading3, open: "<h3>", close: "</h3>", placeholder: "Subheading" },
  { label: "Bold", icon: Bold, open: "<strong>", close: "</strong>", placeholder: "bold text" },
  { label: "Italic", icon: Italic, open: "<em>", close: "</em>", placeholder: "italic text" },
  { label: "Bulleted list", icon: List, open: "<ul>\n  <li>", close: "</li>\n</ul>", placeholder: "Item" },
  { label: "Numbered list", icon: ListOrdered, open: "<ol>\n  <li>", close: "</li>\n</ol>", placeholder: "Item" },
  { label: "Quote", icon: Quote, open: "<blockquote>", close: "</blockquote>", placeholder: "Quote" },
  { label: "Link", icon: Link2, open: '<a href="https://">', close: "</a>", placeholder: "link text" },
] as const;

/** HTML textarea with a small formatting toolbar and a preview of the (server-sanitised) result. */
export function HtmlEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrap(open: string, close: string, placeholder: string) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end) || placeholder;
    setValue(`${value.slice(0, start)}${open}${selected}${close}${value.slice(end)}`);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + open.length, start + open.length + selected.length);
    });
  }

  return (
    <div className="adm-editor">
      <div className="adm-editor-bar">
        <div className="adm-tabs">
          <button type="button" className={tab === "write" ? "is-active" : undefined} onClick={() => setTab("write")}>Write</button>
          <button type="button" className={tab === "preview" ? "is-active" : undefined} onClick={() => setTab("preview")}>Preview</button>
        </div>
        {tab === "write" ? (
          <div className="adm-editor-tools">
            {TOOLS.map(({ label, icon: Icon, open, close, placeholder }) => (
              <button key={label} type="button" title={label} aria-label={label} onClick={() => wrap(open, close, placeholder)}>
                <Icon size={15} />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <textarea ref={ref} name={name} value={value} onChange={(e) => setValue(e.target.value)} rows={18} hidden={tab === "preview"} spellCheck placeholder="<p>Start writing…</p>" />
      {tab === "preview" ? (
        // Preview of the author's own HTML; the server sanitises it again on save and on the public site.
        <div className="adm-preview article-body" dangerouslySetInnerHTML={{ __html: value || "<p><em>Nothing to preview yet.</em></p>" }} />
      ) : null}
    </div>
  );
}
