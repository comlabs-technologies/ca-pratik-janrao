import { randomUUID } from "node:crypto";
import { blogPosts } from "@/content/blogs";
import type { CaseStudyCreate, CaseStudyUpdate, PostCreate, PostUpdate } from "./schemas";
import { mutateCollection, readCollection } from "./store";
import { sanitizeHtml, stripHtml } from "./sanitize";
import { uniqueSlug } from "./slug";
import type { CmsCaseStudy, CmsPost, ContentKind, ContentMap, ContentStatus } from "./types";

const COLLECTION: Record<ContentKind, string> = { post: "posts", "case-study": "case-studies" };

export type CreateInput<K extends ContentKind> = K extends "post" ? PostCreate : CaseStudyCreate;
export type UpdateInput<K extends ContentKind> = K extends "post" ? PostUpdate : CaseStudyUpdate;

export class ContentError extends Error {}

function reservedSlugs(kind: ContentKind) {
  return kind === "post" ? new Set(blogPosts.map((post) => post.slug)) : new Set<string>();
}

function clip(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function newest<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listContent<K extends ContentKind>(kind: K, filter: { status?: ContentStatus } = {}) {
  const items = await readCollection<ContentMap[K]>(COLLECTION[kind]);
  return newest(filter.status ? items.filter((item) => item.status === filter.status) : items);
}

export async function getContent<K extends ContentKind>(kind: K, idOrSlug: string) {
  const items = await readCollection<ContentMap[K]>(COLLECTION[kind]);
  return items.find((item) => item.id === idOrSlug || item.slug === idOrSlug) ?? null;
}

export async function createContent<K extends ContentKind>(kind: K, input: CreateInput<K>): Promise<ContentMap[K]> {
  return mutateCollection<ContentMap[K], ContentMap[K]>(COLLECTION[kind], (items) => {
    const now = new Date().toISOString();
    const contentHtml = sanitizeHtml(input.contentHtml ?? "");
    const excerpt = input.excerpt?.trim() || clip(stripHtml(contentHtml), 180);
    const status: ContentStatus = input.status ?? "draft";
    const taken = new Set([...items.map((item) => item.slug), ...reservedSlugs(kind)]);

    const base = {
      id: randomUUID(),
      slug: uniqueSlug(input.slug || input.title, taken),
      title: input.title.trim(),
      excerpt,
      contentHtml,
      heroImage: input.heroImage || undefined,
      status,
      publishedAt: status === "published" ? now : undefined,
      seoTitle: input.seoTitle?.trim() || clip(input.title.trim(), 60),
      seoDescription: input.seoDescription?.trim() || clip(excerpt, 160),
      createdAt: now,
      updatedAt: now,
    };

    const record =
      kind === "post"
        ? ({
            ...base,
            category: (input as PostCreate).category?.trim() || "General",
            author: (input as PostCreate).author?.trim() || "Pratik Janrao & Associates",
          } satisfies CmsPost)
        : ({
            ...base,
            client: (input as CaseStudyCreate).client?.trim() || "",
            industry: (input as CaseStudyCreate).industry?.trim() || "",
            results: (input as CaseStudyCreate).results ?? [],
          } satisfies CmsCaseStudy);

    items.push(record as ContentMap[K]);
    return record as ContentMap[K];
  });
}

export async function updateContent<K extends ContentKind>(kind: K, id: string, patch: UpdateInput<K>): Promise<ContentMap[K]> {
  return mutateCollection<ContentMap[K], ContentMap[K]>(COLLECTION[kind], (items) => {
    const index = items.findIndex((item) => item.id === id || item.slug === id);
    if (index === -1) throw new ContentError(`No ${kind} found for "${id}"`);

    const current = items[index];
    const next = { ...current } as ContentMap[K] & Record<string, unknown>;
    // Only copy keys that were actually supplied; undefined means "leave as is".
    for (const [key, value] of Object.entries(patch)) {
      if (value !== undefined) (next as Record<string, unknown>)[key] = value;
    }

    if (patch.contentHtml !== undefined) next.contentHtml = sanitizeHtml(patch.contentHtml);
    if (patch.title !== undefined) next.title = patch.title.trim();
    if (patch.heroImage !== undefined) next.heroImage = patch.heroImage || undefined;
    if (patch.slug !== undefined && patch.slug.trim() && patch.slug !== current.slug) {
      const taken = new Set([...items.filter((_, i) => i !== index).map((item) => item.slug), ...reservedSlugs(kind)]);
      next.slug = uniqueSlug(patch.slug, taken);
    } else {
      next.slug = current.slug;
    }
    if (patch.excerpt !== undefined && !patch.excerpt.trim()) next.excerpt = clip(stripHtml(next.contentHtml), 180);
    if (patch.seoTitle !== undefined && !patch.seoTitle.trim()) next.seoTitle = clip(next.title, 60);
    if (patch.seoDescription !== undefined && !patch.seoDescription.trim()) next.seoDescription = clip(next.excerpt, 160);

    if (next.status === "published" && !current.publishedAt) next.publishedAt = new Date().toISOString();
    if (next.status === "draft") next.publishedAt = current.publishedAt; // keep original date if re-published later
    next.id = current.id;
    next.createdAt = current.createdAt;
    next.updatedAt = new Date().toISOString();

    items[index] = next;
    return next;
  });
}

export async function deleteContent(kind: ContentKind, id: string) {
  return mutateCollection<{ id: string; slug: string }, boolean>(COLLECTION[kind], (items) => {
    const index = items.findIndex((item) => item.id === id || item.slug === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  });
}
