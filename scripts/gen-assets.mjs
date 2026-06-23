/**
 * Generates brand raster assets into /public from the StudNexus mark.
 *   node scripts/gen-assets.mjs
 *
 * Outputs: logo.png, icon-192.png, icon-512.png, apple-touch-icon.png,
 *          favicon-48.png, og-image.png
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");

// Square brand mark (gradient rounded square + "N" constellation).
const markSvg = (size = 512) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
  </defs>
  <rect x="16" y="16" width="480" height="480" rx="116" fill="url(#g)"/>
  <path d="M150 372V140l212 232V140" fill="none" stroke="#ffffff" stroke-width="38"
        stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="150" cy="140" r="34" fill="#ffffff"/>
  <circle cx="362" cy="372" r="34" fill="#ffffff"/>
</svg>`;

// Social / Open Graph card (1200x630).
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0b12"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- mark -->
  <g transform="translate(96,150)">
    <rect width="120" height="120" rx="30" fill="url(#mark)"/>
    <path d="M35 92V35l50 54V35" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="35" cy="35" r="8" fill="#fff"/>
    <circle cx="85" cy="92" r="8" fill="#fff"/>
  </g>
  <text x="240" y="232" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700"><tspan fill="#ffffff">Stud</tspan><tspan fill="url(#brand)">Nexus</tspan></text>

  <text x="96" y="356" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="700" fill="#f4f4f5">The AI-Powered</text>
  <text x="96" y="430" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="700" fill="url(#brand)">Learning Operating System</text>

  <text x="96" y="510" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#a1a1aa">Organize notes · Chat with PDFs · Generate quizzes · Plan &amp; revise</text>
  <text x="96" y="566" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#71717a">studnexus.com · a DataSmith Research Labs product</text>
</svg>`;

const out = (name) => path.join(PUBLIC, name);

const tasks = [
  sharp(Buffer.from(markSvg(512))).png().toFile(out("logo.png")),
  sharp(Buffer.from(markSvg(512))).resize(512, 512).png().toFile(out("icon-512.png")),
  sharp(Buffer.from(markSvg(192))).resize(192, 192).png().toFile(out("icon-192.png")),
  sharp(Buffer.from(markSvg(180))).resize(180, 180).png().toFile(out("apple-touch-icon.png")),
  sharp(Buffer.from(markSvg(48))).resize(48, 48).png().toFile(out("favicon-48.png")),
  sharp(Buffer.from(ogSvg)).png().toFile(out("og-image.png")),
];

await Promise.all(tasks);
console.log("Generated: logo.png, icon-512.png, icon-192.png, apple-touch-icon.png, favicon-48.png, og-image.png");
