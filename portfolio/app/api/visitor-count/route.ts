import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Must run on the Node.js runtime (not Edge) since we use the filesystem,
// and must never be statically cached — every request needs the live count.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitor-count.json");

async function readCount(): Promise<number> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed.count === "number" && Number.isFinite(parsed.count)
      ? parsed.count
      : 0;
  } catch {
    // File doesn't exist yet (first run) or is unreadable — start from 0.
    return 0;
  }
}

async function writeCount(count: number): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify({ count }, null, 2), "utf-8");
}

// Serialize writes within a single server process so two near-simultaneous
// increments can't both read the same value and stomp on each other.
let writeLock: Promise<unknown> = Promise.resolve();

/** GET returns the current count without incrementing it (used for repeat visits). */
export async function GET() {
  const count = await readCount();
  return NextResponse.json({ count });
}

/** POST increments the count by one and returns the new total (used for new/unique visitors). */
export async function POST() {
  const run = writeLock.then(async () => {
    const current = await readCount();
    const next = current + 1;
    await writeCount(next);
    return next;
  });
  // Chain the next call after this one regardless of success/failure.
  writeLock = run.catch(() => {});
  const count = await run;
  return NextResponse.json({ count });
}
