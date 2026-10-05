"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveContent, type FormState } from "@/app/admin/actions";
import { HtmlEditor } from "./html-editor";
import { ImageField } from "./image-field";
import type { CmsCaseStudy, CmsPost, ContentKind } from "@/lib/cms/types";

type Props =
  | { kind: "post"; item?: CmsPost }
  | { kind: "case-study"; item?: CmsCaseStudy };

export function ContentForm(props: Props) {
  const { kind, item } = props;
  const [state, action, pending] = useActionState<FormState, FormData>(saveContent.bind(null, kind as ContentKind, item?.id ?? null), {});
  const post = kind === "post" ? (item as CmsPost | undefined) : undefined;
  const study = kind === "case-study" ? (item as CmsCaseStudy | undefined) : undefined;
  const published = item?.status === "published";

  return (
    <form action={action} className="adm-form adm-content-form">
      <div className="adm-two-col adm-two-col-wide">
        <div className="adm-stack">
          <section className="adm-card">
            <label>
              <span>Title</span>
              <input name="title" defaultValue={item?.title} required minLength={3} maxLength={200} />
            </label>
            <label>
              <span>Summary</span>
              <textarea name="excerpt" rows={3} defaultValue={item?.excerpt} maxLength={400} placeholder="Shown on cards and in search results. Generated from the body if left blank." />
            </label>
            <div className="adm-field">
              <span>Content (HTML)</span>
              <HtmlEditor name="contentHtml" defaultValue={item?.contentHtml} />
            </div>
          </section>
        </div>

        <div className="adm-stack">
          <section className="adm-card">
            <h2>Details</h2>
            {kind === "post" ? (
              <>
                <label><span>Category</span><input name="category" defaultValue={post?.category} placeholder="GST, Income Tax, Audit…" /></label>
                <label><span>Author</span><input name="author" defaultValue={post?.author} placeholder="Pratik Janrao & Associates" /></label>
              </>
            ) : (
              <>
                <label><span>Client</span><input name="client" defaultValue={study?.client} placeholder="Client name or descriptor" /></label>
                <label><span>Industry</span><input name="industry" defaultValue={study?.industry} placeholder="Manufacturing, Healthcare…" /></label>
                <label>
                  <span>Key results (one per line)</span>
                  <textarea name="results" rows={4} defaultValue={study?.results.join("\n")} placeholder={"40% faster month-end close\nZero audit observations"} />
                </label>
              </>
            )}
            <div className="adm-field">
              <span>Cover image</span>
              <ImageField name="heroImage" defaultValue={item?.heroImage} />
            </div>
          </section>

          <section className="adm-card">
            <h2>SEO</h2>
            <label><span>URL slug</span><input name="slug" defaultValue={item?.slug} placeholder="auto-generated from title" /></label>
            <label><span>SEO title</span><input name="seoTitle" defaultValue={item?.seoTitle} maxLength={120} /></label>
            <label><span>SEO description</span><textarea name="seoDescription" rows={3} defaultValue={item?.seoDescription} maxLength={300} /></label>
          </section>

          <section className="adm-card">
            <h2>Publish</h2>
            <p className="adm-muted">{published ? "This item is live on the website." : "Drafts are only visible here."}</p>
            {state.error ? <p className="adm-alert" role="alert">{state.error}</p> : null}
            <div className="adm-actions">
              <button name="intent" value="publish" className="adm-btn adm-btn-primary" disabled={pending}>
                {published ? "Update live" : "Publish"}
              </button>
              <button name="intent" value="draft" className="adm-btn" disabled={pending}>
                {published ? "Unpublish & save" : "Save draft"}
              </button>
              <Link href={kind === "post" ? "/admin/blogs" : "/admin/case-studies"} className="adm-link">Cancel</Link>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
