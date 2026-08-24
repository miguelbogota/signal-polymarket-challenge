import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles profile headers. */
export const pageHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "55px 0 26px",
  "@media": {
    "screen and (min-width: 850px)": {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
  },
});

/** Styles profile labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles profile titles. */
export const pageHeaderTitle = style({
  margin: "8px 0",
  fontSize: "47px",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles primary profile actions. */
export const button = style({
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: "12px 17px",
  color: "#11151b",
  fontWeight: 800,
});

/** Builds the portfolio summary layout. */
export const profileGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  "@media": {
    "screen and (min-width: 850px)": { gridTemplateColumns: "280px 1fr" },
  },
});

/** Styles profile information panels. */
export const panel = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  padding: vars.space.lg,
});

/** Styles portfolio balances. */
export const balance = style({
  margin: "8px 0",
  fontSize: "36px",
  fontWeight: 800,
  letterSpacing: "-.06em",
});

/** Separates account metrics. */
export const stat = style({
  borderTop: `1px solid ${vars.color.border}`,
  padding: "18px 0",
});

/** Styles supporting profile copy. */
export const muted = style({
  color: vars.color.muted,
  fontSize: "13px",
});

/** Displays block metric values. */
export const block = style({
  display: "block",
});

/** Styles profile section headings. */
export const sectionTitle = style({
  fontSize: "30px",
  letterSpacing: "-.04em",
});

/** Styles profile explanatory copy. */
export const lead = style({
  maxWidth: "540px",
  color: vars.color.muted,
  fontSize: "17px",
  lineHeight: 1.7,
});

/** Adds separation before placed markets. */
export const placedMarkets = style({ marginTop: "54px" });

/** Lays saved positions out responsively. */
export const positionGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "14px",
  "@media": {
    "screen and (min-width: 850px)": {
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    },
  },
});

/** Styles the empty-portfolio state. */
export const emptyPositions = style([
  panel,
  { display: "flex", alignItems: "center", justifyContent: "space-between" },
]);

/** Styles profile secondary actions. */
export const ghost = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "12px 17px",
  color: vars.color.text,
  fontWeight: 800,
});
