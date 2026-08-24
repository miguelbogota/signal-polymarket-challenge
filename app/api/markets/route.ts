import { NextRequest, NextResponse } from "next/server";
import { marketsService } from "@/services/markets";

/** Exposes filtered market discovery data through the public application API. */
export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;

  return NextResponse.json(
    await marketsService.getMarkets({
      search: p.get("search") ?? undefined,
      sort: p.get("sort") ?? undefined,
      limit: p.get("limit") ?? undefined,
    }),
  );
}
