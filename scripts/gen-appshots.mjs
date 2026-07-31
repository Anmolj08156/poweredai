/**
 * Optimizes the raw app screenshots (Apppics/) into web-ready WebP files
 * under public/app/ — a full size for the hero and a light thumb for the carousel.
 *   node scripts/gen-appshots.mjs
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "Apppics");
const OUT = path.join(ROOT, "public", "app");
fs.mkdirSync(OUT, { recursive: true });

const MAP = {
  "Dashboard.png": "dashboard",
  "AI Classroom.png": "ai-classroom",
  "AI workspace.png": "ai-workspace",
  "Quiz and mock test.png": "quiz",
  "Study planner.png": "study-planner",
  "Community.png": "community",
};

for (const [src, name] of Object.entries(MAP)) {
  const input = path.join(SRC, src);
  await sharp(input).resize({ width: 1500, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`));
  await sharp(input).resize({ width: 560, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(OUT, `${name}-thumb.webp`));
}
console.log("Optimized app screenshots -> public/app/");
