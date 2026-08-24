import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from ".";

describe("Button", () =>
  it("renders", () => {
    render(<Button>Go</Button>);
    expect(screen.getByText("Go")).toBeInTheDocument();
  }));
