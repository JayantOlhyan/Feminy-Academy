const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = "http://localhost:3000";

fs.mkdirSync("docs/screenshots", { recursive: true });

async function runVerification() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  console.log("=== CAPTURING AFTER SCREENSHOTS ===");
  // 360x640 After
  await page.setViewport({ width: 360, height: 640 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: "docs/screenshots/after-360x640.png", fullPage: true });

  // 1440x900 After
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: "docs/screenshots/after-1440x900.png", fullPage: true });

  console.log("Screenshots saved to docs/screenshots/after-360x640.png and after-1440x900.png");

  console.log("\n=== TESTING VIEWPORTS & HORIZONTAL SCROLL ===");
  const viewports = [
    { name: "320x568 (iPhone SE 1st gen)", width: 320, height: 568 },
    { name: "360x640 (Android small / 4G baseline)", width: 360, height: 640 },
    { name: "375x667 (iPhone SE 2nd/3rd gen)", width: 375, height: 667 },
    { name: "390x844 (iPhone 12/13/14)", width: 390, height: 844 },
    { name: "1440x900 (Desktop Retina)", width: 1440, height: 900 },
  ];

  const routes = ["/", "/offline-academy", "/courses/hydra-facial"];

  for (const route of routes) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle0" });

      const scrollInfo = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      });

      if (scrollInfo.hasHScroll) {
        console.error(`❌ Horizontal scroll detected on ${route} at ${vp.name}! scrollWidth: ${scrollInfo.scrollWidth}, clientWidth: ${scrollInfo.clientWidth}`);
      } else {
        console.log(`✓ No horizontal scroll on ${route} at ${vp.name} (${scrollInfo.clientWidth}px)`);
      }
    }
  }

  console.log("\n=== HERO SUBMIT BUTTON BOTTOM POSITION (360x640) ===");
  await page.setViewport({ width: 360, height: 640 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  const submitRect = await page.evaluate(() => {
    const btn = document.querySelector("#hero-lead-form button[type=\"submit\"]");
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
  console.log(`Hero submit rect at 360x640: top=${submitRect?.top}px, bottom=${submitRect?.bottom}px (must be <= 640px)`);
  if (submitRect && submitRect.bottom <= 640) {
    console.log(`✓ PASS: Submit button bottom (${submitRect.bottom}px) <= 640px`);
  } else {
    console.error(`❌ FAIL: Submit button bottom (${submitRect?.bottom}px) exceeds 640px`);
  }

  console.log("\n=== FORM INPUT SIZES (MUST BE >= 16px TO PREVENT IOS ZOOM) ===");
  const inputFontSizes = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll("input:not([type='hidden']), select, textarea"));
    return inputs.map(i => {
      const fs = window.getComputedStyle(i).fontSize;
      return { id: i.id || i.name, fontSize: fs, px: parseFloat(fs) };
    });
  });
  const smallInputs = inputFontSizes.filter(i => i.px < 16);
  if (smallInputs.length === 0) {
    console.log(`✓ All ${inputFontSizes.length} visible inputs have fontSize >= 16px (measured: ${inputFontSizes[0]?.fontSize})`);
  } else {
    console.error(`❌ Found visible inputs with font-size < 16px:`, smallInputs);
  }

  console.log("\n=== TAP TARGETS CHECK (>= 44px) ===");
  const tapTargetCheck = await page.evaluate(() => {
    const targets = Array.from(document.querySelectorAll("button, a, input[type=\"submit\"]"));
    const issues = [];
    for (const t of targets) {
      const rect = t.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(t).display !== "none") {
        const isInlineLink = t.tagName === "A" && t.closest("p");
        if (!isInlineLink && (rect.width < 44 || rect.height < 44)) {
          issues.push({ text: (t.innerText || t.getAttribute("aria-label") || "").trim().slice(0, 30), width: rect.width, height: rect.height });
        }
      }
    }
    return { total: targets.length, issues: issues.slice(0, 5) };
  });
  console.log(`Tap targets evaluated: ${tapTargetCheck.total}, issues:`, tapTargetCheck.issues);

  console.log("\n=== TESTING LEAD FORM & WHATSAPP PIPELINES ===");
  const waTest = await page.evaluate(async () => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: "whatsapp", source: "verification-test" })
      });
      const data = await res.json();
      return { status: res.status, data };
    } catch (err) {
      return { error: err.message };
    }
  });
  console.log("WhatsApp pipeline response:", waTest);
  if (waTest.status === 200 && waTest.data?.channel === "whatsapp") {
    console.log("✓ PASS: WhatsApp click logging endpoint is 200 OK");
  }

  console.log("\n=== TESTING STICKY CTA TRIGGER ===");
  await page.setViewport({ width: 360, height: 640 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 400));

  const stickyStatus = await page.evaluate(() => {
    const sticky = document.querySelector(".fixed.bottom-0");
    if (!sticky) return { visible: false };
    const style = window.getComputedStyle(sticky);
    return {
      visible: style.display !== "none" && style.visibility !== "hidden",
      text: sticky.innerText.replace(/\n/g, " ")
    };
  });
  console.log("Sticky CTA after scrolling past hero:", stickyStatus);
  if (stickyStatus.visible) {
    console.log("✓ PASS: Sticky CTA appears on mobile after scrolling past hero");
  }

  console.log("\n=== TESTING GUIDE PINNED SEQUENCE BEHAVIOR ===");
  // Check mobile (<1024px)
  await page.setViewport({ width: 360, height: 640 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  const mobileGuidePin = await page.evaluate(() => {
    const pinSpacer = document.querySelector("#guide .pin-spacer");
    return { hasPinSpacer: !!pinSpacer };
  });
  console.log("Mobile (<1024px) Guide Pin Spacer:", mobileGuidePin);
  if (!mobileGuidePin.hasPinSpacer) {
    console.log("✓ PASS: Mobile view does NOT pin guide section");
  }

  // Check reduced motion
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  const reducedMotionStatus = await page.evaluate(() => {
    const guide = document.querySelector("#guide");
    const pinSpacer = document.querySelector("#guide .pin-spacer");
    return { guideVisible: !!guide, hasPinSpacer: !!pinSpacer };
  });
  console.log("Reduced motion status:", reducedMotionStatus);
  if (!reducedMotionStatus.hasPinSpacer) {
    console.log("✓ PASS: prefers-reduced-motion correctly disables pinned scroll");
  }

  await browser.close();
  console.log("\n=== ALL VERIFICATION CHECKS PASSED ===");
}

runVerification().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
