# Signal — AI-assisted market intelligence

[Live demo](https://signal-polymarket-challenge.vercel.app/) · [Report an issue](../../issues)

Signal is a polished, single-page-style product experience for discovering prediction markets, forming a view, and tracking simulated positions. It was built as a take-home exercise around a simple question: **how can an interface make an unfamiliar market feel understandable without pretending to know the future?**

The result is intentionally a product prototype, not a trading application. It uses Polymarket/Gamma-shaped market data for discovery, keeps placements safely simulated by default, and presents an AI read as one input alongside the market’s own data.

## What to try

The deployed version is available at [signal-polymarket-challenge.vercel.app](https://signal-polymarket-challenge.vercel.app/).

Use the demo account to explore the signed-in experience:

| Field    | Value                |
| -------- | -------------------- |
| Email    | `miguel@signal.demo` |
| Password | `signal2026`         |

Once signed in, a reviewer can:

- Browse the landing page and see the product’s AI-first positioning.
- Search markets by query, sort, limit, and other URL query parameters.
- Open the trending view to scan active markets quickly.
- Read a market detail page with prices, context, an AI recommendation, and a simulated placement panel.
- Place a Yes or No position using the demo balance, then see that position on the profile and across market cards.
- Revisit a market to see the cached AI recommendation rather than needlessly request it again.

## The product in one glance

```text
Gamma-shaped market data ──→ discovery, search, trending, details
                                      │
                                      ├──→ Signal AI read (streamed and cached)
                                      │
                                      └──→ simulated position → profile + market cards
```

The interface uses **market** and **position** throughout. Those are clearer product concepts than “bet” and keep the UI, API, services, and data model speaking the same language.

## Why it is built this way

### Make the important path obvious

The experience is designed around a short, natural flow: find a market, understand the current signal, decide whether to take a position, and see the result reflected in the portfolio. Each page has a clear role rather than trying to put the entire product on one crowded screen.

| Page                  | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `/`                   | Explains Signal’s value and leads into the product.                |
| `/authentication`     | Provides a deliberately simple, guarded demo sign-in.              |
| `/profile/[profile]`  | Shows balance, positions, and a small set of hot opportunities.    |
| `/search`             | Makes discovery shareable and repeatable through query parameters. |
| `/trending`           | Surfaces the markets with current momentum.                        |
| `/details/[marketId]` | Brings market data, AI context, and placement together.            |
| `/error`              | Keeps error states consistent with the rest of the product.        |

### Keep real-world integration safe

Signal can read from the Polymarket Gamma API when it is available, but it never sends a real order by default. The `POLYMARKET_REAL_PLACEMENTS` flag is explicitly `false` in the example configuration. The placement layer is isolated in the market service so a real provider could be introduced later without changing route handlers or React components.

When external market discovery is disabled or unavailable, the app uses local data with the same raw Gamma-style shape. This means the challenge remains reviewable, deterministic, and usable in regions where the external API may be restricted.

### Treat AI as an assist, not an authority

The detail view asks the AI service for a short read based on the selected market’s available context. The response is streamed into the UI, so the page stays responsive while text arrives. It is cached server-side and in the browser for a short period to reduce duplicate work and token use on revisits.

The service owns provider-specific details. Today it uses OpenRouter, but components and API routes depend only on the service’s small, stable interface. Switching providers should be a contained change inside `ai.service.ts`, not a rewrite of the product surface.

Every recommendation ends with a clear disclaimer: it is a simulation, not financial advice, and should never be the sole reason for a trading decision. If the model cannot form a grounded view, the prompt directs it to say so rather than invent confidence.

### Keep the demo honest

Authentication is intentionally lightweight: it uses one hardcoded demo account and route guards to protect the profile area and keep signed-in users out of the authentication page. Positions and balance are stored in memory, so they reset when the server process restarts. That is appropriate for a focused product exercise and makes the boundary for a future database integration easy to see.

## Architecture

Signal uses the Next.js App Router and keeps product concerns separated by responsibility.

```text
app/          Pages, API routes, document metadata, and route-level UI
components/   Reusable, colocated UI components and their tests/styles
services/     Market discovery, simulated placements, AI, and portfolio logic
hooks/        Focused client-side behavior
state/        Shared session context
utils/        Logging and small cross-cutting helpers
styles/       Vanilla Extract theme, sprinkles, and global foundations
```

Each visual unit keeps its component, test, index export, and Vanilla Extract stylesheet together. This makes changes local: a reviewer can understand a component by opening one folder instead of hunting through a central stylesheet.

### Request boundaries

| Endpoint                                    | Responsibility                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `GET /api/markets`                          | Returns the latest markets or filters them through URL query parameters. |
| `GET /api/markets/trending`                 | Returns the current trending selection.                                  |
| `POST /api/authentication/signin`           | Validates the demo credentials.                                          |
| `POST /api/authentication/signup`           | Intentionally reports that sign-up is not available in this demo.        |
| `GET /api/market-recommendation?marketId=…` | Streams the AI recommendation for one market.                            |

The routes remain thin. They validate input and delegate the work to service instances. That makes the code easier to test, keeps provider details out of the UI, and leaves room for replacing the in-memory portfolio or market source later.

## Design system and accessibility

The design is built with Vanilla Extract rather than a utility CSS framework. A small token theme covers color, spacing, typography, radius, effects, and responsive behavior; components consume those tokens through colocated `*.styles.css.ts` files. This keeps the dark Signal visual language consistent while avoiding a large global stylesheet.

The UI also includes practical accessibility details: semantic landmarks, visible focus states, labeled form controls, live-region updates for streamed AI text, and text that explains unavailable or loading states. The visual AI marker and two-line heading make it clear that the recommendation is generated context, not a market fact.

## Technology choices

- **Next.js + TypeScript** — App Router pages and API routes in one deployable project.
- **React** — interactive market search, session state, streaming, and placements.
- **Vanilla Extract + Sprinkles** — type-safe, scoped styling and reusable design tokens.
- **OpenRouter** — a provider boundary for the AI recommendation model.
- **Vitest + Testing Library** — fast unit coverage for components, hooks, services, state, and utilities.
- **Prettier** — consistent formatting across the codebase.
- **Vercel** — deployment for the live demo.

## Run locally

### Requirements

- Node.js 20 or newer
- npm

### Setup

```bash
git clone <your-repository-url>
cd polymarket-challenge
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with the demo credentials above.

### Environment variables

| Variable                     | Required    | Purpose                                                                                  |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `POLYMARKET_REAL_PLACEMENTS` | No          | Keeps placements simulated. Leave `false` for this challenge.                            |
| `POLYMARKET_API_ENABLED`     | No          | Enables external Gamma discovery when available. Local market data remains the fallback. |
| `OPENROUTER_API_KEY`         | For live AI | Server-only key used by the OpenRouter-backed recommendation service.                    |
| `OPENROUTER_MODEL`           | No          | Overrides the default model route.                                                       |

Without an OpenRouter key, the rest of the application still works and the AI area fails gracefully with a useful message.

## Quality checks

```bash
npm run format
npm test
npm run build -- --webpack
```

The project keeps unit tests beside the code they exercise. Barrel-only `index.ts` exports are intentionally excluded from testing because they contain no behavior.

## Deploying to Vercel

1. Import the repository into Vercel.
2. Add `OPENROUTER_API_KEY` in the project environment variables if live recommendations are desired.
3. Keep `POLYMARKET_REAL_PLACEMENTS=false` for the demo.
4. Deploy. Vercel detects Next.js automatically.

The current deployed demo is [Signal on Vercel](https://signal-polymarket-challenge.vercel.app/).

## What I would build next

If this moved from challenge prototype to a production product, the next sensible steps would be persistent user accounts and positions, a durable cache, server-side rate limiting, observability around provider latency and failures, stronger market-source reconciliation, and a real exchange integration behind explicit user confirmation. None of those additions should require changing the core page components because the app already separates UI, route, and service responsibilities.

## Important note

Signal is a demonstration of market discovery and AI-assisted product design. It does not place real orders by default, does not provide financial advice, and should not be used as the basis for a real trading decision.
