import { globalStyle } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

/** Applies the baseline document styling required by every Signal route. */
globalStyle("*, *::before, *::after", { boxSizing: "border-box" });

globalStyle("html, body", { margin: 0, minHeight: "100%" });

globalStyle("body", {
  background: vars.color.canvas,
  color: vars.color.text,
  fontFamily: vars.font.sans,
});

globalStyle("a", { color: "inherit", textDecoration: "none" });

globalStyle("button, input, select", { font: "inherit" });
