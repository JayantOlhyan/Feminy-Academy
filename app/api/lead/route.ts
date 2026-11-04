import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getMongoClient } from "@/lib/mongodb";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Kripya apna poora naam likhein"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Kripya 10-digit ka valid mobile number dalein"),
  city: z.string().trim().min(2, "Kripya apna shehar batayein"),
  interest: z.enum(["Makeup", "Hair", "Skin", "Sab kuch"]),
  preferredDate: z.string().optional().nullable(),
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

// Simple in-memory rate limiter: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
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

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Kripya thodi der baad koshish karein ya WhatsApp karein." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check: bot triggered
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message || "Invalid details";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const leadData = {
      ...parsed.data,
      ip,
      userAgent: req.headers.get("user-agent") || "unknown",
      createdAt: new Date(),
    };

    // 1. Insert into MongoDB if available
    try {
      const mongo = await getMongoClient();
      if (mongo) {
        const db = mongo.db();
        await db.collection("leads").insertOne(leadData);
      } else {
        console.warn("MongoDB connection unavailable; lead logged to server output", leadData.phone);
      }
    } catch (dbErr) {
      console.error("Failed to store lead in MongoDB:", dbErr);
    }

    // 2. Forward to Google Sheet Webhook if configured
    const sheetWebhook = process.env.SHEET_WEBHOOK_URL;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        });
      } catch (sheetErr) {
        console.error("Failed to forward lead to Sheet Webhook:", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
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
