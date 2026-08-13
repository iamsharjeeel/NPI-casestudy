import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Xovera × Newtown Athletic Club / NPI success story";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080c",
          color: "#f4f6fb",
          padding: "64px",
          fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c9b0a4" }}>
          Success story / Fitness + Sports
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 980 }}>
            A faster growth operation for a club that refuses to stand still.
          </div>
          <div style={{ fontSize: 26, color: "#c5cddd", maxWidth: 820 }}>
            Newtown Athletic Club / Newtown Performance Institute · Pennsylvania
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#ef7a4a" }}>
          <span>Xovera</span>
          <span>Featuring Doug, Director of NPI</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
