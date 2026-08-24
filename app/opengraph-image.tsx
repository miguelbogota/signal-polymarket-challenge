import { ImageResponse } from "next/og";

/** Describes the social preview image for assistive technology. */
export const alt = "Signal — AI-assisted market intelligence";

/** Defines the standard Open Graph image dimensions. */
export const size = { width: 1200, height: 630 };

/** Declares the generated social preview image format. */
export const contentType = "image/png";

/** Renders Signal's branded social preview image for shared links. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#090b12",
        color: "#edf2ff",
        display: "flex",
        height: "100%",
        overflow: "hidden",
        padding: "64px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#c7ff49",
          borderRadius: "28px",
          color: "#11151b",
          display: "flex",
          fontSize: "88px",
          fontWeight: 800,
          height: "132px",
          justifyContent: "center",
          lineHeight: 1,
          paddingTop: "12px",
          width: "132px",
        }}
      >
        ↗
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginLeft: "48px",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#c7ff49",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "8px",
            }}
          >
            SIGNAL
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "68px",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1.04,
              marginTop: "38px",
            }}
          >
            <span>See the market.</span>
            <span>Understand the signal.</span>
          </div>
        </div>
        <div
          style={{
            color: "#929ab0",
            display: "flex",
            fontSize: "24px",
            letterSpacing: "1px",
          }}
        >
          AI-assisted market intelligence
        </div>
      </div>
      <div
        style={{
          background: "#171b29",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "32px",
          bottom: "-110px",
          display: "flex",
          height: "360px",
          position: "absolute",
          right: "-90px",
          transform: "rotate(-12deg)",
          width: "420px",
        }}
      />
    </div>,
    size,
  );
}
