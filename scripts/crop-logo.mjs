// One-off: produce two derivatives from the original logo file.
// Generates true-transparent PNGs (RGBA) so the same image can render
// on light surfaces and be color-filtered to white on dark surfaces.
//
//   1. public/calltreo-logo.png — full wordmark + icon, transparent.
//   2. app/icon.png             — square icon-mark crop, transparent.
//
// Source: /tmp/calltreo-logo-original.png (restored from git history).
//
// Transparency is done in two passes so we kill cream pixels *inside*
// closed letter counters (the holes in 'a', 'e', 'o') without losing
// the legitimate whites inside the icon mark.

import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const SRC = "/tmp/calltreo-logo-original.png";

// Crops on the source asset (1448 x 1086). Pushed close to the source's
// right edge so the trailing 'o' in "Treo" + macron over 'ē' don't clip.
const FULL_BOX = { left: 60, top: 260, width: 1380, height: 580 };
const ICON_BOX = { left: 150, top: 350, width: 420, height: 420 };

// Pass 1 — generous flood-fill from corners. Catches the bulk of the
// cream plus anti-aliased letter edges that fade toward cream.
const FLOOD_THRESHOLD = 32;
// Pass 2 — tight unconditional sweep for cream pixels missed by the
// flood fill (the closed letter counters). Tight enough that pure
// whites inside the icon mark are preserved.
const COUNTER_THRESHOLD = 18;

function colorDist2(raw, idx, r, g, b) {
  const dr = raw[idx] - r;
  const dg = raw[idx + 1] - g;
  const db = raw[idx + 2] - b;
  return dr * dr + dg * dg + db * db;
}

function floodFromCorners(raw, width, height, seedR, seedG, seedB) {
  const channels = 4;
  const t2 = FLOOD_THRESHOLD * FLOOD_THRESHOLD;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  const seed = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    if (colorDist2(raw, p * channels, seedR, seedG, seedB) > t2) return;
    visited[p] = 1;
    queue[qTail++] = p;
  };
  seed(0, 0);
  seed(width - 1, 0);
  seed(0, height - 1);
  seed(width - 1, height - 1);

  while (qHead < qTail) {
    const p = queue[qHead++];
    raw[p * channels + 3] = 0;
    const x = p % width;
    const y = (p / width) | 0;
    const tryNeighbor = (np) => {
      if (visited[np]) return;
      if (colorDist2(raw, np * channels, seedR, seedG, seedB) > t2) return;
      visited[np] = 1;
      queue[qTail++] = np;
    };
    if (x > 0) tryNeighbor(p - 1);
    if (x < width - 1) tryNeighbor(p + 1);
    if (y > 0) tryNeighbor(p - width);
    if (y < height - 1) tryNeighbor(p + width);
  }
}

function killRemainingCream(raw, width, height, seedR, seedG, seedB) {
  const channels = 4;
  const t2 = COUNTER_THRESHOLD * COUNTER_THRESHOLD;
  for (let p = 0; p < width * height; p++) {
    const idx = p * channels;
    if (raw[idx + 3] === 0) continue; // already transparent
    if (colorDist2(raw, idx, seedR, seedG, seedB) <= t2) {
      raw[idx + 3] = 0;
    }
  }
}

async function cropAndKey(src, box, dest) {
  const buf = await sharp(src)
    .extract(box)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = buf.info;
  // Seed color = the top-left corner pixel.
  const seedR = buf.data[0];
  const seedG = buf.data[1];
  const seedB = buf.data[2];

  floodFromCorners(buf.data, width, height, seedR, seedG, seedB);
  killRemainingCream(buf.data, width, height, seedR, seedG, seedB);

  await sharp(buf.data, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log(`-> ${dest} (${width}x${height})`);
}

await cropAndKey(SRC, FULL_BOX, "public/calltreo-logo.png");
await cropAndKey(SRC, ICON_BOX, "app/icon.png");
