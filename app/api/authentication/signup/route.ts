import { NextResponse } from "next/server";

/** Rejects registration because this prototype is limited to demo access. */
export async function POST() {
  return NextResponse.json(
    { error: "Sign-up is disabled for this private demo." },
    { status: 403 },
  );
}
