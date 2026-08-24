import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MarketGrid } from "./market-grid.component";
import { mockedMarkets } from "@/services/markets/mocked-markets";

vi.mock("@/hooks/use-portfolio", () => ({
  usePortfolio: () => ({
    balance: 100,
    positions: [
      {
        marketId: "market-1",
        amount: 15,
        outcome: "NO",
        placedAt: "2026-08-24T00:00:00.000Z",
        market: {},
      },
    ],
  }),
}));

describe("MarketGrid", () =>
  it("passes matching placement information to a market card", () => {
    render(
      <MarketGrid
        markets={[
          { ...mockedMarkets[0], id: "market-1", question: "Question" },
        ]}
      />,
    );
    expect(screen.getByText("Your NO · $15.00")).toBeInTheDocument();
  }));
