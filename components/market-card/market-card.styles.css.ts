import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles a market summary card. */
export const card = style({
  display: "flex",
  minHeight: "214px",
  flexDirection: "column",
  gap: "13px",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  padding: vars.space.lg,
});

/** Styles market categories. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles the market question. */
export const question = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "-.025em",
  lineHeight: 1.35,
});

/** Styles market context copy. */
export const muted = style({ color: vars.color.muted, fontSize: "13px" });

/** Arranges the card footer. */
export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
});

/** Styles the market probability. */
export const probability = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "15px",
  fontWeight: 500,
});

/** Styles recorded YES positions. */
export const yes = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "13px",
  fontWeight: 500,
});

/** Styles recorded NO positions. */
export const no = style({
  color: vars.color.danger,
  fontFamily: vars.font.mono,
  fontSize: "13px",
  fontWeight: 500,
});

/** Styles a market card's secondary action. */
export const action = style({
  cursor: "pointer",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: "transparent",
  padding: "12px 17px",
  color: vars.color.text,
  fontWeight: 800,
});

/** Styles the low-emphasis market detail link. */
export const link = style({ color: vars.color.muted, fontSize: "12px" });
