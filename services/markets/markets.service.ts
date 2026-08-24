import { mockedMarkets } from "./mocked-markets";
import { logger } from "@/utils/logger";

/** Represents the raw Gamma API market record used by the live and mocked feeds. */
export type Market = (typeof mockedMarkets)[number];

/** Owns retrieval and display-value extraction for Gamma API market records. */
class MarketsService {
  /** Converts an API number-like value into a safe finite number. */
  private toFiniteNumber(value: unknown, fallbackValue = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallbackValue;
  }

  /** Parses a serialized Gamma API array without throwing for malformed payloads. */
  private parseSerializedArray(value: unknown) {
    if (!Array.isArray(value) && typeof value !== "string") return [];
    try {
      const parsed = Array.isArray(value) ? value : JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /** Returns the current YES price from the raw Gamma outcome-price field. */
  getYesPrice(market: Market) {
    const rawPrice = this.parseSerializedArray(market.outcomePrices)[0];
    const price = this.toFiniteNumber(rawPrice, 0.5);
    const cents = price <= 1 ? price * 100 : price;
    return Math.round(Math.max(0, Math.min(100, cents)));
  }

  /** Returns the usable USD volume supplied by the Gamma market record. */
  getVolume(market: Market) {
    return this.toFiniteNumber(market.volumeNum ?? market.volume);
  }

  /** Returns the latest one-day price movement as a display percentage. */
  getChange(market: Market) {
    return this.toFiniteNumber(market.oneDayPriceChange) * 100;
  }

  /** Returns the best available category label from the raw market record. */
  getCategory(market: Market) {
    return market.events?.[0]?.title ?? "Prediction market";
  }

  /** Returns the compact resolution date supplied by the Gamma API. */
  getEndDate(market: Market) {
    return market.endDateIso ?? market.endDate;
  }

  /** Retrieves, filters, and orders Gamma API-shaped markets with mock fallback data. */
  async getMarkets(
    query: { search?: string; limit?: string; sort?: string } = {},
  ): Promise<Market[]> {
    let markets = [...mockedMarkets] as Market[];
    if (process.env.POLYMARKET_API_ENABLED !== "false") {
      try {
        const response = await fetch(
          "https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50",
          { next: { revalidate: 60 } },
        );
        if (response.ok) {
          const remote = (await response.json()) as Market[];
          if (remote.length) markets = remote;
        }
      } catch {
        logger.info("markets.fallback", {
          reason: "remote_unavailable",
          tags: ["markets", "fallback"],
          status: "available",
        });
      }
    }
    const search = query.search?.toLowerCase();
    if (search) {
      markets = markets.filter(
        (market) =>
          market.question.toLowerCase().includes(search) ||
          this.getCategory(market).toLowerCase().includes(search),
      );
    }
    if (query.sort === "volume")
      markets.sort(
        (first, second) => this.getVolume(second) - this.getVolume(first),
      );
    return markets.slice(0, Math.min(Number(query.limit) || 50, 50));
  }

  /** Finds a market by identifier from the live feed or mocked collection. */
  async getMarket(id: string) {
    return (
      (await this.getMarkets()).find((market) => market.id === id) ??
      mockedMarkets.find((market) => market.id === id) ??
      null
    );
  }

  /** Returns the markets with the greatest one-day price movement. */
  async getTrendingMarkets() {
    return (await this.getMarkets({ sort: "volume", limit: "50" }))
      .sort((first, second) => this.getChange(second) - this.getChange(first))
      .slice(0, 6);
  }
}

/** Provides the shared market service instance for application consumers. */
export const marketsService = new MarketsService();
