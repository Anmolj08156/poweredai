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

// Placeholder avatar for the "Anushka" mail signature (flat illustration).
// Replace public/anushka.png with a real photo any time.
const avatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="ab" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fcd497"/>
      <stop offset="100%" stop-color="#ec8b0d"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="256" fill="url(#ab)"/>
  <path d="M136 250 C136 150 200 96 256 96 C312 96 376 150 376 250 C376 340 360 420 360 440 L152 440 C152 420 136 340 136 250 Z" fill="#3a2419"/>
  <path d="M150 512 C150 420 195 384 256 384 C317 384 362 420 362 512 Z" fill="#6d4436"/>
  <path d="M226 330 h60 v46 c0 20 -60 20 -60 0 Z" fill="#e8b489"/>
  <ellipse cx="256" cy="238" rx="92" ry="104" fill="#f3c99e"/>
  <circle cx="166" cy="244" r="16" fill="#f3c99e"/>
  <circle cx="346" cy="244" r="16" fill="#f3c99e"/>
  <path d="M164 232 C160 150 250 120 256 120 C262 120 352 150 348 232 C348 190 330 150 300 150 C300 175 280 188 256 188 C232 188 212 175 212 150 C182 150 164 190 164 232 Z" fill="#3a2419"/>
  <path d="M206 214 q22 -12 44 -2" stroke="#3a2419" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M262 212 q22 -10 44 2" stroke="#3a2419" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="224" cy="240" rx="11" ry="13" fill="#2a1c14"/>
  <ellipse cx="288" cy="240" rx="11" ry="13" fill="#2a1c14"/>
  <circle cx="227" cy="236" r="3.5" fill="#fff"/>
  <circle cx="291" cy="236" r="3.5" fill="#fff"/>
  <path d="M256 250 l-6 20 q6 6 12 0" stroke="#d9a67a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M230 288 q26 24 52 0" stroke="#b5654a" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="200" cy="272" r="14" fill="#f0a074" opacity="0.45"/>
  <circle cx="312" cy="272" r="14" fill="#f0a074" opacity="0.45"/>
</svg>`;

const out = (name) => path.join(PUBLIC, name);

const tasks = [
  sharp(Buffer.from(markSvg(512))).png().toFile(out("logo.png")),
  sharp(Buffer.from(markSvg(512))).resize(512, 512).png().toFile(out("icon-512.png")),
  sharp(Buffer.from(markSvg(192))).resize(192, 192).png().toFile(out("icon-192.png")),
  sharp(Buffer.from(markSvg(180))).resize(180, 180).png().toFile(out("apple-touch-icon.png")),
  sharp(Buffer.from(markSvg(48))).resize(48, 48).png().toFile(out("favicon-48.png")),
  sharp(Buffer.from(ogSvg)).png().toFile(out("og-image.png")),
  sharp(Buffer.from(avatarSvg)).resize(256, 256).png().toFile(out("anushka.png")),
];

await Promise.all(tasks);
console.log("Generated: logo.png, icon-512.png, icon-192.png, apple-touch-icon.png, favicon-48.png, og-image.png");
