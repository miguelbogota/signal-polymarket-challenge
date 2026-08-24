import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles the position placement panel. */
export const panel = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  padding: vars.space.lg,
});

/** Styles the panel label. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.label,
  textTransform: "uppercase",
});

/** Styles the placement heading. */
export const title = style({
  fontSize: vars.fontSize.display,
  letterSpacing: vars.letterSpacing.title,
});

/** Arranges outcome buttons. */
export const outcomes = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: vars.space.xl,
});

/** Lays out the amount input. */
export const field = style({
  display: "grid",
  gap: vars.space.xs,
  margin: `${vars.space.md} 0`,
});

/** Styles the amount input. */
export const input = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.input,
  padding: vars.space.md,
  color: vars.color.text,
});

/** Styles placement feedback. */
export const feedback = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.body,
  fontWeight: vars.fontWeight.medium,
});

/** Styles placement disclosure copy. */
export const muted = style({
  color: vars.color.muted,
  fontSize: vars.fontSize.body,
});
