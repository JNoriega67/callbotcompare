// One-off: produce two derivatives from the original logo file:
//   1. public/calltreo-logo.png — wider crop with both the icon mark
//      and the wordmark, background chroma-keyed to transparent so it
//      sits cleanly on any page color.
//   2. app/icon.png — square crop of just the icon mark, same
//      transparent background.
//
// Source: /tmp/calltreo-logo-original.png (the user-supplied asset,
// restored from git history if needed).
//
// Run: node scripts/crop-logo.mjs

import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const SRC = "/tmp/calltreo-logo-original.png";

// Crops on the source asset (1448 x 1086). FULL_BOX is intentionally
// generous on the right edge + bottom so the trailing "o" in "Treo"
// and the macron on the "ē" don't clip at smaller render sizes.
const FULL_BOX = { left: 80, top: 280, width: 1340, height: 540 };
const ICON_BOX = { left: 150, top: 350, width: 420, height: 420 };

/**
 * Replace the cream backdrop with transparency using a 4-corner flood
 * fill. Stops at any pixel that differs meaningfully from the seed
 * (the corner color), so the cream surrounding the mark goes away but
 * any white-ish pixels *inside* the mark (eyes, highlights) survive
 * because they're walled off by the dark bubble outline.
 */
function chromaKey(raw, width, height, threshold = 32) {
  const channels = 4; // RGBA
  // Seed color = top-left pixel.
  const seedR = raw[0];
  const seedG = raw[1];
  const seedB = raw[2];

  const near = (idx) => {
    const dr = raw[idx] - seedR;
    const dg = raw[idx + 1] - seedG;
    const db = raw[idx + 2] - seedB;
    return dr * dr + dg * dg + db * db <= threshold * threshold;
  };

  const visited = new Uint8Array(width * height);
  // Use a tight numeric ring buffer instead of a JS array to keep
  // memory + GC pressure low on ~1M pixel inputs.
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  const seed = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const idx = p * channels;
    if (!near(idx)) return;
    visited[p] = 1;
    queue[qTail++] = p;
  };
  seed(0, 0);
  seed(width - 1, 0);
  seed(0, height - 1);
  seed(width - 1, height - 1);

  while (qHead < qTail) {
    const p = queue[qHead++];
    const x = p % width;
    const y = (p / width) | 0;
    // Erase alpha on this pixel.
    raw[p * channels + 3] = 0;

    // Spread to 4-connected neighbors.
    if (x > 0) {
      const np = p - 1;
      if (!visited[np] && near(np * channels)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (x < width - 1) {
      const np = p + 1;
      if (!visited[np] && near(np * channels)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (y > 0) {
      const np = p - width;
      if (!visited[np] && near(np * channels)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (y < height - 1) {
      const np = p + width;
      if (!visited[np] && near(np * channels)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
  }
}

async function cropAndKey(src, box, dest) {
  const buf = await sharp(src)
    .extract(box)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  chromaKey(buf.data, buf.info.width, buf.info.height);
  await sharp(buf.data, {
    raw: { width: buf.info.width, height: buf.info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log(`-> ${dest} (${buf.info.width}x${buf.info.height})`);
}

await cropAndKey(SRC, FULL_BOX, "public/calltreo-logo.png");
await cropAndKey(SRC, ICON_BOX, "app/icon.png");
