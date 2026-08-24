import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlaceMarketPanel } from "./place-market-panel.component";
import { mockedMarkets } from "@/services/markets/mocked-markets";
import { SessionProvider } from "@/state/session";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("PlaceMarketPanel", () =>
  it("renders a simulated placement action", () => {
    render(
      <SessionProvider>
        <PlaceMarketPanel
          market={{ ...mockedMarkets[0], id: "m1", question: "A market" }}
        />
      </SessionProvider>,
    );
    expect(screen.getByText("Place simulated position")).toBeInTheDocument();
  }));
