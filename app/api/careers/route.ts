import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/cms/schemas";
import { createSubmission, MAX_RESUME_BYTES } from "@/lib/cms/submissions";
import { sendFormNotification } from "@/lib/email/send-form-notification";
import { clientIp, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (rateLimited(`career:${clientIp(request)}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const form = await request.formData().catch(() => new FormData());
  if (form.get("company_website")) return NextResponse.json({ ok: true });

  const parsed = careerSchema.safeParse(Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string")));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 400 });

  const file = form.get("resume");
  let resume: { name: string; data: Buffer } | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_RESUME_BYTES) return NextResponse.json({ ok: false, error: "Resume must be 5 MB or smaller." }, { status: 400 });
    resume = { name: file.name, data: Buffer.from(await file.arrayBuffer()) };
  }

  try {
    await createSubmission({ kind: "career", ...parsed.data }, resume);
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 400 });
  }

  try {
    await sendFormNotification({
      subject: `Career application: ${parsed.data.role ?? "General"} — ${parsed.data.name}`,
      replyTo: parsed.data.email,
      fields: {
        Name: parsed.data.name,
        Email: parsed.data.email,
        Phone: parsed.data.phone,
        Role: parsed.data.role,
        Message: parsed.data.message,
        Resume: resume ? `${resume.name} (stored in admin)` : undefined,
      },
    });
  } catch (error) {
    console.error("[careers] Failed to send notification email:", error);
  }

  return NextResponse.json({ ok: true });
}
