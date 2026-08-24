import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles the private authentication surface. */
export const form = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  padding: vars.space.lg,
});

/** Styles small all-caps form labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.label,
  textTransform: "uppercase",
});

/** Styles the authentication heading. */
export const title = style({
  fontSize: vars.fontSize.display,
  letterSpacing: vars.letterSpacing.title,
});

/** Lays out one authentication input. */
export const field = style({
  display: "grid",
  gap: vars.space.xs,
  margin: `${vars.space.md} 0`,
});

/** Styles authentication form inputs. */
export const input = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.input,
  padding: vars.space.md,
  color: vars.color.text,
});

/** Styles form feedback. */
export const feedback = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.body,
  fontWeight: vars.fontWeight.medium,
});

/** Styles authentication helper copy. */
export const muted = style({
  color: vars.color.muted,
  fontSize: vars.fontSize.body,
});
