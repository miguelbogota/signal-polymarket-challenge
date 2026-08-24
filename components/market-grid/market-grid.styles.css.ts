import { style } from "@vanilla-extract/css";

/** Lays market cards out in a responsive grid. */
export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  "@media": {
    "screen and (min-width: 850px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
  },
});
