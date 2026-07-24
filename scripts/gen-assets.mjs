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
      <stop offset="0%" stop-color="#f5a623"/>
      <stop offset="100%" stop-color="#d97706"/>
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
      <stop offset="0%" stop-color="#1a130c"/>
      <stop offset="100%" stop-color="#181009"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#ec8b0d" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ec8b0d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5a623"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f9bb60"/>
      <stop offset="100%" stop-color="#f5a623"/>
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
  <text x="240" y="234" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="700"><tspan fill="#ffffff">Stud</tspan><tspan fill="url(#brand)">Nexus</tspan></text>

  <text x="96" y="358" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="#f4f4f5">The AI-Powered</text>
  <text x="96" y="436" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="url(#brand)">Learning Operating System</text>

  <text x="96" y="510" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#a1a1aa">Organize notes · Chat with PDFs · Generate quizzes · Plan &amp; revise</text>
  <text x="96" y="566" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#71717a">studnexus.com · a DataSmith Research Labs product</text>
</svg>`;

// Illustrated male avatar for the mail signature (placeholder).
// Replace public/anmol.png with a real photo any time.
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

const out = (name) => path.join(PUBLIC, name);

const tasks = [
  sharp(Buffer.from(markSvg(512))).png().toFile(out("logo.png")),
  sharp(Buffer.from(markSvg(512))).resize(512, 512).png().toFile(out("icon-512.png")),
  sharp(Buffer.from(markSvg(192))).resize(192, 192).png().toFile(out("icon-192.png")),
  sharp(Buffer.from(markSvg(180))).resize(180, 180).png().toFile(out("apple-touch-icon.png")),
  sharp(Buffer.from(markSvg(48))).resize(48, 48).png().toFile(out("favicon-48.png")),
  sharp(Buffer.from(ogSvg)).png().toFile(out("og-image.png")),
  sharp(Buffer.from(avatarSvg)).resize(256, 256).png().toFile(out("anmol.png")),
];

await Promise.all(tasks);
console.log("Generated: logo.png, icon-512.png, icon-192.png, apple-touch-icon.png, favicon-48.png, og-image.png");
