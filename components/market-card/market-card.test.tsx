import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MarketCard } from ".";
import { mockedMarkets } from "@/services/markets/mocked-markets";

describe("MarketCard", () =>
  it("shows question", () => {
    render(
      <MarketCard market={{ ...mockedMarkets[0], question: "Question" }} />,
    );
    expect(screen.getByText("Question")).toBeInTheDocument();
  }));

describe("MarketCard placement", () =>
  it("shows the placed outcome", () => {
    render(
      <MarketCard
        market={{ ...mockedMarkets[0], question: "Question" }}
        position={{ outcome: "YES", amount: 25 }}
      />,
    );
    expect(screen.getByText("Your YES · $25.00")).toBeInTheDocument();
  }));
