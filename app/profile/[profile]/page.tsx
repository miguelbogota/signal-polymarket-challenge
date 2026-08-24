"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/hooks/use-session";
import { usePortfolio } from "@/hooks/use-portfolio";
import Link from "next/link";
import { MarketCard } from "@/components/market-card";
import * as styles from "./page.styles.css";

/** Displays the signed-in user's private portfolio and market shortcuts. */
export default function Profile() {
  const params = useParams<{ profile: string }>();
  const router = useRouter();
  const { user, ready } = useSession();
  const portfolio = usePortfolio();

  useEffect(() => {
    if (!ready) return;
    if (!user || user.username !== params.profile)
      router.replace(user ? `/profile/${user.username}` : "/authentication");
  }, [ready, user, params.profile, router]);

  if (!ready || !user) return null;

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Private portfolio</span>
          <h1 className={styles.pageHeaderTitle}>
            Good to see you, {user.username}.
          </h1>
        </div>
        <Link className={styles.button} href="/search">
          Find markets
        </Link>
      </header>
      <div className={styles.profileGrid}>
        <aside className={styles.panel}>
          <span className={styles.eyebrow}>Available to allocate</span>
          <div className={styles.balance}>
            ${portfolio.balance.toLocaleString()}
          </div>
          <div className={styles.stat}>
            <span className={styles.muted}>Open positions</span>
            <strong className={styles.block}>
              {portfolio.positions.length}
            </strong>
          </div>
          <div className={styles.stat}>
            <span className={styles.muted}>Account</span>
            <strong className={styles.block}>{user.email}</strong>
          </div>
        </aside>
        <section>
          <span className={styles.eyebrow}>Hot signals</span>
          <h2 className={styles.sectionTitle}>Markets moving now.</h2>
          <p className={styles.lead}>
            Explore high-conviction stories with a short, transparent AI read
            before you commit simulated funds.
          </p>
          <Link className={styles.button} href="/search?sort=volume">
            View trending markets
          </Link>
        </section>
      </div>
      <section className={styles.placedMarkets}>
        <span className={styles.eyebrow}>Your placed markets</span>
        <h2 className={styles.sectionTitle}>Open positions.</h2>
        {portfolio.positions.length ? (
          <div className={styles.positionGrid}>
            {portfolio.positions.map((position) => (
              <MarketCard
                key={`${position.marketId}-${position.placedAt}`}
                market={position.market}
                position={position}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyPositions}>
            <p className={styles.muted}>You have not placed a position yet.</p>
            <Link className={styles.ghost} href="/search">
              Explore markets
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
