"use client";

import type { Market } from "@/services/markets";
import { usePortfolio } from "@/hooks/use-portfolio";
import { MarketCard } from "@/components/market-card";
import { grid } from "./market-grid.styles.css";

/** Renders market cards with any matching in-memory placement shown on the card. */
export function MarketGrid({ markets }: { markets: Market[] }) {
  const portfolio = usePortfolio();

  return (
    <div className={grid}>
      {markets.map((market) => {
        const position = portfolio.positions.find(
          (candidate) => candidate.marketId === market.id,
        );
        return (
          <MarketCard key={market.id} market={market} position={position} />
        );
      })}
    </div>
  );
}
