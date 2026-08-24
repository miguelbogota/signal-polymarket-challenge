import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AiRecommendation } from "./ai-recommendation.component";

describe("AiRecommendation", () => {
  it("identifies the recommendation as AI", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    render(<AiRecommendation marketId="market-1" />);
    expect(screen.getByText("AI recommendation")).toBeInTheDocument();
  });
});
