import { notFound } from "next/navigation";
import { marketsService } from "@/services/markets";
import { PlaceMarketPanel } from "@/components/place-market-panel";
import { AiRecommendation } from "@/components/ai-recommendation";
import * as styles from "./page.styles.css";

/** Displays one market's facts, streamed AI read, and placement controls. */
export default async function Details({
  params,
}: {
  params: Promise<{ marketId: string }>;
}) {
  const market = await marketsService.getMarket((await params).marketId);

  if (!market) notFound();

  return (
    <div className={styles.detail}>
      <section>
        <span className={styles.eyebrow}>
          {marketsService.getCategory(market)} · Resolves{" "}
          {marketsService.getEndDate(market)}
        </span>
        <h1 className={styles.pageTitle}>{market.question}</h1>
        <p className={styles.lead}>{market.description}</p>
        <AiRecommendation marketId={market.id} />
      </section>
      <div className={styles.placementColumn}>
        <PlaceMarketPanel market={market} />
      </div>
    </div>
  );
}
