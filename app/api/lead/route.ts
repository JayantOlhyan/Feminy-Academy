import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getMongoClient } from "@/lib/mongodb";
import { dispatchMetaCapiEvent } from "@/lib/capi";

const formLeadSchema = z.object({
  channel: z.literal("form").optional().default("form"),
  name: z.string().trim().min(2, "Kripya apna poora naam likhein"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Kripya 10-digit ka valid mobile number dalein"),
  city: z.string().trim().optional().nullable(),
  interest: z.enum(["Makeup", "Hair", "Skin", "Sab kuch"]).optional().default("Sab kuch"),
  preferredDate: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  event_id: z.string().optional().nullable(),
  lid: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  page: z.string().optional().nullable(),
  // Honeypot field
  website: z.string().optional().nullable(),
});

const whatsappLeadSchema = z.object({
  channel: z.literal("whatsapp"),
  source: z.string().optional().nullable(),
  event_id: z.string().optional().nullable(),
  lid: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  page: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
});

// Note: This in-memory rate limiter is per-serverless-instance on Netlify and is best-effort only.
// Keyed by `${ip}:${phone}` (max 5 requests per 10 minutes) so Indian mobile carrier CGNAT IPs
// sharing an IP across different users do not block each other, and WhatsApp clicks do not consume form quota.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= 5) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    const body = await req.json();

    // Honeypot check: bot triggered
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // Separate channel: WhatsApp clicks go to `whatsapp_clicks` (never `leads` and never Sheet),
    // and skip the form rate limiter.
    if (body?.channel === "whatsapp") {
      const parsedWa = whatsappLeadSchema.safeParse(body);
      if (!parsedWa.success) {
        return NextResponse.json({ error: "Invalid WhatsApp click payload" }, { status: 400 });
      }

      const clickDoc = {
        ...parsedWa.data,
        ip,
        userAgent: req.headers.get("user-agent") || "unknown",
        createdAt: new Date(),
      };

      try {
        const mongo = await getMongoClient();
        if (mongo) {
          await mongo.db().collection("whatsapp_clicks").insertOne(clickDoc);
        }
      } catch (err) {
        console.warn("Failed to log WhatsApp click in MongoDB:", err);
      }

      return NextResponse.json({ success: true, channel: "whatsapp" });
    }

    // Form lead validation
    const parsed = formLeadSchema.safeParse(body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message || "Invalid details";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const rateLimitKey = `${ip}:${parsed.data.phone}`;
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Kripya thodi der baad koshish karein ya WhatsApp karein." },
        { status: 429 }
      );
    }

    const userAgent = req.headers.get("user-agent") || "unknown";
    const leadData = {
      ...parsed.data,
      ip,
      userAgent,
      createdAt: new Date(),
    };

    // Write to MongoDB (`leads` collection) and Google Sheet Webhook in parallel.
    // A form lead counts as saved ONLY if at least one durable store succeeds.
    const mongoPromise = (async (): Promise<boolean> => {
      const mongo = await getMongoClient();
      if (!mongo) return false;
      const result = await mongo.db().collection("leads").insertOne(leadData);
      return Boolean(result.acknowledged);
    })();

    const sheetPromise = (async (): Promise<boolean> => {
      const sheetWebhook = process.env.SHEET_WEBHOOK_URL?.trim();
      if (!sheetWebhook) return false;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      try {
        const res = await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
          signal: controller.signal,
        });
        return res.ok;
      } finally {
        clearTimeout(timer);
      }
    })();

    const [mongoResult, sheetResult] = await Promise.allSettled([mongoPromise, sheetPromise]);

    const mongoSaved = mongoResult.status === "fulfilled" && mongoResult.value === true;
    const sheetSaved = sheetResult.status === "fulfilled" && sheetResult.value === true;

    if (mongoResult.status === "rejected") {
      console.error("Failed to store lead in MongoDB:", mongoResult.reason);
    }
    if (sheetResult.status === "rejected") {
      console.error("Failed to forward lead to Sheet Webhook:", sheetResult.reason);
    }

    if (!mongoSaved && !sheetSaved) {
      console.error("Lead durability failure: neither MongoDB nor Sheet webhook saved the lead.");
      return NextResponse.json(
        { error: "Kuch gadbad ho gayi. Kripya WhatsApp pe message kijiye." },
        { status: 500 }
      );
    }

    // Fire server-side Meta CAPI Lead event after a successful durable save (non-blocking, 3s timeout inside helper)
    const fbp = req.cookies.get("_fbp")?.value || null;
    const fbc = req.cookies.get("_fbc")?.value || null;
    const origin = req.headers.get("origin") || "https://feminy-academy.netlify.app";
    const sourceUrl =
      req.headers.get("referer") ||
      (parsed.data.page ? `${origin}${parsed.data.page}` : origin);

    void dispatchMetaCapiEvent({
      event_name: "Lead",
      event_id: parsed.data.event_id,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: sourceUrl,
      client_ip_address: ip,
      client_user_agent: userAgent,
      fbp,
      fbc,
      phone: parsed.data.phone,
      name: parsed.data.name,
      custom_data: {
        channel: "form",
        source: parsed.data.source,
        interest: parsed.data.interest,
        city: parsed.data.city || undefined,
        lid: parsed.data.lid || undefined,
        utm_source: parsed.data.utm_source || undefined,
        utm_medium: parsed.data.utm_medium || undefined,
        utm_campaign: parsed.data.utm_campaign || undefined,
      },
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      saved: { mongo: mongoSaved, sheet: sheetSaved },
      redirect: "/thank-you?type=offline",
    });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Kuch gadbad ho gayi. Kripya WhatsApp pe message kijiye." },
      { status: 500 }
    );
  }
}
