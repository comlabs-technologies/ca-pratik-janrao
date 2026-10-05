import { z } from "zod";

/** Only same-site media, bundled images, or absolute http(s) URLs may be used as images. */
const imageUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || /^(https?:\/\/|\/media\/|\/images\/)/i.test(value), {
    message: "Image must be an http(s) URL or a /media/ or /images/ path",
  });

const status = z.enum(["draft", "published"]);
const text = (max: number) => z.string().trim().max(max);

const contentFields = {
  title: text(200).min(3),
  slug: text(120).optional(),
  excerpt: text(400).optional(),
  contentHtml: z.string().max(200_000).optional(),
  heroImage: imageUrl.optional(),
  status: status.optional(),
  seoTitle: text(120).optional(),
  seoDescription: text(300).optional(),
};

export const postCreateSchema = z.object({
  ...contentFields,
  category: text(80).optional(),
  author: text(120).optional(),
});
export const postUpdateSchema = postCreateSchema.partial();

export const caseStudyCreateSchema = z.object({
  ...contentFields,
  client: text(160).optional(),
  industry: text(120).optional(),
  results: z.array(text(160).min(1)).max(8).optional(),
});
export const caseStudyUpdateSchema = caseStudyCreateSchema.partial();

export const contactSchema = z.object({
  name: text(120).min(2),
  email: z.email().max(200),
  phone: text(30).optional(),
  message: text(4000).min(5),
});

export const careerSchema = contactSchema.extend({
  phone: text(30).min(5),
  role: z.enum(["Articleship", "Internship", "Employee", "Professional"]),
});

export type PostCreate = z.infer<typeof postCreateSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;
export type CaseStudyCreate = z.infer<typeof caseStudyCreateSchema>;
export type CaseStudyUpdate = z.infer<typeof caseStudyUpdateSchema>;
