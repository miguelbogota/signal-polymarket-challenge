"use client";

import { useEffect, useState } from "react";
import * as styles from "./ai-recommendation.styles.css";

/** Limits browser-side recommendation reuse to ten minutes. */
const cacheTtlMs = 10 * 60 * 1000;
type BrowserCache = { text: string; expiresAt: number };

/** Streams and presents an identifiable, cached AI market recommendation. */
export function AiRecommendation({ marketId }: { marketId: string }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const cacheKey = `signal-ai-recommendation:${marketId}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      const cachedRecommendation = JSON.parse(cached) as BrowserCache;
      if (cachedRecommendation.expiresAt > Date.now()) {
        setText(cachedRecommendation.text);
        setIsLoading(false);
        return () => abortController.abort();
      }
      sessionStorage.removeItem(cacheKey);
    }

    const readRecommendation = async () => {
      try {
        const response = await fetch(
          `/api/market-recommendation?marketId=${marketId}`,
          { signal: abortController.signal },
        );

        if (!response.ok || !response.body)
          throw new Error("Recommendation unavailable");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let completedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const delta = decoder.decode(value, { stream: true });
          completedText += delta;
          setText((current) => current + delta);
        }

        const finalDelta = decoder.decode();
        completedText += finalDelta;
        setText((current) => current + finalDelta);

        if (completedText) {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              text: completedText,
              expiresAt: Date.now() + cacheTtlMs,
            }),
          );
        }
      } catch {
        if (!abortController.signal.aborted) {
          setText(
            "Signal AI is temporarily unavailable. Please use the market data above to make your own assessment.",
          );
        }
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    };

    readRecommendation();

    return () => abortController.abort();
  }, [marketId]);

  return (
    <section className={styles.panel} aria-live="polite">
      <div className={styles.heading}>
        <span className={styles.icon} aria-hidden="true">
          ✦
        </span>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Signal AI read</span>
          <strong className={styles.title}>AI recommendation</strong>
        </div>
        {isLoading && (
          <span className={styles.status}>Analyzing live market context…</span>
        )}
      </div>
      <p className={styles.text}>
        {text || "Preparing a grounded market read…"}
      </p>
      <p className={styles.disclaimer}>
        This AI-generated simulation is not financial advice. Do not base a
        trading decision solely on this recommendation.
      </p>
    </section>
  );
}
