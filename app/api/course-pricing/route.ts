import { getOfferPricing } from "@/lib/offer-pricing";

export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json(getOfferPricing(Date.now()), { headers: { "Cache-Control": "no-store, max-age=0" } });
}
