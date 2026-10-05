import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createContent, deleteContent, getContent, listContent, updateContent } from "@/lib/cms/content";
import { saveImage } from "@/lib/cms/media";
import { fetchRemoteImage } from "@/lib/cms/remote-image";
import { caseStudyCreateSchema, caseStudyUpdateSchema, postCreateSchema, postUpdateSchema } from "@/lib/cms/schemas";
import type { ContentKind, ContentMap } from "@/lib/cms/types";

type Result = { content: { type: "text"; text: string }[]; isError?: boolean };

const ok = (data: unknown): Result => ({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }] });
const fail = (message: string): Result => ({ content: [{ type: "text", text: message }], isError: true });

async function guard(fn: () => Promise<Result>): Promise<Result> {
  try {
    return await fn();
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unexpected error");
  }
}

/** Compact list rows: omit the full HTML body to keep responses small. */
function summarise(item: ContentMap[ContentKind]) {
  const { contentHtml, ...rest } = item;
  return { ...rest, contentLength: contentHtml.length };
}

const idArg = { id: z.string().describe("Item id or slug") };
const statusFilter = { status: z.enum(["draft", "published"]).optional().describe("Only return items with this status") };
const HTML_NOTE = "Body as HTML (h2, h3, p, ul/ol, a, img, blockquote, table…). Scripts and unsafe markup are stripped.";

export function createMcpServer() {
  const server = new McpServer({ name: "pja-cms", version: "1.0.0" });

  // ----- Blog posts -----
  server.registerTool(
    "list_posts",
    { description: "List CMS blog posts (newest first), without bodies. Static legacy posts are not included.", inputSchema: statusFilter, annotations: { readOnlyHint: true } },
    ({ status }) => guard(async () => ok((await listContent("post", { status })).map(summarise))),
  );

  server.registerTool(
    "get_post",
    { description: "Get one blog post, including its HTML body.", inputSchema: idArg, annotations: { readOnlyHint: true } },
    ({ id }) => guard(async () => ((await getContent("post", id)) ? ok(await getContent("post", id)) : fail(`Post "${id}" not found`))),
  );

  server.registerTool(
    "create_draft_post",
    {
      description: `Create a blog post as a draft. Slug, excerpt and SEO fields are generated when omitted. ${HTML_NOTE}`,
      inputSchema: postCreateSchema.omit({ status: true }).shape,
    },
    (input) => guard(async () => ok(await createContent("post", { ...input, status: "draft" }))),
  );

  server.registerTool(
    "update_post",
    {
      description: `Update fields of a blog post; omitted fields are unchanged. ${HTML_NOTE}`,
      inputSchema: { ...idArg, ...postUpdateSchema.shape },
      annotations: { idempotentHint: true },
    },
    ({ id, ...patch }) => guard(async () => ok(await updateContent("post", id, patch))),
  );

  server.registerTool(
    "publish_post",
    { description: "Publish a blog post so it appears on the public site. Confirm with the user first.", inputSchema: idArg, annotations: { idempotentHint: true } },
    ({ id }) => guard(async () => ok(await updateContent("post", id, { status: "published" }))),
  );

  server.registerTool(
    "delete_post",
    { description: "Permanently delete a blog post. This cannot be undone.", inputSchema: idArg, annotations: { destructiveHint: true } },
    ({ id }) => guard(async () => ((await deleteContent("post", id)) ? ok({ deleted: id }) : fail(`Post "${id}" not found`))),
  );

  // ----- Case studies -----
  server.registerTool(
    "list_case_studies",
    { description: "List case studies (newest first), without bodies.", inputSchema: statusFilter, annotations: { readOnlyHint: true } },
    ({ status }) => guard(async () => ok((await listContent("case-study", { status })).map(summarise))),
  );

  server.registerTool(
    "get_case_study",
    { description: "Get one case study, including its HTML body.", inputSchema: idArg, annotations: { readOnlyHint: true } },
    ({ id }) => guard(async () => ((await getContent("case-study", id)) ? ok(await getContent("case-study", id)) : fail(`Case study "${id}" not found`))),
  );

  server.registerTool(
    "create_case_study",
    {
      description: `Create a case study (draft unless status is "published"). results is a list of short headline outcomes. ${HTML_NOTE}`,
      inputSchema: caseStudyCreateSchema.shape,
    },
    (input) => guard(async () => ok(await createContent("case-study", input))),
  );

  server.registerTool(
    "update_case_study",
    {
      description: `Update fields of a case study; omitted fields are unchanged. ${HTML_NOTE}`,
      inputSchema: { ...idArg, ...caseStudyUpdateSchema.shape },
      annotations: { idempotentHint: true },
    },
    ({ id, ...patch }) => guard(async () => ok(await updateContent("case-study", id, patch))),
  );

  server.registerTool(
    "publish_case_study",
    { description: "Publish a case study so it appears on the public site. Confirm with the user first.", inputSchema: idArg, annotations: { idempotentHint: true } },
    ({ id }) => guard(async () => ok(await updateContent("case-study", id, { status: "published" }))),
  );

  server.registerTool(
    "delete_case_study",
    { description: "Permanently delete a case study. This cannot be undone.", inputSchema: idArg, annotations: { destructiveHint: true } },
    ({ id }) => guard(async () => ((await deleteContent("case-study", id)) ? ok({ deleted: id }) : fail(`Case study "${id}" not found`))),
  );

  // ----- Images -----
  server.registerTool(
    "upload_image",
    {
      description: "Upload an image (PNG, JPEG, WebP or GIF, max 5 MB) from base64 data. Returns a path to use as heroImage or in an <img> tag.",
      inputSchema: { base64: z.string().describe("Base64-encoded image bytes (no data: prefix)") },
    },
    ({ base64 }) => guard(async () => ok(await saveImage(Buffer.from(base64, "base64")))),
  );

  server.registerTool(
    "upload_image_from_url",
    {
      description: "Download a public https image (max 5 MB) and host it. Returns a path to use as heroImage or in an <img> tag.",
      inputSchema: { url: z.url().describe("Public https URL of the image") },
    },
    ({ url }) => guard(async () => ok(await saveImage(await fetchRemoteImage(url)))),
  );

  return server;
}
