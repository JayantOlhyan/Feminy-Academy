import { getStoredLid, getUtmParams } from "@/lib/lid";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    _feminyTrackingLoaded?: boolean;
  }
}

export function generateEventId(prefix = "evt"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function initAnalytics(): void {
  if (typeof window === "undefined" || window._feminyTrackingLoaded) return;

  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  let loaded = false;
  const loadTrackingScripts = () => {
    if (loaded) return;
    loaded = true;
    window._feminyTrackingLoaded = true;

    // Load Meta Pixel
    if (metaPixelId) {
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq?.("init", metaPixelId);
      window.fbq?.("track", "PageView");
      /* eslint-enable */
    }

    // Load GA4
    if (gaId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        (window as unknown as { dataLayer: unknown[] }).dataLayer?.push(arguments);
      };
      (window as unknown as { dataLayer: unknown[] }).dataLayer =
        (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }
  };

  // Trigger on first user interaction or after 3s idle
  const triggers = ["scroll", "click", "touchstart", "mousemove", "keydown"];
  const handleInteraction = () => {
    loadTrackingScripts();
    triggers.forEach((event) => window.removeEventListener(event, handleInteraction));
  };

  triggers.forEach((event) => window.addEventListener(event, handleInteraction, { once: true, passive: true }));
  setTimeout(loadTrackingScripts, 3000);
}

export function trackEvent(
  eventName:
    | "PageView"
    | "ViewContent"
    | "video_play"
    | "video_50"
    | "video_complete"
    | "cta_click"
    | "faq_open"
    | "Lead"
    | "Contact",
  params?: Record<string, unknown>,
  eventId?: string
): void {
  if (typeof window === "undefined") return;

  // Meta Pixel mapping
  if (window.fbq) {
    const options = eventId ? { eventID: eventId } : undefined;
    if (["PageView", "ViewContent", "Lead", "Contact"].includes(eventName)) {
      if (options) {
        window.fbq("track", eventName, params || {}, options);
      } else {
        window.fbq("track", eventName, params);
      }
    } else {
      if (options) {
        window.fbq("trackCustom", eventName, params || {}, options);
      } else {
        window.fbq("trackCustom", eventName, params);
      }
    }
  }

  // GA4 event
  if (window.gtag) {
    window.gtag("event", eventName, eventId ? { ...params, event_id: eventId } : params);
  }
}

export function sendCapiEvent(
  eventName: "Lead" | "Contact",
  eventId: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    const lid = getStoredLid();
    const utms = getUtmParams();
    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      custom_data: {
        ...params,
        lid,
        ...utms,
      },
    };
    fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore tracking failures
  }
}

export function trackWhatsAppClick(source: string): string {
  const eventId = generateEventId("wa");
  const lid = getStoredLid();
  const utms = getUtmParams();
  const page = typeof window !== "undefined" ? window.location.pathname : "/";

  trackEvent(
    "Contact",
    {
      channel: "whatsapp",
      source,
      lid,
      ...utms,
    },
    eventId
  );

  sendCapiEvent("Contact", eventId, {
    channel: "whatsapp",
    source,
    page,
  });

  if (typeof window !== "undefined") {
    const bodyStr = JSON.stringify({
      channel: "whatsapp",
      source,
      event_id: eventId,
      lid,
      ...utms,
      page,
    });

    try {
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([bodyStr], { type: "application/json" });
        const queued = navigator.sendBeacon("/api/lead", blob);
        if (queued) {
          return eventId;
        }
      }
    } catch {
      // fall back to keepalive fetch
    }

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyStr,
      keepalive: true,
    }).catch(() => {});
  }

  return eventId;
}
