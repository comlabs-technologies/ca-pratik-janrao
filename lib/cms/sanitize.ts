import sanitize from "sanitize-html";

const options: sanitize.IOptions = {
  allowedTags: [
    "h2", "h3", "h4", "p", "br", "hr", "ul", "ol", "li", "blockquote", "strong", "b", "em", "i", "u", "s",
    "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "code", "pre", "span",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowProtocolRelative: false,
  // h1 belongs to the page title; demote any that slip in.
  transformTags: {
    h1: "h2",
    a: (tagName, attribs) => {
      if (attribs.href && /^https?:/i.test(attribs.href)) {
        return { tagName, attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } };
      }
      return { tagName, attribs };
    },
  },
};

export function sanitizeHtml(html: string) {
  return sanitize(html, options);
}

export function stripHtml(html: string) {
  // Pad block boundaries so adjacent paragraphs don't run together once the tags are gone.
  const spaced = html.replace(/<\/(p|h[1-6]|li|div|blockquote|tr|td|th)>|<br\s*\/?>/gi, " $&");
  return sanitize(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
