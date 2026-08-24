import { NextResponse } from "next/server";

/** Validates the private demo credentials and returns the permitted user. */
export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === "miguel@signal.demo" && password === "signal2026")
    return NextResponse.json({ username: "miguel", email });

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
