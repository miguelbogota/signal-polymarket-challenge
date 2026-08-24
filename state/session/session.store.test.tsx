import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { SessionProvider, useSessionStore } from "./session.store";

describe("session store", () =>
  it("signs in with demo access", () => {
    const { result } = renderHook(
      () => ({ first: useSessionStore(), second: useSessionStore() }),
      { wrapper: SessionProvider },
    );
    act(() => {
      result.current.first.signIn("miguel@signal.demo", "signal2026");
    });
    expect(result.current.first.user?.username).toBe("miguel");
    expect(result.current.second.user?.username).toBe("miguel");
  }));
