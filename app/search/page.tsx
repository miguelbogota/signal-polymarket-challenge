import { MarketGrid } from "@/components/market-grid";
import { marketsService } from "@/services/markets";
import Link from "next/link";
import * as styles from "./page.styles.css";

/** Displays URL-filtered market discovery results. */
export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const markets = await marketsService.getMarkets(params);

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Discovery desk</span>
          <h1 className={styles.pageHeaderTitle}>Find your next signal.</h1>
        </div>
        <Link href="/search?sort=volume" className={styles.ghost}>
          Trending now
        </Link>
      </header>
      <form className={styles.searchRow}>
        <input
          name="search"
          defaultValue={params.search}
          className={styles.textInput}
          placeholder="Search markets, categories, stories…"
        />
        <select
          className={styles.select}
          name="sort"
          defaultValue={params.sort}
        >
          <option value="latest">Latest</option>
          <option value="volume">Highest volume</option>
        </select>
        <input type="hidden" name="limit" value="50" />
        <button className={styles.button}>Search</button>
      </form>
      <p className={styles.muted}>
        {markets.length} markets · filters preserved in the URL
      </p>
      <MarketGrid markets={markets} />
    </>
  );
}
