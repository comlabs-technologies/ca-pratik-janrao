import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/cms/schemas";
import { createSubmission } from "@/lib/cms/submissions";
import { sendFormNotification } from "@/lib/email/send-form-notification";
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

  try {
    await sendFormNotification({
      subject: `Website enquiry from ${parsed.data.name}`,
      replyTo: parsed.data.email,
      fields: {
        Name: parsed.data.name,
        Email: parsed.data.email,
        Phone: parsed.data.phone,
        Message: parsed.data.message,
      },
    });
  } catch (error) {
    console.error("[contact] Failed to send notification email:", error);
  }

  return NextResponse.json({ ok: true });
}
