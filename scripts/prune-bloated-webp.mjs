#!/usr/bin/env node
// Delete every *.optimized.webp that ended up larger than its source JPG.
// Source JPG stays in the repo; Vercel's next/image handles those at request time.

import { stat, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const fmtKB = (b) => `${Math.round(b / 1024).toLocaleString()} KB`;

let kept = 0, killed = 0, savedBytes = 0, lostBytes = 0;
const killedList = [], keptList = [];

for await (const f of walk(PUBLIC)) {
  if (!f.endsWith(".optimized.webp")) continue;
  const source = f.replace(/\.optimized\.webp$/i, ".jpg");
  try {
    const [s, w] = await Promise.all([stat(source), stat(f)]);
    const rel = path.relative(PUBLIC, source);
    if (w.size >= s.size) {
      await unlink(f);
      killed++;
      lostBytes += w.size - s.size;
      killedList.push({ rel, jpg: s.size, webp: w.size });
    } else {
      kept++;
      savedBytes += s.size - w.size;
      keptList.push({ rel, jpg: s.size, webp: w.size });
    }
  } catch (err) {
    console.error(`skip ${f}: ${err.message}`);
  }
}

console.log(`Kept:   ${kept} WebPs (smaller than source)  total saved: ${fmtKB(savedBytes)}`);
console.log(`Pruned: ${killed} WebPs (>= source — kept JPG instead)`);
console.log(`        would have wasted: ${fmtKB(lostBytes)}`);

if (killedList.length && killedList.length <= 20) {
  console.log("\nPruned files:");
  for (const k of killedList) console.log(`  ${k.rel}  jpg=${fmtKB(k.jpg)}  webp=${fmtKB(k.webp)}`);
}
