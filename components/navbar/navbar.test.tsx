import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from ".";
import { SessionProvider } from "@/state/session";

describe("Navbar", () =>
  it("shows branding", () => {
    render(
      <SessionProvider>
        <Navbar />
      </SessionProvider>,
    );
    expect(screen.getByText("sig")).toBeInTheDocument();
  }));
