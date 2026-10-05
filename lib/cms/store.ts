import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Minimal JSON-file persistence. Each collection is one file under CMS_DATA_DIR
 * (default: ./.data). Writes are serialised per collection and atomic.
 * Swap this module for a database client if the site moves to serverless hosting.
 */
export const DATA_DIR = process.env.CMS_DATA_DIR ?? path.join(process.cwd(), ".data");

// Runtime data lives outside the build, so keep the bundler from tracing these paths.
const at = (...parts: string[]) => path.join(/*turbopackIgnore: true*/ DATA_DIR, ...parts);

const queues = new Map<string, Promise<unknown>>();

async function readFile<T>(name: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(/*turbopackIgnore: true*/ at(`${name}.json`), "utf8");
    return JSON.parse(raw) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export function readCollection<T>(name: string): Promise<T[]> {
  // Wait for in-flight writes so reads never observe a half-applied change.
  return (queues.get(name) ?? Promise.resolve()).then(() => readFile<T>(name), () => readFile<T>(name));
}

/** Run `fn` against the collection; the (possibly mutated) array is persisted afterwards. */
export function mutateCollection<T, R>(name: string, fn: (items: T[]) => R | Promise<R>): Promise<R> {
  const run = (queues.get(name) ?? Promise.resolve()).catch(() => undefined).then(async () => {
    const items = await readFile<T>(name);
    const result = await fn(items);
    await fs.mkdir(DATA_DIR, { recursive: true });
    const file = at(`${name}.json`);
    const tmp = `${file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf8");
    await fs.rename(tmp, file);
    return result;
  });
  queues.set(name, run);
  return run;
}

export async function writeBlob(dir: string, fileName: string, data: Buffer) {
  const target = at(dir);
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, fileName), data);
}

export async function readBlob(dir: string, fileName: string) {
  try {
    return await fs.readFile(/*turbopackIgnore: true*/ at(dir, fileName));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function deleteBlob(dir: string, fileName: string) {
  await fs.rm(/*turbopackIgnore: true*/ at(dir, fileName), { force: true });
}
