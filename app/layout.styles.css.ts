import { style } from "@vanilla-extract/css";

/** Centers the shared application frame. */
export const shell = style({
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "0 28px",
  "@media": { "screen and (max-width: 767px)": { padding: "0 18px" } },
});
