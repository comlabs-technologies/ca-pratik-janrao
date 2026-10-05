import { randomUUID } from "node:crypto";
import { readBlob, writeBlob } from "./store";

const DIR = "media";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
// SVG is deliberately excluded: it can carry scripts.
const TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};
const EXT_BY_MIME: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif" };

function sniff(data: Buffer): string | null {
  if (data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return "image/jpeg";
  if (data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (data.subarray(0, 3).toString("ascii") === "GIF") return "image/gif";
  return null;
}

/** Validates by magic bytes (not the claimed type) and returns the public path. */
export async function saveImage(data: Buffer) {
  if (data.length === 0) throw new Error("Image is empty");
  if (data.length > MAX_IMAGE_BYTES) throw new Error("Image must be 5 MB or smaller");
  const mime = sniff(data);
  if (!mime) throw new Error("Unsupported image. Use PNG, JPEG, WebP or GIF.");
  const name = `${randomUUID()}.${EXT_BY_MIME[mime]}`;
  await writeBlob(DIR, name, data);
  return { path: `/media/${name}`, size: data.length, mime };
}

export async function readImage(name: string) {
  if (!/^[0-9a-f-]{36}\.(png|jpe?g|webp|gif)$/.test(name)) return null;
  const data = await readBlob(DIR, name);
  if (!data) return null;
  return { data, type: TYPES[name.split(".").pop()!] };
}
