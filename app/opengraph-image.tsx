// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "nodejs"; // remove if you prefer Edge
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const title = "SynkList";
  const subtitle = "AI Command Center in WhatsApp · Private by design";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#fafafa",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            width: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* SL mark + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 84,
                height: 84,
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 24,
                display: "flex",                // <-- flex instead of grid
                alignItems: "center",           // center content
                justifyContent: "center",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              }}
            >
              <span style={{ fontSize: 42, fontWeight: 700 }}>SL</span>
            </div>
            <div style={{ fontSize: 40, opacity: 0.9 }}>SynkList</div>
          </div>

          {/* Title */}
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              width: 1000,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />

          {/* Subtitle */}
          <div style={{ fontSize: 32, opacity: 0.8 }}>{subtitle}</div>
        </div>
      </div>
    ),
    size
  );
}
