import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#0a0e13",
          border: "1px solid rgba(236,228,214,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#d4a24c", fontSize: 13, marginRight: 1 }}>
          {">"}
        </span>
        <span style={{ color: "#ece4d6", fontSize: 12 }}>_</span>
      </div>
    ),
    { ...size }
  );
}