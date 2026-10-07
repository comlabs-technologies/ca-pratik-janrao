import nodemailer from "nodemailer";

const NOTIFY_TO = "pmatworkk@gmail.com";
const FROM_ADDRESS = "capratikjanrao@gmail.com";

type FormEmailPayload = {
  subject: string;
  fields: Record<string, string | undefined>;
  replyTo?: string;
};

function smtpConfigured() {
  return Boolean(process.env.SMTP_PASS?.trim());
}

function buildText(fields: Record<string, string | undefined>) {
  return Object.entries(fields)
    .filter(([, value]) => value?.trim())
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

/** Sends a notification email when SMTP credentials are configured. */
export async function sendFormNotification(payload: FormEmailPayload) {
  if (!smtpConfigured()) {
    console.warn("[email] SMTP_PASS is not set; skipping notification email.");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER ?? FROM_ADDRESS,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim() || NOTIFY_TO;
  const from = process.env.SMTP_FROM?.trim() || FROM_ADDRESS;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME ?? "PJA Website"}" <${from}>`,
    to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: buildText(payload.fields),
  });

  return { sent: true as const };
}
