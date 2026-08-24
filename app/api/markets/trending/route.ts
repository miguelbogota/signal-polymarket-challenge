import { NextResponse } from "next/server";
import { marketsService } from "@/services/markets";

/** Exposes the current high-momentum market collection. */
export async function GET() {
  return NextResponse.json(await marketsService.getTrendingMarkets());
}
