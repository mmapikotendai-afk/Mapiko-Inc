import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "Loom Digital — Custom software, websites, and practical AI solutions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/loom-digital.svg"));
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
      <img
        src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
        alt="Loom Digital"
        width={252}
        height={81}
      />
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
