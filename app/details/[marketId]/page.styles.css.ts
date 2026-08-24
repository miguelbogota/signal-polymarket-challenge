import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Lays out market detail content and placement controls. */
export const detail = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "18px",
  marginTop: "35px",
  "@media": {
    "screen and (min-width: 850px)": { gridTemplateColumns: "1.2fr .8fr" },
  },
});

/** Styles market detail labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles market detail headlines. */
export const pageTitle = style({
  margin: "18px 0 25px",
  fontSize: "46px",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles market detail context. */
export const lead = style({
  maxWidth: "540px",
  color: vars.color.muted,
  fontSize: "17px",
  lineHeight: 1.7,
});

/** Prevents the placement panel from stretching. */
export const placementColumn = style({ alignSelf: "start" });
