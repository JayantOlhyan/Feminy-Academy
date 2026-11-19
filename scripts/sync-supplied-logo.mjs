import fs from 'node:fs/promises';
import sharp from 'sharp';

// Resizes the transparent derivative. The original source JPEG remains unchanged.
const source = await fs.readFile('public/brand/feminy-crest-transparent.png');
const metadata = await sharp(source).metadata();
await fs.writeFile('public/brand/feminy-crest-navbar.png', await sharp(source).resize(210,210,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer());
for (const size of [16,32,48,180,192,512]) {
  const png = await sharp(source).resize(size,size,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();
  await fs.writeFile(`public/icon-${size}.png`,png);
  if (size === 180) for (const path of ['public/apple-icon.png','public/apple-touch-icon.png','app/apple-icon.png']) await fs.writeFile(path,png);
  if (size === 512) await fs.writeFile('app/icon.png',png);
  if (size === 32) {
    const header = Buffer.alloc(22);
    header.writeUInt16LE(1,2); header.writeUInt16LE(1,4); header[6]=32; header[7]=32;
    header.writeUInt16LE(1,10); header.writeUInt16LE(32,12); header.writeUInt32LE(png.length,14); header.writeUInt32LE(22,18);
    for (const path of ['app/favicon.ico','public/favicon.ico']) await fs.writeFile(path,Buffer.concat([header,png]));
  }
}
// Embed the transparent raster derivative without additional tracing or recolouring.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${metadata.width} ${metadata.height}"><image width="${metadata.width}" height="${metadata.height}" href="data:image/png;base64,${source.toString('base64')}"/></svg>`;
await fs.writeFile('app/icon.svg',svg);
await fs.writeFile('public/icon.svg',svg);
console.log('Synced supplied crest to browser and app icons.');
