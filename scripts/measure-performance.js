const puppeteer = require("puppeteer-core");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function measureMobilePerformance() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // Emulate Mobile Moto G4 / Pixel 5 (360x640)
  await page.setViewport({ width: 360, height: 640, isMobile: true, hasTouch: true });

  const client = await page.target().createCDPSession();
  await client.send("Network.enable");
  await client.send("Performance.enable");

  // Slow 4G Network emulation: 500ms latency, 1.6 Mbps down, 750 Kbps up
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150, // simulated mobile RTT
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });

  // 4x CPU Slowdown
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  const loadedFonts = [];
  client.on("Network.responseReceived", (event) => {
    const url = event.response.url;
    if (url.includes(".woff2") || url.includes(".woff") || url.includes("/fonts/")) {
      loadedFonts.push({ url, status: event.response.status });
    }
  });

  console.log("Navigating to http://localhost:3000 under mobile emulation...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Measure Web Vitals via PerformanceObserver
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lcp = 0;
      let cls = 0;

      const poLCP = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) lcp = lastEntry.startTime;
      });
      try {
        poLCP.observe({ type: "largest-contentful-paint", buffered: true });
      } catch (e) {}

      const poCLS = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      });
      try {
        poCLS.observe({ type: "layout-shift", buffered: true });
      } catch (e) {}

      setTimeout(() => {
        const navEntries = performance.getEntriesByType("navigation");
        const nav = navEntries[0] ? navEntries[0].toJSON() : {};
        resolve({
          lcp,
          cls,
          domContentLoaded: nav.domContentLoadedEventEnd,
          loadEventEnd: nav.loadEventEnd
        });
      }, 1500);
    });
  });

  console.log("=== MOBILE PERFORMANCE METRICS ===");
  console.log(`LCP (Largest Contentful Paint): ${(metrics.lcp / 1000).toFixed(2)}s (target: < 2.5s)`);
  console.log(`CLS (Cumulative Layout Shift): ${metrics.cls.toFixed(4)} (target: < 0.05)`);
  console.log(`DOM Content Loaded: ${(metrics.domContentLoaded / 1000).toFixed(2)}s`);
  console.log(`Page Load Complete: ${(metrics.loadEventEnd / 1000).toFixed(2)}s`);
  console.log(`\nFont files fetched: ${loadedFonts.length}`);
  loadedFonts.forEach(f => console.log(" - Font:", f.url));

  await browser.close();
}

measureMobilePerformance().catch(err => {
  console.error("Performance measurement error:", err);
  process.exit(1);
});
