import { ImageResponse } from "next/og";

export const alt = "Dhanvis Elevators Pvt Ltd, lift installation and service in Tirupati";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "radial-gradient(circle at 85% 10%, #0d52d6 0%, #08143a 45%, #030817 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="68" viewBox="0 0 100 122">
            <path d="M0 0 H100 V82 H92 V8 H8 V82 H0 Z" fill="#5b9dff" />
            <path d="M50 12 L67 28.5 H33 Z" fill="#5b9dff" />
            <path d="M0 88 L50 38 L100 88 V99.3 L50 49.3 L0 99.3 Z" fill="#5b9dff" />
            <path d="M28.5 70.8 L50 49.3 L71.5 70.8 V122 H28.5 Z" fill="#dfe5ec" />
            <path d="M46 53.3 L50 49.3 L54 53.3 V122 H46 Z" fill="#5b9dff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 1 }}>DHANVIS</div>
            <div style={{ fontSize: 14, letterSpacing: 8, color: "#c3ccd9" }}>ELEVATORS PVT LTD</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>Engineered to lift.</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: "#c3ccd9" }}>
            Designed to impress.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#c3ccd9" }}>
          <span>All types of lift installation &amp; service · Tirupati</span>
          <span style={{ color: "white" }}>+91 98493 18445</span>
        </div>
      </div>
    ),
    size,
  );
}
