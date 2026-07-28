/**
 * Generates brand raster assets into /public from the StudNexus logo.
 *   node scripts/gen-assets.mjs
 *
 * SOURCE: brand-logo-src.jpg (copy of the master logo, gitignored).
 * Outputs: logo.png, icon-192/512.png, apple-touch-icon.png, favicon-*.png,
 *          og-image.png, and the anmol.png mail avatar.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.resolve(ROOT, "public");
const out = (name) => path.join(PUBLIC, name);

// Prefer the stable copy; fall back to the original WhatsApp filename.
function findSource() {
  const stable = path.join(ROOT, "brand-logo-src.jpg");
  if (fs.existsSync(stable)) return stable;
  const match = fs.readdirSync(ROOT).find((f) => /^WhatsApp Image.*\.(jpe?g|png)$/i.test(f));
  if (match) return path.join(ROOT, match);
  throw new Error("Logo source not found (brand-logo-src.jpg or WhatsApp Image*).");
}
const SOURCE = findSource();

// Center-crop to trim the dark padding around the mark.
async function cropBox() {
  const meta = await sharp(SOURCE).metadata();
  const size = Math.min(meta.width, meta.height);
  const crop = Math.round(size * 0.8);
  return {
    left: Math.round((meta.width - crop) / 2),
    top: Math.round((meta.height - crop) / 2),
    width: crop,
    height: crop,
  };
}

async function squareLogo(size) {
  const box = await cropBox();
  return sharp(SOURCE).extract(box).resize(size, size, { fit: "cover" }).png().toBuffer();
}

async function roundedLogo(size, radius) {
  const box = await cropBox();
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`
  );
  return sharp(SOURCE)
    .extract(box)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

// Male illustrated avatar for the mail signature (unchanged placeholder).
const avatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="ab" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fcd497"/>
      <stop offset="100%" stop-color="#ec8b0d"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="256" fill="url(#ab)"/>
  <path d="M144 512 C144 414 196 376 256 376 C316 376 368 414 368 512 Z" fill="#33445c"/>
  <path d="M236 380 L256 412 L276 380 Z" fill="#e8eef5"/>
  <path d="M230 322 h52 v52 c0 18 -52 18 -52 0 Z" fill="#e3a877"/>
  <path d="M168 236 C168 156 200 128 256 128 C312 128 344 156 344 236 C344 300 308 344 256 344 C204 344 168 300 168 236 Z" fill="#efb98c"/>
  <circle cx="170" cy="248" r="15" fill="#efb98c"/>
  <circle cx="342" cy="248" r="15" fill="#efb98c"/>
  <path d="M166 226 C160 150 210 116 256 116 C302 116 352 150 346 226 C344 196 340 174 320 168 C316 188 292 198 256 198 C220 198 196 188 192 168 C172 174 168 196 166 226 Z" fill="#2a1c14"/>
  <path d="M200 218 q24 -8 46 0" stroke="#2a1c14" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M266 218 q22 -8 46 0" stroke="#2a1c14" stroke-width="9" fill="none" stroke-linecap="round"/>
  <ellipse cx="222" cy="242" rx="10" ry="12" fill="#2a1c14"/>
  <ellipse cx="290" cy="242" rx="10" ry="12" fill="#2a1c14"/>
  <circle cx="225" cy="238" r="3" fill="#fff"/>
  <circle cx="293" cy="238" r="3" fill="#fff"/>
  <path d="M256 252 l-6 24 q6 6 12 0" stroke="#cf9068" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M228 296 q28 20 56 0" stroke="#a86545" stroke-width="7" fill="none" stroke-linecap="round"/>
</svg>`;

// Open Graph / social card background (logo is composited on top).
const ogBgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120d09"/>
      <stop offset="100%" stop-color="#0e0b08"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#ec8b0d" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ec8b0d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f9bb60"/>
      <stop offset="100%" stop-color="#f5a623"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="266" y="234" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="700"><tspan fill="#ffffff">Stud</tspan><tspan fill="url(#brand)">Nexus</tspan></text>
  <text x="96" y="360" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#f4f4f5">The AI-Powered</text>
  <text x="96" y="438" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="url(#brand)">Learning Operating System</text>
  <text x="96" y="512" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#a1a1aa">Organize notes · Chat with PDFs · Generate quizzes · Plan &amp; revise</text>
  <text x="96" y="568" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#71717a">studnexus.com · a DataSmith Research Labs product</text>
</svg>`;

async function main() {
  await sharp(await squareLogo(512)).toFile(out("logo.png"));
  await sharp(await squareLogo(512)).toFile(out("icon-512.png"));
  await sharp(await squareLogo(192)).toFile(out("icon-192.png"));
  await sharp(await roundedLogo(180, 40)).toFile(out("apple-touch-icon.png"));
  await sharp(await squareLogo(96)).toFile(out("favicon-96.png"));
  await sharp(await squareLogo(48)).toFile(out("favicon-48.png"));

  await sharp(Buffer.from(avatarSvg)).resize(256, 256).png().toFile(out("anmol.png"));

  const logoTile = await roundedLogo(128, 30);
  await sharp(Buffer.from(ogBgSvg))
    .composite([{ input: logoTile, top: 150, left: 96 }])
    .png()
    .toFile(out("og-image.png"));

  console.log(`Generated brand assets from: ${path.basename(SOURCE)}`);
}

main();
