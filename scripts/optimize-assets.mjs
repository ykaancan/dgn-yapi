#!/usr/bin/env node
// Asset optimization pipeline for production deploy.
// Outputs *.optimized.{mp4,webp} next to each source. Idempotent — skips files already done.
// Run: node scripts/optimize-assets.mjs [--force] [--only=videos|images]

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { stat, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const exec = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const ONLY = [...args].find((a) => a.startsWith("--only="))?.split("=")[1];

const VIDEO_JOBS = [
  { src: "video/dogan-yasam-evleri-hero-loop.mp4", crf: 23, audio: false },
  { src: "video/dogan-yasam-evleri.mp4", crf: 23, audio: true },
  { src: "video/camlik.mp4", crf: 23, audio: true },
  { src: "video/gunaltay.mp4", crf: 23, audio: true },
];

const IMAGE_JOBS = [
  { glob: "brand/cepli-*.jpg", quality: 92, maxWidth: 2400 },
  { glob: "projects/**/*.jpg", quality: 90, maxWidth: 2400 },
];

async function fileExists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function sizeOf(p) {
  return (await stat(p)).size;
}

function fmtKB(bytes) {
  return `${Math.round(bytes / 1024).toLocaleString()} KB`;
}

function fmtPct(now, before) {
  return `${Math.round((now / before) * 100)}%`;
}

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function expandImageGlob(globPattern) {
  // Supports "brand/cepli-*.jpg" and "projects/**/*.jpg"
  const [head, ...rest] = globPattern.split("/");
  const isRecursive = globPattern.includes("**");
  const baseDir = path.join(PUBLIC, head);
  const filenamePattern = rest[rest.length - 1];
  const re = new RegExp("^" + filenamePattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$", "i");
  const out = [];
  if (!(await fileExists(baseDir))) return out;
  if (isRecursive) {
    for await (const f of walk(baseDir)) {
      if (re.test(path.basename(f)) && !f.includes(".optimized.")) out.push(f);
    }
  } else {
    for (const e of await readdir(baseDir, { withFileTypes: true })) {
      if (e.isFile() && re.test(e.name) && !e.name.includes(".optimized.")) {
        out.push(path.join(baseDir, e.name));
      }
    }
  }
  return out;
}

async function encodeVideo({ src, crf, audio }) {
  const input = path.join(PUBLIC, src);
  const output = input.replace(/\.mp4$/i, ".optimized.mp4");
  if (!FORCE && (await fileExists(output))) {
    return { input, output, skipped: true, before: await sizeOf(input), after: await sizeOf(output) };
  }
  const before = await sizeOf(input);
  const audioArgs = audio ? ["-c:a", "aac", "-b:a", "96k"] : ["-an"];
  const ffArgs = [
    "-y", "-hide_banner", "-loglevel", "error",
    "-i", input,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    ...audioArgs,
    output,
  ];
  await exec("ffmpeg", ffArgs, { maxBuffer: 32 * 1024 * 1024 });
  const after = await sizeOf(output);
  return { input, output, skipped: false, before, after };
}

async function encodeImage(input, { quality, maxWidth }) {
  const ext = path.extname(input);
  const output = input.slice(0, -ext.length) + ".optimized.webp";
  if (!FORCE && (await fileExists(output))) {
    return { input, output, skipped: true, before: await sizeOf(input), after: await sizeOf(output) };
  }
  const before = await sizeOf(input);
  await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);
  const after = await sizeOf(output);
  return { input, output, skipped: false, before, after };
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let i = 0;
  async function run() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      try {
        results[idx] = await worker(items[idx], idx);
      } catch (err) {
        results[idx] = { error: err, item: items[idx] };
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

function summarize(label, results) {
  const ok = results.filter((r) => r && !r.error);
  const failed = results.filter((r) => r && r.error);
  const before = ok.reduce((s, r) => s + r.before, 0);
  const after = ok.reduce((s, r) => s + r.after, 0);
  console.log(`\n=== ${label} ===`);
  console.log(`  files: ${ok.length}  failed: ${failed.length}`);
  console.log(`  before: ${fmtKB(before)}  after: ${fmtKB(after)}  (${fmtPct(after, before)})`);
  for (const f of failed) console.log(`  FAIL: ${f.item.src ?? f.item}: ${f.error.message}`);
}

async function main() {
  const t0 = Date.now();

  if (!ONLY || ONLY === "videos") {
    console.log(`Encoding ${VIDEO_JOBS.length} videos (CRF 23, preset slow)...`);
    const videoResults = await pool(VIDEO_JOBS, async (job) => {
      const t = Date.now();
      const r = await encodeVideo(job);
      const status = r.skipped ? "SKIP" : `${Math.round((Date.now() - t) / 1000)}s`;
      console.log(`  [${status}] ${path.basename(r.input)}: ${fmtKB(r.before)} -> ${fmtKB(r.after)} (${fmtPct(r.after, r.before)})`);
      return r;
    }, 2); // 2 parallel encodes — x264 slow is CPU-heavy
    summarize("Videos", videoResults);
  }

  if (!ONLY || ONLY === "images") {
    const imageInputs = [];
    for (const job of IMAGE_JOBS) {
      const files = await expandImageGlob(job.glob);
      for (const f of files) imageInputs.push({ file: f, opts: job });
    }
    console.log(`\nEncoding ${imageInputs.length} images...`);
    const imageResults = await pool(imageInputs, async ({ file, opts }) => {
      const r = await encodeImage(file, opts);
      const rel = path.relative(PUBLIC, r.input);
      const status = r.skipped ? "SKIP" : "OK";
      // Quieter per-file output for images (lots of them)
      if (!r.skipped || imageInputs.length < 30) {
        console.log(`  [${status}] ${rel}: ${fmtKB(r.before)} -> ${fmtKB(r.after)} (${fmtPct(r.after, r.before)})`);
      }
      return r;
    }, 6);
    summarize("Images", imageResults);
  }

  console.log(`\nDone in ${Math.round((Date.now() - t0) / 1000)}s.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
