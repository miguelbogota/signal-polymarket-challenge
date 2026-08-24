import { NextResponse } from "next/server";
import { portfolioService } from "@/services/portfolio";
import { marketsService } from "@/services/markets";

/** Exposes the current in-memory simulated portfolio. */
export async function GET() {
  return NextResponse.json(portfolioService.get());
}

/** Creates a validated simulated market position against available balance. */
export async function POST(request: Request) {
  try {
    const { marketId, amount, outcome } = await request.json();
    const market = await marketsService.getMarket(marketId);

    if (!market)
      return NextResponse.json({ error: "Market not found" }, { status: 404 });

    return NextResponse.json(
      portfolioService.place(market, Number(amount), outcome),
    );
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
