import { describe, it, expect } from "vitest";
import { aiService } from "./ai.service";
import { mockedMarkets } from "@/services/markets/mocked-markets";

describe("AI recommendation", () =>
  it("uses the safe fallback when no API key is configured", async () =>
    expect(await aiService.getRecommendation(mockedMarkets[0])).toContain(
      "Decision: BET NO",
    )));
