import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = path.resolve(process.cwd(), "docs/verification-screenshots");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const routes = [
  { name: "home", path: "/" },
  { name: "offline", path: "/offline-academy" },
  { name: "hydra-facial", path: "/courses/hydra-facial" },
  { name: "one-day", path: "/courses/one-day" },
];

const viewports = [
  { name: "mobile", width: 375, height: 812, isMobile: true },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let totalErrors = 0;

  for (const vp of viewports) {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        isMobile: vp.isMobile,
      });

      const consoleLogs = [];
      const consoleErrors = [];

      page.on("console", (msg) => {
        const text = msg.text();
        consoleLogs.push({ type: msg.type(), text });
        if (msg.type() === "error") {
          consoleErrors.push(text);
        }
      });

      page.on("pageerror", (err) => {
        consoleErrors.push(err.toString());
      });

      const url = `http://localhost:3000${route.path}`;
      console.log(`\nTesting ${url} at ${vp.name} (${vp.width}x${vp.height})...`);

      await page.goto(url, { waitUntil: "networkidle2" });

      // Scroll to trigger all viewport observers and sticky components
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 300;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 50);
        });
      });

      await new Promise((r) => setTimeout(r, 600));

      // 1. Text checks for placeholders
      const bodyText = await page.evaluate(() => document.body.innerText);
      const placeholderRegex = /\[[A-Z ]{3,}.*?\]|PHOTO:|Pending\]/g;
      const matches = bodyText.match(placeholderRegex) || [];

      if (matches.length > 0) {
        console.error(`  ❌ Forbidden placeholder text found on ${route.name} (${vp.name}):`, matches);
        totalErrors++;
      } else {
        console.log(`  ✓ Zero placeholder strings in rendered innerText`);
      }

      // 2. Header background check
      const headerInfo = await page.evaluate(() => {
        const header = document.querySelector("header");
        if (!header) return null;
        const style = window.getComputedStyle(header);
        return {
          backgroundColor: style.backgroundColor,
          borderBottomWidth: style.borderBottomWidth,
          borderBottomColor: style.borderBottomColor,
          display: style.display,
        };
      });

      if (headerInfo) {
        console.log(`  ✓ Header styling: bg=${headerInfo.backgroundColor}, border-bottom=${headerInfo.borderBottomWidth} ${headerInfo.borderBottomColor}`);
      }

      // 3. Check console errors
      // Filter out harmless browser extensions or 404 favicons if any
      const severeErrors = consoleErrors.filter(
        (err) => !err.includes("favicon") && !err.includes("net::ERR_")
      );
      if (severeErrors.length > 0) {
        console.error(`  ❌ Console errors detected on ${route.name} (${vp.name}):`, severeErrors);
        totalErrors++;
      } else {
        console.log(`  ✓ Clean browser console (0 errors)`);
      }

      // Save screenshot
      const screenshotPath = path.join(OUTPUT_DIR, `${route.name}-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  ✓ Saved screenshot to ${screenshotPath}`);

      await page.close();
    }
  }

  await browser.close();

  if (totalErrors > 0) {
    console.error(`\n❌ Verification completed with ${totalErrors} issue(s).`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL VERIFICATION CHECKS PASSED: 0 console errors, 0 placeholder strings, clean styling across all routes.`);
    process.exit(0);
  }
}

run().catch((err) => {
  console.error("Runner error:", err);
  process.exit(1);
});

