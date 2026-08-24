import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Centers the private authentication route. */
export const page = style({ maxWidth: "430px", margin: "100px auto" });

/** Styles the route label. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: ".12em",
  textTransform: "uppercase",
});
