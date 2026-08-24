import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles the global navigation bar. */
export const nav = style({
  display: "flex",
  height: "76px",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${vars.color.border}`,
});

/** Styles the Signal wordmark. */
export const brand = style({
  fontSize: "21px",
  fontWeight: 800,
  letterSpacing: "-1px",
});

/** Styles the Signal wordmark's highlight. */
export const brandAccent = style({
  color: vars.color.accent,
  fontStyle: "normal",
});

/** Displays navigation links on wider screens. */
export const links = style({
  display: "none",
  gap: "22px",
  color: vars.color.muted,
  fontSize: "14px",
  "@media": { "screen and (min-width: 850px)": { display: "flex" } },
});

/** Arranges signed-in navigation actions. */
export const actions = style({ display: "flex", gap: vars.space.sm });

/** Styles compact secondary navigation actions. */
export const action = style({
  cursor: "pointer",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: "transparent",
  padding: "12px 17px",
  color: vars.color.text,
  fontWeight: 800,
});

/** Styles the primary sign-in navigation action. */
export const signIn = style({
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: "12px 17px",
  color: "#11151b",
  fontWeight: 800,
});
