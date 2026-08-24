import { describe, it, expect, vi } from "vitest";
import { logger } from "./logger";

describe("logger", () =>
  it("emits structured tagged events", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    logger.info("market.view", {
      id: "m1",
      tags: ["market", "discovery"],
      status: "available",
    });
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('"tags":["market","discovery"]'),
    );
    spy.mockRestore();
  }));
