# Signal — Polymarket challenge

A Vercel-ready Next.js market-discovery demo. **Signal** uses “market” consistently throughout the product and codebase.

## Run

```bash
npm install
npm run dev
```

Sign in with `miguel@signal.demo` / `signal2026`. Market placement is deliberately simulated: it adjusts the in-memory portfolio only. `POLYMARKET_REAL_PLACEMENTS` is an explicit integration seam, not an implementation that sends real orders.

The discovery service attempts Polymarket's public Gamma API and falls back to curated mock markets if it is unavailable (including VPN-restricted regions). `npm test` runs the Vitest suite.
