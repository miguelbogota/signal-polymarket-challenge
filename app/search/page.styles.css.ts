import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Styles discovery headers. */
export const pageHeader = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "16px",
  padding: "55px 0 26px",
  "@media": {
    "screen and (min-width: 850px)": {
      flexDirection: "row",
      alignItems: "flex-end",
    },
  },
});

/** Styles discovery labels. */
export const eyebrow = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
});

/** Styles discovery titles. */
export const pageHeaderTitle = style({
  margin: "8px 0",
  fontSize: "47px",
  fontWeight: 800,
  letterSpacing: "-.07em",
  lineHeight: ".96",
});

/** Styles compact secondary actions. */
export const ghost = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "12px 17px",
  color: vars.color.text,
  fontWeight: 800,
});

/** Arranges search inputs. */
export const searchRow = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "24px",
  "@media": { "screen and (min-width: 850px)": { flexDirection: "row" } },
});

/** Styles the query input. */
export const textInput = style({
  flex: 1,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  padding: "14px",
  color: vars.color.text,
});

/** Styles the sort selector. */
export const select = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  padding: "0 10px",
  color: vars.color.text,
});

/** Styles the search action. */
export const button = style({
  cursor: "pointer",
  border: 0,
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  padding: "12px 17px",
  color: "#11151b",
  fontWeight: 800,
});

/** Styles result metadata. */
export const muted = style({
  color: vars.color.muted,
  fontSize: "13px",
});
