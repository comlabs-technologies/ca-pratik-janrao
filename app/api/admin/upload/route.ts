import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { saveImage } from "@/lib/cms/media";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const file = (await request.formData().catch(() => new FormData())).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  try {
    const saved = await saveImage(Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: saved.path });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
