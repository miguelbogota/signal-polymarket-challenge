import { NextRequest, NextResponse } from "next/server";
import { marketsService } from "@/services/markets";
import { aiService } from "@/services/ai";

/** Streams the AI-generated, evidence-grounded recommendation for one market. */
export async function GET(request: NextRequest) {
  const market = await marketsService.getMarket(
    request.nextUrl.searchParams.get("marketId") ?? "",
  );

  if (!market)
    return NextResponse.json({ error: "Market not found" }, { status: 404 });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const delta of aiService.streamRecommendation(market)) {
          controller.enqueue(encoder.encode(delta));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-AI-Disclaimer": "Not financial advice.",
    },
  });
}
