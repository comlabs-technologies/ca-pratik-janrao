import { lookup } from "node:dns/promises";
import net from "node:net";
import { MAX_IMAGE_BYTES } from "./media";

function isPrivate(address: string) {
  if (net.isIPv4(address)) {
    const [a, b] = address.split(".").map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  const lower = address.toLowerCase();
  return lower === "::1" || lower === "::" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80") || lower.startsWith("::ffff:");
}

/** Fetches an https image, refusing private/loopback targets and oversized bodies. */
export async function fetchRemoteImage(rawUrl: string) {
  const url = new URL(rawUrl);
  if (url.protocol !== "https:") throw new Error("Only https URLs are allowed");
  const { address } = await lookup(url.hostname);
  if (isPrivate(address)) throw new Error("URL resolves to a private address");

  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`Download failed with status ${response.status}`);
  const length = Number(response.headers.get("content-length") ?? 0);
  if (length > MAX_IMAGE_BYTES) throw new Error("Image must be 5 MB or smaller");
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length > MAX_IMAGE_BYTES) throw new Error("Image must be 5 MB or smaller");
  return data;
}
