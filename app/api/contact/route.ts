import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/cms/schemas";
import { createSubmission } from "@/lib/cms/submissions";
import { clientIp, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (rateLimited(`contact:${clientIp(request)}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const body = Object.fromEntries(await request.formData().catch(() => new FormData()));
  // Honeypot: real visitors never see or fill this field.
  if (body.company_website) return NextResponse.json({ ok: true });

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 400 });

  await createSubmission({ kind: "contact", ...parsed.data });
  return NextResponse.json({ ok: true });
}
