import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const token = process.env.META_CAPI_TOKEN;
    if (!token) {
      return NextResponse.json(
        {
          received: true,
          stub: true,
          event: payload.event_name || "Unknown",
          event_id: payload.event_id || null,
          message: "Meta Conversions API stub: META_CAPI_TOKEN not configured.",
        },
        { status: 200 }
      );
    }

    // Stub implementation ready for full backend activation
    return NextResponse.json({
      received: true,
      event: payload.event_name || "Unknown",
      event_id: payload.event_id || null,
    });
  } catch {
    return NextResponse.json({ error: "Invalid CAPI request" }, { status: 400 });
  }
}
