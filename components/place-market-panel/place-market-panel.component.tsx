"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { marketsService, type Market } from "@/services/markets";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/button";
import { ghost } from "@/components/button/button.styles.css";
import * as styles from "./place-market-panel.styles.css";

/** Lets an authenticated user place a simulated position on a market. */
export function PlaceMarketPanel({ market }: { market: Market }) {
  const { user } = useSession();
  const router = useRouter();
  const [outcome, setOutcome] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState("25");
  const [message, setMessage] = useState("");

  async function place() {
    if (!user) return router.push("/authentication");

    const res = await fetch("/api/portfolio/place", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        marketId: market.id,
        amount: Number(amount),
        outcome,
      }),
    });

    const data = await res.json();
    setMessage(
      res.ok ? `Position simulated. New balance: $${data.balance}` : data.error,
    );
  }

  return (
    <aside className={styles.panel}>
      <span className={styles.eyebrow}>Practice placement</span>
      <h2 className={styles.title}>Take a position</h2>
      <div className={styles.outcomes}>
        <Button
          className={outcome === "YES" ? "" : ghost}
          onClick={() => setOutcome("YES")}
        >
          Yes {marketsService.getYesPrice(market)}¢
        </Button>
        <Button
          className={outcome === "NO" ? "" : ghost}
          onClick={() => setOutcome("NO")}
        >
          No {100 - marketsService.getYesPrice(market)}¢
        </Button>
      </div>
      <label className={styles.field}>
        Amount (USD)
        <input
          className={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="1"
        />
      </label>
      <Button onClick={place}>Place simulated position</Button>
      {message && <p className={styles.feedback}>{message}</p>}
      <p className={styles.muted}>
        No real order is sent. This demo keeps a temporary in-memory portfolio.
      </p>
    </aside>
  );
}
