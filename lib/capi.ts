import crypto from "crypto";

export const META_GRAPH_API_VERSION = "v22.0";

export interface CapiEventInput {
  event_name: "Lead" | "Contact" | "PageView" | "ViewContent";
  event_id?: string | null;
  event_time?: number;
  event_source_url?: string | null;
  client_ip_address?: string | null;
  client_user_agent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  phone?: string | null;
  name?: string | null;
  custom_data?: Record<string, unknown>;
}

export interface CapiPayload {
  data: Array<{
    event_name: string;
    event_time: number;
    event_id?: string;
    action_source: "website";
    event_source_url?: string;
    user_data: {
      client_ip_address?: string;
      client_user_agent?: string;
      fbp?: string;
      fbc?: string;
      ph?: string[];
      fn?: string[];
    };
    custom_data?: Record<string, unknown>;
  }>;
  test_event_code?: string;
}

export function sha256Hex(value: string): string {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

export function normalizeIndianPhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return `91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91") && /^91[6-9]\d{9}$/.test(digits)) {
    return digits;
  }
  return null;
}

export function normalizeFirstName(name: string): string | null {
  const first = name.trim().toLowerCase().split(/\s+/)[0];
  return first ? first : null;
}

export function buildCapiPayload(
  input: CapiEventInput,
  testEventCode?: string | null
): CapiPayload {
  const userData: CapiPayload["data"][0]["user_data"] = {};

  if (input.client_ip_address && input.client_ip_address !== "unknown-ip") {
    userData.client_ip_address = input.client_ip_address;
  }
  if (input.client_user_agent && input.client_user_agent !== "unknown") {
    userData.client_user_agent = input.client_user_agent;
  }
  if (input.fbp) {
    userData.fbp = input.fbp;
  }
  if (input.fbc) {
    userData.fbc = input.fbc;
  }

  if (input.phone) {
    const normalizedPhone = normalizeIndianPhone(input.phone);
    if (normalizedPhone) {
      userData.ph = [sha256Hex(normalizedPhone)];
    }
  }

  if (input.name) {
    const normalizedFn = normalizeFirstName(input.name);
    if (normalizedFn) {
      userData.fn = [sha256Hex(normalizedFn)];
    }
  }

  const eventObj: CapiPayload["data"][0] = {
    event_name: input.event_name,
    event_time: input.event_time ?? Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };

  if (input.event_id) {
    eventObj.event_id = input.event_id;
  }
  if (input.event_source_url) {
    eventObj.event_source_url = input.event_source_url;
  }
  if (input.custom_data && Object.keys(input.custom_data).length > 0) {
    eventObj.custom_data = input.custom_data;
  }

  const payload: CapiPayload = {
    data: [eventObj],
  };

  const trimmedTestCode = testEventCode?.trim();
  if (trimmedTestCode) {
    payload.test_event_code = trimmedTestCode;
  }

  return payload;
}

let missingConfigLogged = false;

export async function dispatchMetaCapiEvent(
  input: CapiEventInput
): Promise<{ sent: boolean; skipped?: boolean; status?: number }> {
  const token = process.env.META_CAPI_TOKEN?.trim();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const testEventCode = process.env.META_TEST_EVENT_CODE?.trim();

  if (!token || !pixelId) {
    if (!missingConfigLogged) {
      missingConfigLogged = true;
      console.info(
        "[CAPI] Skipping Meta CAPI dispatch: META_CAPI_TOKEN or NEXT_PUBLIC_META_PIXEL_ID not configured."
      );
    }
    return { sent: false, skipped: true };
  }

  const payload = buildCapiPayload(input, testEventCode);
  const endpoint = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${encodeURIComponent(
    pixelId
  )}/events?access_token=${encodeURIComponent(token)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return { sent: res.ok, status: res.status };
  } catch (err) {
    console.warn("[CAPI] Meta CAPI request failed or timed out:", err);
    return { sent: false };
  } finally {
    clearTimeout(timer);
  }
}
