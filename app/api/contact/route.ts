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

  let stored = false;
  try {
    await createSubmission({ kind: "contact", ...parsed.data });
    stored = true;
  } catch (error) {
    console.error("[contact] Failed to store submission:", error);
  }

  let emailed = false;
  try {
    const result = await sendFormNotification({
      subject: `Website enquiry from ${parsed.data.name}`,
      replyTo: parsed.data.email,
      fields: {
        Name: parsed.data.name,
        Email: parsed.data.email,
        Phone: parsed.data.phone,
        Message: parsed.data.message,
      },
    });
    emailed = result.sent;
  } catch (error) {
    console.error("[contact] Failed to send notification email:", error);
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { ok: false, error: "We could not submit your message right now. Please email us directly or try again shortly." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
