import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { breakpoints, vars } from "@/styles/theme.css";

/** Defines responsive layout, spacing, and typography utility properties. */
const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": breakpoints.tablet },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "block", "flex", "grid", "inline-flex"],
    flexDirection: ["row", "column"],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    justifyContent: ["flex-start", "center", "flex-end", "space-between"],
    gap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    textAlign: ["left", "center", "right"],
    fontSize: vars.fontSize,
  },
  shorthands: {
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    marginY: ["marginTop", "marginBottom"],
  },
});

/** Defines color utilities backed by the active semantic theme. */
const colorProperties = defineProperties({
  properties: {
    color: vars.color,
    background: vars.color,
  },
});

/** Generates zero-runtime, type-safe utility classes for common layout needs. */
export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

/** Represents accepted atomic style properties for the Signal design system. */
export type Sprinkles = Parameters<typeof sprinkles>[0];
