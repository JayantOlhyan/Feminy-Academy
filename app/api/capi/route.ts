import { NextRequest, NextResponse } from "next/server";
import { dispatchMetaCapiEvent } from "@/lib/capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventName = body.event_name || "Contact";
    const eventId = body.event_id || null;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const fbp = req.cookies.get("_fbp")?.value || body.fbp || null;
    const fbc = req.cookies.get("_fbc")?.value || body.fbc || null;

    const result = await dispatchMetaCapiEvent({
      event_name: eventName,
      event_id: eventId,
      event_time: typeof body.event_time === "number" ? body.event_time : Math.floor(Date.now() / 1000),
      event_source_url: body.event_source_url || req.headers.get("referer") || null,
      client_ip_address: ip,
      client_user_agent: userAgent,
      fbp,
      fbc,
      custom_data: body.custom_data,
    });

    return NextResponse.json(
      {
        received: true,
        sent: result.sent,
        skipped: Boolean(result.skipped),
        event: eventName,
        event_id: eventId,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid CAPI request" }, { status: 400 });
  }
}
