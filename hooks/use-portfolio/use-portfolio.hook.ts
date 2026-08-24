"use client";

import { useEffect, useState } from "react";
import type { PortfolioSnapshot } from "@/services/portfolio";

/** Loads the current simulated portfolio for display in the profile experience. */
export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioSnapshot>({
    balance: 1250,
    positions: [],
  });

  useEffect(() => {
    fetch("/api/portfolio/place")
      .then((r) => r.json())
      .then(setPortfolio);
  }, []);

  return portfolio;
}
