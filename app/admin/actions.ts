"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSessionToken, passwordMatches, requireAdmin, SESSION_COOKIE, sessionCookieOptions } from "@/lib/admin/auth";
import { createContent, deleteContent, updateContent } from "@/lib/cms/content";
import { caseStudyCreateSchema, postCreateSchema } from "@/lib/cms/schemas";
import { deleteSubmission, updateSubmission } from "@/lib/cms/submissions";
import type { ContentKind, SubmissionStatus } from "@/lib/cms/types";

export type FormState = { error?: string };

const LIST_PATH: Record<ContentKind, string> = { post: "/admin/blogs", "case-study": "/admin/case-studies" };

// ----- Session -----

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // blunt brute-force slow-down
    return { error: process.env.ADMIN_PASSWORD ? "Incorrect password." : "Admin access is not configured. Set ADMIN_PASSWORD." };
  }
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ----- Submissions -----

export async function saveSubmission(id: string, formData: FormData) {
  await requireAdmin();
  const status = String(formData.get("status"));
  if (!["new", "reviewed", "archived"].includes(status)) return;
  await updateSubmission(id, { status: status as SubmissionStatus, notes: String(formData.get("notes") ?? "") });
  revalidatePath("/admin", "layout");
}

export async function removeSubmission(id: string) {
  await requireAdmin();
  await deleteSubmission(id);
  revalidatePath("/admin", "layout");
  redirect("/admin/submissions");
}

// ----- Content (blogs + case studies) -----

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : undefined;
}

export async function saveContent(kind: ContentKind, id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const intent = field(formData, "intent");
  const raw = {
    title: field(formData, "title"),
    slug: field(formData, "slug"),
    excerpt: field(formData, "excerpt"),
    contentHtml: field(formData, "contentHtml"),
    heroImage: field(formData, "heroImage"),
    seoTitle: field(formData, "seoTitle"),
    seoDescription: field(formData, "seoDescription"),
    status: intent === "publish" ? "published" : intent === "draft" ? "draft" : undefined,
    ...(kind === "post"
      ? { category: field(formData, "category"), author: field(formData, "author") }
      : {
          client: field(formData, "client"),
          industry: field(formData, "industry"),
          results: (field(formData, "results") ?? "").split("\n").map((line) => line.trim()).filter(Boolean),
        }),
  };

  const parsed = (kind === "post" ? postCreateSchema : caseStudyCreateSchema).safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { error: `${issue.path.join(".") || "Form"}: ${issue.message}` };
  }

  try {
    if (id) await updateContent(kind, id, parsed.data as never);
    else await createContent(kind, parsed.data as never);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save." };
  }

  revalidatePath("/", "layout");
  redirect(`${LIST_PATH[kind]}?saved=1`);
}

export async function setContentStatus(kind: ContentKind, id: string, status: "draft" | "published") {
  await requireAdmin();
  await updateContent(kind, id, { status });
  revalidatePath("/", "layout");
}

export async function removeContent(kind: ContentKind, id: string) {
  await requireAdmin();
  await deleteContent(kind, id);
  revalidatePath("/", "layout");
  redirect(`${LIST_PATH[kind]}?deleted=1`);
}
