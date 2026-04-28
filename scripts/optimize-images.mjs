#!/usr/bin/env node
// Optimize project images in public/ in-place.
// - Resizes to max 2400px on long edge (retina-friendly)
// - Encodes JPEG quality 88 with mozjpeg
// - PNG renders are converted to JPEG (we lose alpha but they have none anyway)
// - Skips files smaller than 200KB (already optimized)

import sharp from "sharp";
import { readdir, stat, unlink, rename } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/projects");
const MAX_LONG_EDGE = 2400;
const JPEG_QUALITY = 88;
const SKIP_BELOW = 200 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let totalIn = 0;
let totalOut = 0;
let processed = 0;
let skipped = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const { size: sizeIn } = await stat(file);
  if (sizeIn < SKIP_BELOW && ext !== ".png") {
    skipped++;
    continue;
  }

  const tmp = file + ".tmp.jpg";
  try {
    const meta = await sharp(file).metadata();
    const long = Math.max(meta.width || 0, meta.height || 0);
    const resize = long > MAX_LONG_EDGE
      ? { width: meta.width >= meta.height ? MAX_LONG_EDGE : null, height: meta.height > meta.width ? MAX_LONG_EDGE : null, fit: "inside" }
      : null;

    let pipeline = sharp(file).rotate();
    if (resize) pipeline = pipeline.resize(resize);
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true });
    await pipeline.toFile(tmp);

    const { size: sizeOut } = await stat(tmp);

    if (sizeOut >= sizeIn && ext === ".jpg") {
      await unlink(tmp);
      skipped++;
      continue;
    }

    const finalPath = ext === ".png" ? file.replace(/\.png$/i, ".jpg") : file;
    if (ext === ".png") await unlink(file);
    await rename(tmp, finalPath);

    totalIn += sizeIn;
    totalOut += sizeOut;
    processed++;
    if (processed % 25 === 0) {
      console.log(`  ${processed} processed (${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(1)} MB)`);
    }
  } catch (err) {
    console.error(`  ! ${file}: ${err.message}`);
    try { await unlink(tmp); } catch {}
  }
}

console.log(`\nDone. ${processed} files: ${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(1)} MB (skipped ${skipped})`);
