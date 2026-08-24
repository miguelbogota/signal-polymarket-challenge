import type { Market } from "@/services/markets";

/** Captures a placed simulated position together with its market snapshot. */
export type Position = {
  marketId: string;
  market: Market;
  amount: number;
  outcome: "YES" | "NO";
  placedAt: string;
};

/** Defines the portfolio data returned to API and UI consumers. */
export type PortfolioSnapshot = { balance: number; positions: Position[] };

/** Manages the in-memory balance and simulated market positions. */
class PortfolioService {
  /** Stores the simulated available balance. */
  private balance = 1250;
  /** Stores simulated positions for the active runtime. */
  private positions: Position[] = [];

  /** Returns an immutable snapshot of the available balance and placed markets. */
  get(): PortfolioSnapshot {
    return { balance: this.balance, positions: [...this.positions] };
  }

  /** Adds a simulated position and preserves the market details for the portfolio. */
  place(market: Market, amount: number, outcome: "YES" | "NO") {
    if (!Number.isFinite(amount) || amount <= 0 || amount > this.balance)
      throw new Error("Enter an amount within your available balance.");
    if (process.env.POLYMARKET_REAL_PLACEMENTS === "true")
      throw new Error(
        "Live placement requires a signed Polymarket integration.",
      );
    this.balance -= amount;
    this.positions.push({
      marketId: market.id,
      market: { ...market },
      amount,
      outcome,
      placedAt: new Date().toISOString(),
    });
    return this.get();
  }

  /** Resets the in-memory portfolio for test and demo-session initialization. */
  reset() {
    this.balance = 1250;
    this.positions = [];
  }
}

/** Provides the shared portfolio service instance for application consumers. */
export const portfolioService = new PortfolioService();
