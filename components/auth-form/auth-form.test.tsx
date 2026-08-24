import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthForm } from "./auth-form.component";
import { SessionProvider } from "@/state/session";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("AuthForm", () =>
  it("shows the demo sign-in fields", () => {
    render(
      <SessionProvider>
        <AuthForm />
      </SessionProvider>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Sign in to Signal")).toBeInTheDocument();
  }));
