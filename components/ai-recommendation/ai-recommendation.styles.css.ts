import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles the AI recommendation surface. */
export const panel = style({
  marginTop: "28px",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: "linear-gradient(135deg, #131a2d, #11141e 65%)",
  padding: vars.space.lg,
});

/** Arranges the AI recommendation heading. */
export const heading = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

/** Renders the visual AI marker. */
export const icon = style({
  display: "grid",
  width: "34px",
  height: "34px",
  placeItems: "center",
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: "#121722",
  fontSize: "20px",
});

/** Stacks the AI label and recommendation title. */
export const copy = style({
  display: "grid",
  gap: vars.space.xxs,
});

/** Styles AI identity text. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Keeps the AI recommendation title on its own line. */
export const title = style({ display: "block" });

/** Styles the live AI status. */
export const status = style({
  marginLeft: "auto",
  color: vars.color.muted,
  fontSize: "11px",
});

/** Prevents content movement while the AI response streams. */
export const text = style({ minHeight: "48px", lineHeight: 1.75 });

/** Separates the product disclaimer from generated AI content. */
export const disclaimer = style({
  margin: "14px 0 0",
  color: vars.color.muted,
  fontSize: "12px",
  lineHeight: 1.55,
});
