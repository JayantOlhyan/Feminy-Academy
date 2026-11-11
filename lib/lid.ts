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
  try {
    const storedRaw = sessionStorage.getItem("feminy_utms");
    const stored: Record<string, string> = storedRaw ? JSON.parse(storedRaw) : {};
    const urlParams = new URLSearchParams(window.location.search);
    const current: Record<string, string> = {};
    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith("utm_") || key === "fbclid" || key === "gclid") {
        current[key] = value;
      }
    }
    if (Object.keys(current).length > 0) {
      const merged = { ...stored, ...current };
      sessionStorage.setItem("feminy_utms", JSON.stringify(merged));
      return merged;
    }
    return stored;
  } catch {
    return {};
  }
}

export function storeUrlAttribution(): { lid: string | null; isAdLanding: boolean } {
  if (typeof window === "undefined") return { lid: null, isAdLanding: false };
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const lid = urlParams.get("lid");
    if (lid) {
      localStorage.setItem("feminy_lid", lid);
    }

    const utmSource = urlParams.get("utm_source");
    const isAd = Boolean(lid || utmSource === "meta");
    if (isAd) {
      sessionStorage.setItem("feminy_ad_landing", "true");
    }

    const utms: Record<string, string> = {};
    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith("utm_") || key === "fbclid" || key === "gclid") {
        utms[key] = value;
      }
    }
    if (Object.keys(utms).length > 0) {
      sessionStorage.setItem("feminy_utms", JSON.stringify(utms));
    }

    return {
      lid: lid || localStorage.getItem("feminy_lid"),
      isAdLanding: isAd || sessionStorage.getItem("feminy_ad_landing") === "true",
    };
  } catch {
    return { lid: null, isAdLanding: false };
  }
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
