import Link from "next/link";
import { marketsService, type Market } from "@/services/markets";
import type { Position } from "@/services/portfolio";
import * as styles from "./market-card.styles.css";

/** Summarizes a market with its probability, momentum, and detail link. */
export function MarketCard({
  market,
  position,
}: {
  market: Market;
  position?: Pick<Position, "amount" | "outcome">;
}) {
  return (
    <article className={styles.card}>
      <span className={styles.eyebrow}>
        {marketsService.getCategory(market)}
      </span>
      <h3 className={styles.question}>{market.question}</h3>
      <span className={styles.muted}>
        ${(marketsService.getVolume(market) / 1e6).toFixed(1)}m volume ·{" "}
        {marketsService.getChange(market) > 0 ? "+" : ""}
        {marketsService.getChange(market).toFixed(1)}% today
      </span>
      <div className={styles.footer}>
        <span className={styles.probability}>
          YES {marketsService.getYesPrice(market)}¢
        </span>
        {position ? (
          <span className={position.outcome === "YES" ? styles.yes : styles.no}>
            Your {position.outcome} · ${position.amount.toFixed(2)}
          </span>
        ) : (
          <Link className={styles.action} href={`/details/${market.id}`}>
            View
          </Link>
        )}
      </div>
      {position && (
        <Link className={styles.link} href={`/details/${market.id}`}>
          View market →
        </Link>
      )}
    </article>
  );
}
