import { MarketGrid } from "@/components/market-grid";
import { marketsService } from "@/services/markets";
import * as styles from "./page.styles.css";

/** Displays the markets with the strongest recent movement. */
export default async function Trending() {
  const markets = await marketsService.getTrendingMarkets();

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Momentum scanner</span>
          <h1 className={styles.pageHeaderTitle}>Hot markets.</h1>
          <p className={styles.lead}>
            The stories with the strongest current market movement.
          </p>
        </div>
      </header>
      <MarketGrid markets={markets} />
    </>
  );
}
