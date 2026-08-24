import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSession } from ".";
import { SessionProvider } from "@/state/session";

describe("useSession", () =>
  it("exposes session state", () =>
    expect(
      renderHook(() => useSession(), { wrapper: SessionProvider }).result
        .current,
    ).toHaveProperty("signIn")));
