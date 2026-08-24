import { beforeEach, describe, it, expect } from "vitest";
import { portfolioService } from "./portfolio.service";
import { mockedMarkets } from "@/services/markets/mocked-markets";

/** Supplies a stable market fixture for simulated portfolio tests. */
const m = { ...mockedMarkets[0], id: "x", question: "x" };

describe("portfolio", () => {
  beforeEach(() => portfolioService.reset());
  
  it("deducts a simulated position", () => {
    const snapshot = portfolioService.place(m, 20, "YES");
    expect(snapshot.balance).toBe(1230);
    expect(snapshot.positions[0]).toMatchObject({
      marketId: "x",
      amount: 20,
      outcome: "YES",
      market: { question: "x" },
    });
  });
});
