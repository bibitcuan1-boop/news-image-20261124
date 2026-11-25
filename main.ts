// Entry point for the news-image-20261124 submission.
//
// The front page is a pre-rendered PNG (entry.png) produced from the
// hand-written HTML/CSS in index.html. This program's only job is to
// place an exact copy of that image into the output directory the
// harness expects, so the graded artefact is the image itself.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

// Sanity check: the file must start with the PNG signature.
const header = readFileSync(source).subarray(0, 8);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!header.equals(pngSignature)) {
  throw new Error(`entry image is not a PNG: ${source}`);
}

mkdirSync(outDir, { recursive: true });
const destination = join(outDir, "entry.png");
copyFileSync(source, destination);
console.log(`Wrote ${destination}`);
