// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Achla - Full-stack & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0e13",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Ambient gradient */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,162,76,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(155,122,140,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}
        >
          {/* Terminal Icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#10151c",
              border: "1px solid rgba(236,228,214,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 700,
                color: "#d4a24c",
              }}
            >
              {">"}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 700,
                color: "#ece4d6",
                marginLeft: 2,
              }}
            >
              _
            </span>
          </div>

          {/* Text */}
          <div style={{ display: "flex" }}>
            <span
              style={{
                fontFamily: "serif",
                fontSize: 28,
                fontWeight: 600,
                color: "#ece4d6",
              }}
            >
              Achla
            </span>
            <span
              style={{
                fontFamily: "serif",
                fontSize: 28,
                fontWeight: 600,
                color: "#d4a24c",
              }}
            >
              .
            </span>
            <span
              style={{
                fontFamily: "serif",
                fontSize: 28,
                fontWeight: 600,
                color: "#ece4d6",
              }}
            >
              dev
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "serif",
            fontSize: 64,
            fontWeight: 700,
            color: "#ece4d6",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Full-stack &{" "}
          <span style={{ color: "#d4a24c", fontStyle: "italic" }}>AI</span>{" "}
          Developer
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#a49c92",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: 600,
          }}
        >
          Five years shipping web applications and applied AI systems. Laravel,
          React, Python, LangChain, RAG.
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(236,228,214,0.12)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { value: "5+", label: "Years" },
              { value: "15+", label: "Projects" },
              { value: "3", label: "Companies" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontFamily: "serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#ece4d6",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#a49c92",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(127,169,160,0.1)",
              border: "1px solid rgba(127,169,160,0.3)",
              borderRadius: 999,
              padding: "8px 16px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#7fa9a0",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: "#7fa9a0",
              }}
            >
              Available for work
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}