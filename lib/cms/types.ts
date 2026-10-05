export type ContentStatus = "draft" | "published";

type ContentBase = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Sanitised HTML body. */
  contentHtml: string;
  heroImage?: string;
  status: ContentStatus;
  publishedAt?: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsPost = ContentBase & {
  category: string;
  author: string;
};

export type CmsCaseStudy = ContentBase & {
  client: string;
  industry: string;
  /** Short headline outcomes, e.g. "40% faster month-end close". */
  results: string[];
};

export type ContentKind = "post" | "case-study";
export type ContentMap = { post: CmsPost; "case-study": CmsCaseStudy };

export type SubmissionKind = "contact" | "career";
export type SubmissionStatus = "new" | "reviewed" | "archived";

export type Submission = {
  id: string;
  kind: SubmissionKind;
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Career applications only. */
  role?: string;
  resume?: { originalName: string; storedName: string; size: number };
  status: SubmissionStatus;
  notes?: string;
  createdAt: string;
};
