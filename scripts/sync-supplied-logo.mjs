import fs from 'node:fs/promises';
import sharp from 'sharp';

// Only resizes the supplied artwork. The original JPEG remains unchanged.
const source = await fs.readFile('public/brand/feminy-academy-logo.jpg');
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
// Raster artwork embedded without vector tracing or redrawing.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1266 1223"><image width="1266" height="1223" href="data:image/jpeg;base64,${source.toString('base64')}"/></svg>`;
await fs.writeFile('app/icon.svg',svg);
await fs.writeFile('public/icon.svg',svg);
console.log('Synced supplied crest to browser and app icons.');
