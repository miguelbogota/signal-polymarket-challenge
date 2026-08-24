import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles the reusable primary button control. */
export const button = style({
  cursor: "pointer",
  border: 0,
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  color: vars.color.ink,
  fontWeight: vars.fontWeight.extraBold,
  selectors: { "&:disabled": { cursor: "not-allowed", opacity: 0.45 } },
});

/** Styles the secondary button state used by outcome controls. */
export const ghost = style({
  cursor: "pointer",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: "transparent",
  padding: `${vars.space.sm} ${vars.space.lg}`,
  color: vars.color.text,
  fontWeight: vars.fontWeight.extraBold,
});
