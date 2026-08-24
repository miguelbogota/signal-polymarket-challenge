import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles the trending page header. */
export const pageHeader = style({
  padding: "55px 0 26px",
});

/** Styles trending labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles trending titles. */
export const pageHeaderTitle = style({
  margin: "8px 0",
  fontSize: "47px",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles trending copy. */
export const lead = style({
  maxWidth: "540px",
  color: vars.color.muted,
  fontSize: "17px",
  lineHeight: 1.7,
});
