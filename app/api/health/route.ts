import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    mongo: Boolean(process.env.MONGODB_URI?.trim()),
    sheet: Boolean(process.env.SHEET_WEBHOOK_URL?.trim()),
    capi: Boolean(
      process.env.META_CAPI_TOKEN?.trim() && process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()
    ),
    pixel: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()),
  });
}
