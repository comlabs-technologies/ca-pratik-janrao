import { randomUUID } from "node:crypto";
import path from "node:path";
import { deleteBlob, mutateCollection, readBlob, readCollection, writeBlob } from "./store";
import type { Submission, SubmissionKind, SubmissionStatus } from "./types";

const COLLECTION = "submissions";
const RESUME_DIR = "resumes";
export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function listSubmissions(filter: { kind?: SubmissionKind; status?: SubmissionStatus; query?: string } = {}) {
  const all = await readCollection<Submission>(COLLECTION);
  const query = filter.query?.trim().toLowerCase();
  return all
    .filter((item) => (!filter.kind || item.kind === filter.kind) && (!filter.status || item.status === filter.status))
    .filter((item) => !query || [item.name, item.email, item.phone, item.message, item.role].some((v) => v?.toLowerCase().includes(query)))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getSubmission(id: string) {
  const all = await readCollection<Submission>(COLLECTION);
  return all.find((item) => item.id === id) ?? null;
}

export async function createSubmission(
  data: Pick<Submission, "kind" | "name" | "email" | "phone" | "message" | "role">,
  resume?: { name: string; data: Buffer },
) {
  const id = randomUUID();
  let stored: Submission["resume"];

  if (resume) {
    const ext = path.extname(resume.name).toLowerCase();
    if (!RESUME_TYPES[ext]) throw new Error("Resume must be a PDF or Word document");
    if (resume.data.length > MAX_RESUME_BYTES) throw new Error("Resume must be 5 MB or smaller");
    const storedName = `${id}${ext}`;
    await writeBlob(RESUME_DIR, storedName, resume.data);
    stored = { originalName: path.basename(resume.name).slice(0, 120), storedName, size: resume.data.length };
  }

  const record: Submission = { id, ...data, resume: stored, status: "new", createdAt: new Date().toISOString() };
  await mutateCollection<Submission, void>(COLLECTION, (items) => {
    items.push(record);
  });
  return record;
}

export async function updateSubmission(id: string, patch: { status?: SubmissionStatus; notes?: string }) {
  return mutateCollection<Submission, Submission | null>(COLLECTION, (items) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return null;
    if (patch.status) item.status = patch.status;
    if (patch.notes !== undefined) item.notes = patch.notes.trim().slice(0, 2000) || undefined;
    return item;
  });
}

export async function deleteSubmission(id: string) {
  const removed = await mutateCollection<Submission, Submission | null>(COLLECTION, (items) => {
    const index = items.findIndex((entry) => entry.id === id);
    return index === -1 ? null : items.splice(index, 1)[0];
  });
  if (removed?.resume) await deleteBlob(RESUME_DIR, removed.resume.storedName);
  return Boolean(removed);
}

export async function readResume(submission: Submission) {
  if (!submission.resume) return null;
  const data = await readBlob(RESUME_DIR, submission.resume.storedName);
  if (!data) return null;
  const type = RESUME_TYPES[path.extname(submission.resume.storedName)] ?? "application/octet-stream";
  return { data, type, name: submission.resume.originalName };
}

export async function submissionCounts() {
  const all = await readCollection<Submission>(COLLECTION);
  return {
    total: all.length,
    contact: all.filter((s) => s.kind === "contact").length,
    career: all.filter((s) => s.kind === "career").length,
    unread: all.filter((s) => s.status === "new").length,
  };
}
