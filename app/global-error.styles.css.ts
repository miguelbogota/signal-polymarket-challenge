import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Centers the global fallback experience. */
export const page = style({
  display: "grid",
  minHeight: "75vh",
  placeContent: "center",
  textAlign: "center",
});

/** Styles global fallback labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles global fallback titles. */
export const title = style({
  margin: "18px 0 25px",
  fontSize: "clamp(48px, 7vw, 88px)",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles global fallback recovery actions. */
export const button = style({
  cursor: "pointer",
  border: 0,
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: "12px 17px",
  color: "#11151b",
  fontWeight: 800,
});
