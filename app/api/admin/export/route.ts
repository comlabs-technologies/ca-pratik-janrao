import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { listSubmissions } from "@/lib/cms/submissions";
import type { SubmissionKind } from "@/lib/cms/types";

export const runtime = "nodejs";

function cell(value: string | undefined) {
  let text = value ?? "";
  // Neutralise spreadsheet formula injection.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const kind = new URL(request.url).searchParams.get("kind");
  const rows = await listSubmissions({ kind: kind === "contact" || kind === "career" ? (kind as SubmissionKind) : undefined });
  const header = ["Received", "Type", "Name", "Email", "Phone", "Role", "Status", "Message", "Notes"];
  const lines = rows.map((r) =>
    [r.createdAt, r.kind, r.name, r.email, r.phone, r.role, r.status, r.message, r.notes].map(cell).join(","),
  );
  return new Response([header.map(cell).join(","), ...lines].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
