import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePortfolio } from "./use-portfolio.hook";

describe("usePortfolio", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("loads the portfolio", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ balance: 900, positions: [] }),
      }),
    );
    const { result } = renderHook(() => usePortfolio());
    await waitFor(() => expect(result.current.balance).toBe(900));
  });
});
