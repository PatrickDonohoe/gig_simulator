// Generates every favicon format from the source SVG into public/.
// Run with: pnpm icons
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'src/assets/icons/logo_favicon.svg';
const OUT = 'public';

const svg = await readFile(SOURCE);
// Rasterize at high density so downscaled PNGs stay crisp.
const render = (size) =>
  sharp(svg, { density: 600 }).resize(size, size).png().toBuffer();

// Packs PNG images into a single .ico (Vista+ supports PNG-encoded entries).
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

// Modern browsers: SVG (supports prefers-color-scheme).
await copyFile(SOURCE, `${OUT}/favicon.svg`);

// Legacy browsers, RSS readers, and anything requesting /favicon.ico directly.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await render(size) })),
);
await writeFile(`${OUT}/favicon.ico`, buildIco(icoPngs));

// iOS home screen. iOS fills transparency with black, so use a solid
// background and pad the logo inside it.
const APPLE_SIZE = 180;
const APPLE_PADDING = 20;
await sharp({
  create: {
    width: APPLE_SIZE,
    height: APPLE_SIZE,
    channels: 4,
    background: '#ffffff',
  },
})
  .composite([{ input: await render(APPLE_SIZE - APPLE_PADDING * 2) }])
  .png()
  .toFile(`${OUT}/apple-touch-icon.png`);

// Android / PWA install icons, referenced by manifest.webmanifest.
for (const size of [192, 512]) {
  await writeFile(`${OUT}/icon-${size}.png`, await render(size));
}

console.log('Favicons written to public/');
