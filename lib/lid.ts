export function getStoredLid(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLid = urlParams.get("lid");
    if (urlLid) {
      localStorage.setItem("feminy_lid", urlLid);
      return urlLid;
    }
    return localStorage.getItem("feminy_lid");
  } catch {
    return null;
  }
}

export function setStoredLid(lid: string): void {
  if (typeof window === "undefined" || !lid) return;
  try {
    localStorage.setItem("feminy_lid", lid);
  } catch {
    // ignore
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const current: Record<string, string> = {};
  try {
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (k.startsWith("utm_") || k === "fbclid" || k === "gclid") current[k] = v;
    });
  } catch {}

  let stored: Record<string, string> = {};
  try {
    const raw = sessionStorage.getItem("feminy_utms") || localStorage.getItem("feminy_utms");
    if (raw) stored = JSON.parse(raw);
  } catch {}

  if (Object.keys(current).length > 0) {
    const merged = { ...stored, ...current };
    try {
      sessionStorage.setItem("feminy_utms", JSON.stringify(merged));
    } catch {}
    return merged;
  }
  return stored;
}

export function storeUrlAttribution(): { lid: string | null; isAdLanding: boolean } {
  if (typeof window === "undefined") return { lid: null, isAdLanding: false };
  const params = new URLSearchParams(window.location.search);
  const urlLid = params.get("lid");
  const isAdFromUrl = Boolean(urlLid || params.get("utm_source") === "meta");
  const utms = getUtmParams();

  let storedLid: string | null = null;
  let storedAd = false;
  try {
    if (urlLid) localStorage.setItem("feminy_lid", urlLid);
    if (isAdFromUrl) sessionStorage.setItem("feminy_ad_landing", "true");
    if (Object.keys(utms).length > 0) sessionStorage.setItem("feminy_utms", JSON.stringify(utms));
    storedLid = localStorage.getItem("feminy_lid");
    storedAd = sessionStorage.getItem("feminy_ad_landing") === "true";
  } catch {}

  return {
    lid: urlLid || storedLid,
    isAdLanding: isAdFromUrl || storedAd,
  };
}

export function isAdLandingSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("lid") || urlParams.get("utm_source") === "meta") {
      return true;
    }
    return sessionStorage.getItem("feminy_ad_landing") === "true";
  } catch {
    return false;
  }
}
