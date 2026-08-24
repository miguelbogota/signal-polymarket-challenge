import { marketsService, type Market } from "@/services/markets";
import { logger } from "@/utils/logger";

type CachedRecommendation = { text: string; expiresAt: number };

/** Owns all AI recommendation concerns behind one stable, provider-agnostic service API. */
class AiService {
  /** Retains completed recommendations to avoid repeat model calls for identical data. */
  private readonly recommendationCache = new Map<
    string,
    CachedRecommendation
  >();
  /** Limits server-side recommendation reuse to ten minutes. */
  private readonly cacheTtlMs = 10 * 60 * 1000;
  /** Defines the provider-agnostic constraints for every generated recommendation. */
  private readonly recommendationInstructions =
    "You are Signal's cautious market research assistant. Use only the retrieved market context and do not claim external knowledge or certainty. Write no more than 55 words. State one key signal and uncertainty, then make a clear hypothetical decision in this exact format: {Explanation of what would you do and why} Decision: BET YES, BET NO or NO BET Amount: $0, $10, $25, or $50. Choose NO BET when the evidence is insufficient.";

  /** Streams a grounded AI recommendation while retaining its completed response for reuse. */
  async *streamRecommendation(market: Market): AsyncGenerator<string> {
    const cached = this.readCachedRecommendation(market);
    if (cached) {
      logger.info("recommendation.cache_hit", {
        tags: ["ai", "rag", "cache"],
        status: "available",
        marketId: market.id,
      });
      yield cached;
      return;
    }

    if (!process.env.OPENROUTER_API_KEY) {
      const fallback = this.fallbackRecommendation(market);
      logger.info("recommendation.fallback", {
        tags: ["ai", "fallback"],
        status: "unconfigured",
        provider: "openrouter",
        marketId: market.id,
      });
      yield fallback;
      return;
    }

    try {
      let recommendation = "";
      for await (const delta of this.streamFromOpenRouter({
        instructions: this.recommendationInstructions,
        context: `Retrieved market context:\n${this.retrieveMarketContext(market)}\n\nProvide an evidence-grounded market read.`,
      })) {
        recommendation += delta;
        yield delta;
      }
      if (!recommendation.trim())
        throw new Error("OpenRouter returned no recommendation text.");

      this.recommendationCache.set(this.cacheKey(market), {
        text: recommendation,
        expiresAt: Date.now() + this.cacheTtlMs,
      });
      logger.info("recommendation.generated", {
        tags: ["ai", "rag"],
        status: "available",
        provider: "openrouter",
        marketId: market.id,
      });
    } catch (error) {
      const fallback = this.fallbackRecommendation(market);
      logger.error("recommendation.failed", {
        tags: ["ai", "rag"],
        status: "fallback",
        provider: "openrouter",
        marketId: market.id,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      yield fallback;
    }
  }

  /** Collects streamed recommendation text for callers that require a full result. */
  async getRecommendation(market: Market): Promise<string> {
    let recommendation = "";
    for await (const delta of this.streamRecommendation(market))
      recommendation += delta;
    return recommendation;
  }

  /** Produces a transparent local recommendation when AI generation is unavailable. */
  private fallbackRecommendation(market: Market) {
    const yesPrice = marketsService.getYesPrice(market);
    const shouldBet = Math.abs(yesPrice - 50) >= 20;
    const decision = yesPrice >= 55 ? "BET YES" : "BET NO";
    const amount = shouldBet ? "$25" : "$0";
    return `${yesPrice}¢ implied probability with ${marketsService.getChange(market) > 0 ? "positive" : "limited"} one-day momentum. The key uncertainty is the resolution outcome. Decision: ${shouldBet ? decision : "NO BET"}. Simulated amount: ${amount}.`;
  }

  /** Serializes fetched market facts into the model's bounded RAG context. */
  private retrieveMarketContext(market: Market) {
    return JSON.stringify(
      {
        question: market.question,
        category: marketsService.getCategory(market),
        yesPriceCents: marketsService.getYesPrice(market),
        noPriceCents: 100 - marketsService.getYesPrice(market),
        volumeUsd: marketsService.getVolume(market),
        dailyChangePercent: marketsService.getChange(market),
        resolutionDate: marketsService.getEndDate(market),
        resolutionDetails: market.description,
      },
      null,
      2,
    );
  }

  /** Derives a cache key that changes with a market's important live signals. */
  private cacheKey(market: Market) {
    return [
      market.id,
      marketsService.getYesPrice(market),
      marketsService.getVolume(market),
      marketsService.getChange(market),
      marketsService.getEndDate(market),
    ].join(":");
  }

  /** Returns an unexpired cached recommendation for the current market snapshot. */
  private readCachedRecommendation(market: Market) {
    const cached = this.recommendationCache.get(this.cacheKey(market));
    return !cached || cached.expiresAt <= Date.now() ? null : cached.text;
  }

  /** Streams model text from OpenRouter and isolates provider-specific HTTP details. */
  private async *streamFromOpenRouter({
    instructions,
    context,
  }: {
    instructions: string;
    context: string;
  }): AsyncGenerator<string> {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
          "X-OpenRouter-Title": "Signal",
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL ?? "openai/gpt-5-mini",
          stream: true,
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: context },
          ],
        }),
      },
    );
    if (!response.ok || !response.body)
      throw new Error(
        `OpenRouter request failed with status ${response.status}.`,
      );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";
      for (const event of events) {
        const delta = this.parseOpenRouterDelta(event);
        if (delta) yield delta;
      }
      if (done) break;
    }
    if (buffer) {
      const delta = this.parseOpenRouterDelta(buffer);
      if (delta) yield delta;
    }
  }

  /** Parses one OpenRouter Server-Sent Event payload into an optional text delta. */
  private parseOpenRouterDelta(event: string) {
    const data = event
      .split("\n")
      .find((line) => line.startsWith("data:"))
      ?.replace(/^data:\s*/, "");
    if (!data || data === "[DONE]") return null;
    const payload = JSON.parse(data) as {
      choices?: Array<{ delta?: { content?: string } }>;
    };
    return payload.choices?.[0]?.delta?.content ?? null;
  }
}

/** Provides the shared AI service instance consumed by API routes and future callers. */
export const aiService = new AiService();
