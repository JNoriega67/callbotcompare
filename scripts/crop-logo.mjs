// One-off: produce two cropped derivatives from the original logo file:
//   1. public/calltreo-logo.png — wordmark-only, used in the header
//      (the original has heavy padding + the icon mark on the left, so
//       rendered at header height the wordmark text reads tiny).
//   2. app/icon.png — square crop of just the icon mark, used as the
//      favicon (browsers scale to 16x16 — a wordmark would smear).
//
// Source: /tmp/calltreo-logo-original.png (restored from git HEAD)
// Run:    node scripts/crop-logo.mjs

import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const SRC = "/tmp/calltreo-logo-original.png";

// Empirical crop boxes for the source asset (1448 x 1086).
const WORDMARK_BOX = { left: 520, top: 380, width: 860, height: 380 };
const ICON_BOX = { left: 150, top: 350, width: 420, height: 420 };

async function crop(src, box, dest) {
  await sharp(src).extract(box).png({ compressionLevel: 9 }).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`-> ${dest} (${meta.width}x${meta.height})`);
}

await crop(SRC, WORDMARK_BOX, "public/calltreo-logo.png");
await crop(SRC, ICON_BOX, "app/icon.png");
