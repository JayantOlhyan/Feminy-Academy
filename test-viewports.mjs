import puppeteer from "puppeteer-core";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = "http://localhost:3000";

const viewports = [
  { name: "Mobile Small (360x800)", width: 360, height: 800 },
  { name: "Mobile iPhone (390x844)", width: 390, height: 844 },
  { name: "Tablet (768x1024)", width: 768, height: 1024 },
  { name: "Desktop (1440x900)", width: 1440, height: 900 },
];

const paths = [
  "/",
  "/courses/hydra-facial",
  "/courses/one-day",
  "/offline-academy",
  "/thank-you",
  "/about",
  "/contact",
  "/pricing",
  "/terms",
  "/privacy",
  "/refund-policy",
];

async function runTests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  let anyFailed = false;

  console.log("=== 1. TESTING VIEWPORT RESPONSIVENESS (NO HORIZONTAL SCROLL) ===");
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const path of paths) {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle0" });
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          docWidth,
          winWidth,
          hasHorizontalScroll: docWidth > winWidth,
        };
      });

      if (overflow.hasHorizontalScroll) {
        console.error(`❌ FAIL: ${vp.name} on ${path}: docWidth=${overflow.docWidth} > winWidth=${overflow.winWidth}`);
        anyFailed = true;
      } else {
        console.log(`✓ PASS: ${vp.name} on ${path} (scrollWidth: ${overflow.docWidth}px, no overflow)`);
      }
    }
  }

  console.log("\n=== 2. TESTING AD LANDING MODE (NAV HIDDEN ON ?lid=) ===");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/?lid=test_ad_lead_123`, { waitUntil: "networkidle0" });
  const adNavHidden = await page.evaluate(() => {
    const nav = document.querySelector("nav[aria-label='Main Navigation']");
    return !nav || nav.offsetParent === null;
  });
  console.log(`Ad Landing Mode (?lid=): Nav hidden = ${adNavHidden ? "PASS (✓)" : "FAIL (❌)"}`);
  if (!adNavHidden) anyFailed = true;

  console.log("\n=== 3. TESTING STICKY CTA ON COURSE PAGE (390x844) ===");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/courses/hydra-facial`, { waitUntil: "networkidle0" });

  // Scroll 1200px past hero
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise((r) => setTimeout(r, 400));
  const stickyVisibleMid = await page.evaluate(() => {
    const sticky = document.querySelector(".fixed.bottom-0");
    return !!sticky && window.getComputedStyle(sticky).display !== "none";
  });
  console.log(`Sticky CTA visible after scrolling past hero: ${stickyVisibleMid ? "PASS (✓)" : "FAIL (❌)"}`);

  await browser.close();

  if (anyFailed) {
    console.error("\nSome viewport checks failed.");
    process.exit(1);
  } else {
    console.log("\nAll viewport and responsive checks PASSED!");
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
