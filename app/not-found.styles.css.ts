import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Centers the missing-page experience. */
export const page = style({
  display: "grid",
  minHeight: "75vh",
  placeContent: "center",
  textAlign: "center",
});

/** Styles missing-page labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles the missing-page headline. */
export const title = style({
  margin: "18px 0 25px",
  fontSize: "clamp(48px, 7vw, 88px)",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles missing-page context. */
export const lead = style({
  maxWidth: "540px",
  color: vars.color.muted,
  fontSize: "17px",
  lineHeight: 1.7,
});

/** Styles the discovery action. */
export const action = style({
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: "12px 17px",
  color: "#11151b",
  fontWeight: 800,
});
