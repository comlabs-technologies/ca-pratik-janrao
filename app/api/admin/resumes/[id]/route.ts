import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { getSubmission, readResume } from "@/lib/cms/submissions";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const submission = await getSubmission((await params).id);
  const resume = submission ? await readResume(submission) : null;
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new Response(new Uint8Array(resume.data), {
    headers: {
      "Content-Type": resume.type,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(resume.name)}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
