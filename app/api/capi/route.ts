import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    return NextResponse.json(
      { message: "Meta Conversions API stub: META_CAPI_TOKEN not configured." },
      { status: 200 }
    );
  }

  try {
    const payload = await req.json();
    // Stub implementation ready for full backend activation
    return NextResponse.json({
      received: true,
      event: payload.event_name || "Unknown",
    });
  } catch {
    return NextResponse.json({ error: "Invalid CAPI request" }, { status: 400 });
  }
}
