import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "#0a0e13",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#d4a24c", fontSize: 64, marginRight: 4 }}>
          {">"}
        </span>
        <span style={{ color: "#ece4d6", fontSize: 56 }}>_</span>
      </div>
    ),
    { ...size }
  );
}