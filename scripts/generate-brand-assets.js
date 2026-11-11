const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// 1. Standalone Mark (SVG)
// 48x48 viewbox, scales infinitely, razor-sharp on 16px to 512px
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <!-- Background Tile -->
  <rect width="48" height="48" rx="10" fill="#7A1F3D"/>
  
  <!-- Subtle Antique Gold Inner Framing Hairline -->
  <rect x="2.5" y="2.5" width="43" height="43" rx="8" stroke="#B8915A" stroke-width="1" stroke-opacity="0.45"/>
  
  <!-- The Elegant Editorial "F" Letterform -->
  <g fill="#FFFFFF">
    <!-- Main Vertical Stem with Bilateral Base Serif -->
    <!-- Base serif -->
    <path d="M 12 36 L 24 36 L 24 34.5 L 20 34.5 L 20 15 L 23 15 L 23 13.5 L 13 13.5 L 13 15 L 16 15 L 16 34.5 L 12 34.5 Z"/>
    
    <!-- Top Arm & Terminal -->
    <path d="M 20 13.5 L 34.5 13.5 L 34.5 18 L 33 18 L 32.2 15.5 L 20 15.5 Z"/>
    
    <!-- Mid Crossbar -->
    <path d="M 20 23 L 29.5 23 L 30 25.5 L 28.5 25.5 L 28 24.5 L 20 24.5 Z"/>
  </g>
  
  <!-- The Signature Gold Bindu Accent -->
  <circle cx="34.5" cy="23.75" r="2.25" fill="#B8915A"/>
</svg>
`;

// 2. Full Horizontal Logo (SVG)
// Mark + "FEMINY" in high-contrast editorial serif + "ACADEMY" in tracked caps
const logoHorizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 52" fill="none">
  <!-- Mark on Left -->
  <g transform="translate(2, 2)">
    <rect width="48" height="48" rx="10" fill="#7A1F3D"/>
    <rect x="2.5" y="2.5" width="43" height="43" rx="8" stroke="#B8915A" stroke-width="1" stroke-opacity="0.45"/>
    <g fill="#FFFFFF">
      <path d="M 12 36 L 24 36 L 24 34.5 L 20 34.5 L 20 15 L 23 15 L 23 13.5 L 13 13.5 L 13 15 L 16 15 L 16 34.5 L 12 34.5 Z"/>
      <path d="M 20 13.5 L 34.5 13.5 L 34.5 18 L 33 18 L 32.2 15.5 L 20 15.5 Z"/>
      <path d="M 20 23 L 29.5 23 L 30 25.5 L 28.5 25.5 L 28 24.5 L 20 24.5 Z"/>
    </g>
    <circle cx="34.5" cy="23.75" r="2.25" fill="#B8915A"/>
  </g>
  
  <!-- Brand Typography -->
  <!-- FEMINY -->
  <text x="62" y="28" font-family="'Bodoni Moda', 'Playfair Display', Didot, 'Cinzel', serif" font-size="21" font-weight="600" fill="#161314" letter-spacing="-0.02em">FEMINY</text>
  
  <!-- ACADEMY (Tracked Gold) -->
  <text x="63" y="42" font-family="'Mukta', system-ui, sans-serif" font-size="9" font-weight="600" fill="#8A6A2F" letter-spacing="0.22em">ACADEMY</text>
  
  <!-- Subtle Hairline between wordmark & subtitle for elegance -->
  <line x1="62" y1="33" x2="185" y2="33" stroke="#E4DEDA" stroke-width="0.75"/>
</svg>
`;

// 3. White / Inverted Logo (for Dark Backgrounds / Guide section)
const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 52" fill="none">
  <!-- Mark on Left -->
  <g transform="translate(2, 2)">
    <rect width="48" height="48" rx="10" fill="#7A1F3D"/>
    <rect x="2.5" y="2.5" width="43" height="43" rx="8" stroke="#B8915A" stroke-width="1" stroke-opacity="0.6"/>
    <g fill="#FFFFFF">
      <path d="M 12 36 L 24 36 L 24 34.5 L 20 34.5 L 20 15 L 23 15 L 23 13.5 L 13 13.5 L 13 15 L 16 15 L 16 34.5 L 12 34.5 Z"/>
      <path d="M 20 13.5 L 34.5 13.5 L 34.5 18 L 33 18 L 32.2 15.5 L 20 15.5 Z"/>
      <path d="M 20 23 L 29.5 23 L 30 25.5 L 28.5 25.5 L 28 24.5 L 20 24.5 Z"/>
    </g>
    <circle cx="34.5" cy="23.75" r="2.25" fill="#B8915A"/>
  </g>
  
  <!-- Brand Typography -->
  <text x="62" y="28" font-family="'Bodoni Moda', 'Playfair Display', Didot, 'Cinzel', serif" font-size="21" font-weight="600" fill="#F2EFEC" letter-spacing="-0.02em">FEMINY</text>
  <text x="63" y="42" font-family="'Mukta', system-ui, sans-serif" font-size="9" font-weight="600" fill="#B8915A" letter-spacing="0.22em">ACADEMY</text>
  <line x1="62" y1="33" x2="185" y2="33" stroke="#B8915A" stroke-opacity="0.3" stroke-width="0.75"/>
</svg>
`;

async function main() {
  console.log('Writing vector SVG assets...');
  
  // Save SVG files
  fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), iconSvg);
  fs.writeFileSync(path.join(__dirname, '../app/icon.svg'), iconSvg);
  fs.writeFileSync(path.join(__dirname, '../public/logo-mark.svg'), iconSvg);
  fs.writeFileSync(path.join(__dirname, '../public/logo.svg'), logoHorizontalSvg);
  fs.writeFileSync(path.join(__dirname, '../public/logo-white.svg'), logoWhiteSvg);
  
  console.log('Generating crisp raster icons (PNG & ICO) via Chrome headless...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Sizes to render:
  // - 180x180 for apple-icon.png / apple-touch-icon.png
  // - 192x192 for web manifest
  // - 512x512 for web manifest / PWA
  // - 16, 32, 48 for favicon.ico
  
  const sizes = [16, 32, 48, 180, 192, 512];
  
  for (const s of sizes) {
    await page.setViewport({ width: s, height: s, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:transparent;">${iconSvg}</body></html>`);
    const svgEl = await page.$('svg');
    const pngPath = path.join(__dirname, `../public/icon-${s}.png`);
    await svgEl.screenshot({ path: pngPath, omitBackground: true });
    console.log(`Generated icon-${s}.png (${s}x${s})`);
  }

  // Copy 180 to apple-icon.png and apple-touch-icon.png
  fs.copyFileSync(
    path.join(__dirname, '../public/icon-180.png'),
    path.join(__dirname, '../public/apple-icon.png')
  );
  fs.copyFileSync(
    path.join(__dirname, '../public/icon-180.png'),
    path.join(__dirname, '../public/apple-touch-icon.png')
  );
  fs.copyFileSync(
    path.join(__dirname, '../public/icon-180.png'),
    path.join(__dirname, '../app/apple-icon.png')
  );

  await browser.close();

  // Create favicon.ico from 16, 32, 48 using Pillow
  console.log('Generating multi-resolution favicon.ico via Pillow...');
  execSync(`python3 -c "
from PIL import Image
im16 = Image.open('public/icon-16.png')
im32 = Image.open('public/icon-32.png')
im48 = Image.open('public/icon-48.png')
im48.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
im48.save('app/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print('favicon.ico successfully generated with 16, 32, and 48px bitmaps!')
"`, { stdio: 'inherit' });

  console.log('All brand assets and favicons successfully generated!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
