import { style } from "@vanilla-extract/css";
import { sprinkles } from "@/styles/sprinkles.css";
import { vars } from "@/styles/theme.css";

/** Builds the responsive landing layout. */
export const hero = style([
  sprinkles({ display: "grid", alignItems: "center", gap: "xl" }),
  {
    minHeight: "calc(100vh - 76px)",
    gridTemplateColumns: "1fr",
    "@media": {
      "screen and (min-width: 850px)": { gridTemplateColumns: "1.1fr .9fr" },
    },
  },
]);

/** Styles landing labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: ".8em",
  fontWeight: 500,
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles the landing headline. */
export const pageTitle = style({
  margin: "18px 0 25px",
  fontSize: "clamp(48px, 7vw, 88px)",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles landing supporting copy. */
export const lead = style({
  maxWidth: "540px",
  color: vars.color.muted,
  fontSize: "17px",
  lineHeight: 1.7,
});

/** Arranges landing actions. */
export const actions = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: "32px",
});

/** Styles primary landing actions. */
export const button = style({
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: "12px 17px",
  color: "#11151b",
  fontWeight: 800,
});

/** Styles secondary landing actions. */
export const ghost = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "12px 17px",
  color: vars.color.text,
  fontWeight: 800,
});

/** Creates the 3D market-read wrapper. */
export const orb = style({
  position: "relative",
  height: "480px",
  transform: "perspective(800px) rotateY(-12deg) rotateX(6deg)",
});

const cardMaxWidth = "400px";
const cardPadding = "27px";

/** Renders the 3D card plane. */
export const orbPlane = style({
  position: "absolute",
  inset: "28px",
  borderRadius: "28px",
  background: "linear-gradient(135deg,#354574,#131827 60%,#a2d72b)",
  filter: "drop-shadow(0 35px 45px #0009)",
  maxWidth: cardMaxWidth,
});

/** Renders the floating market read. */
export const signalCard = style({
  position: "absolute",
  inset: "58px 36px",
  border: "1px solid rgba(255,255,255,.2)",
  borderRadius: "20px",
  background: "#101521d9",
  padding: cardPadding,
  backdropFilter: "blur(8px)",
  maxWidth: `calc(${cardMaxWidth} - ${cardPadding})`,
});

/** Styles the visual probability. */
export const score = style({
  marginTop: vars.space.lg,
  fontSize: "68px",
  fontWeight: 800,
  letterSpacing: "-.07em",
});

/** Styles market outcome rows. */
export const choice = style({
  display: "flex",
  justifyContent: "space-between",
  margin: "8px 0",
  borderRadius: vars.radius.md,
  background: vars.color.surfaceRaised,
  padding: "12px",
});

/** Highlights the positive outcome. */
export const yesChoice = style([
  choice,
  {
    borderLeft: `3px solid ${vars.color.accent}`,
  },
]);
