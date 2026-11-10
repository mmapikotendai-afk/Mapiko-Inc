import { ImageResponse } from "next/og";
export const alt =
  "Mapiko Inc. — Custom software, websites, and practical AI solutions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f6f5f0",
        color: "#13233b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ fontSize: 36 }}>Mapiko Inc.</div>
      <div
        style={{
          fontSize: 76,
          lineHeight: 1.1,
          letterSpacing: -3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Software that moves</span>
        <span>your business forward.</span>
      </div>
      <div style={{ fontSize: 25, color: "#254ded" }}>
        Custom software. Websites. Practical AI.
      </div>
    </div>,
    size,
  );
}
