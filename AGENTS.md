# Signal Contributor Guide

This file is the required working agreement for every agent or contributor making a change in this repository. Read it before editing code and follow it through verification.

## Product and stack

Signal is an AI-assisted prediction-market discovery prototype. It supports a hardcoded demo sign-in, market discovery, simulated positions, a private portfolio, and streamed market recommendations.

- Framework: Next.js App Router with TypeScript.
- UI: React and Vanilla Extract. Do not add Tailwind or Sass.
- Design tokens: `styles/theme.css.ts`.
- Atomic responsive utilities: `styles/sprinkles.css.ts`.
- Global reset only: `styles/global.css.ts`.
- AI provider boundary: `services/ai/ai.service.ts`, currently OpenRouter.
- Tests: Vitest and Testing Library.

## Required project structure

Keep implementation in these top-level folders:

- `app/`: App Router pages and API route handlers.
- `components/`: reusable UI components.
- `services/`: server/business integrations, including markets, portfolio, and AI.
- `hooks/`: reusable React hooks.
- `state/`: client state stores.
- `utils/`: shared utilities such as logging.
- `styles/`: shared theme, Sprinkles, and global baseline only.

Use the established colocated module pattern. A component or page that has styles owns its own `*.styles.css.ts` file in the same folder as its TSX file. For example:

```text
components/button/
├── button.component.tsx
├── button.styles.css.ts
├── button.test.tsx
├── button.{types/hook/util/{any other type of file}}.tsx
└── index.ts

app/search/
├── page.tsx
└── page.styles.css.ts
```

Do not recreate a centralized UI stylesheet. The previous `styles/ui.css.ts` pattern is intentionally not used.

## Styling rules

- Use Vanilla Extract for every component and page style.
- Keep shared colors, spacing, radii, fonts, and breakpoints in the theme or Sprinkles files; reference the theme variables from local style modules.
- Do not hardcode colors, spacing, radii, fonts, or breakpoints in component or page style modules when an appropriate theme token exists. Add or refine a theme token first.
- Use Sprinkles for shared atomic responsive layout needs when appropriate.
- Avoid inline `style` props and raw utility-class strings.
- Use `clsx` whenever a component accepts a caller-provided `className`.
- Keep visual changes consistent with Signal's dark canvas, lime accent, and compact market-terminal aesthetic.

## Market data rules

- `services/markets/mocked-markets.ts` is the canonical mock dataset.
- `Market` is the raw Gamma/Polymarket-shaped record inferred from that mock dataset. Do not introduce a second flattened market type.
- Use the helpers in `markets.service.ts` for display values such as YES price, volume, movement, category, and resolution date.
- Keep real Polymarket access read-only. Simulated placements go through the portfolio service; never send a real trade from the UI.

## AI rules

- Route handlers and React components must use the stable `AiService` API, never provider-specific code.
- Keep OpenRouter-specific request and streaming logic inside `services/ai/ai.service.ts`.
- Preserve streaming and cache behavior when changing recommendations.
- The AI disclaimer is fixed UI text, not an instruction included in the model prompt or AI response.

## Authentication and portfolio rules

- Authentication is intentionally hardcoded demo access; signup remains unavailable.
- Signed-out visitors cannot access profiles; signed-in users cannot open the authentication page and cannot view another user's profile.
- Portfolio positions are intentionally in-memory and must appear in profile, explore, and trending market cards after placement.

## Quality requirements

- Do not add, remove, or upgrade dependencies unless the user explicitly asks for it.
- Add or update a unit test for every changed component, service, hook, state module, or utility.
- Do not add tests for `index.ts` barrel exports only.
- Update tests to use the Gamma-shaped mock records rather than the retired flattened market fixtures.
- Add a concise JSDoc description for every top-level `const`, function, and component. Do not use JSDoc `@param` or `@returns` tags.
- Declare one variable per `const`, `let`, or `var` statement. Do not use comma-chained declarations such as `const first = value, second = otherValue;`.
- Use the shared `logger` with `logger.info(event, context)` or the equivalent level method. Put structured metadata, including `tags` and `status`, in the context object.

## Required verification

Run these commands before handing off a change:

```bash
npm run format
npm run test
npm run build
```

Report the commands run and any remaining limitations. Do not commit, deploy, or change secrets unless the user explicitly requests it.
