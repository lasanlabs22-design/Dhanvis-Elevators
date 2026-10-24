import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/lib/site";

export const alt = "Dhanvis Elevators Pvt Ltd, lift installation and service across Andhra Pradesh";
export const size = { width: 1200, height: 630 };
// JPEG, because a photo as PNG is ~400 KB and WhatsApp drops preview images much over 300 KB
export const contentType = "image/jpeg";

// Light variant of the Dhanvis mark (same paths as LogoMark), as a standalone SVG for the image renderer
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 122">
  <defs>
    <linearGradient id="b" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#e6e6e6"/><stop offset="1" stop-color="#bdbdbd"/>
    </linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7a7a7a"/><stop offset="0.38" stop-color="#d9d9d9"/><stop offset="0.62" stop-color="#9a9a9a"/><stop offset="1" stop-color="#c4c4c4"/>
    </linearGradient>
    <mask id="m">
      <rect x="-10" y="-10" width="120" height="142" fill="white"/>
      <path d="M-6 88 L50 32 L106 88 V104 L50 48 L-6 104 Z" fill="black"/>
    </mask>
  </defs>
  <g fill="url(#b)">
    <g mask="url(#m)">
      <path d="M0 0 H100 V82 H92 V8 H8 V82 H0 Z"/>
      <path d="M18 33 H82 V66 H74 V41 H26 V66 H18 Z"/>
      <path d="M50 12 L67 28.5 H33 Z"/>
    </g>
    <path d="M0 88 L50 38 L100 88 V99.3 L50 49.3 L0 99.3 Z"/>
    <path d="M0 99 H8 V114 H12.5 V86.8 L18 81.3 V122 H0 Z"/>
    <path d="M100 99 H92 V114 H87.5 V86.8 L82 81.3 V122 H100 Z"/>
  </g>
  <path d="M28.5 70.8 L50 49.3 L71.5 70.8 V122 H28.5 Z" fill="url(#s)"/>
  <g fill="url(#b)">
    <path d="M24.5 74.8 L28.5 70.8 V122 H24.5 Z"/>
    <path d="M75.5 74.8 L71.5 70.8 V122 H75.5 Z"/>
    <path d="M46 53.3 L50 49.3 L54 53.3 V122 H46 Z"/>
  </g>
</svg>`;

const asset = (path: string) => readFile(join(process.cwd(), "src/assets", path));

export default async function OpengraphImage() {
  // Fonts: Montserrat and Inter from Fontsource (SIL Open Font License)
  const [display, displaySemi, body, photo] = await Promise.all([
    asset("fonts/montserrat-800.woff"),
    asset("fonts/montserrat-600.woff"),
    asset("fonts/inter-500.woff"),
    asset("stock/hero-cabin.jpg"),
  ]);

  const png = await new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a0a", color: "white" }}>
        {/* Cabin photo, fading into the black on its left edge */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 520, display: "flex" }}>
          <img
            src={`data:image/jpeg;base64,${photo.toString("base64")}`}
            width={520}
            height={630}
            style={{ objectFit: "cover" }}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 520,
              height: 630,
              background: "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0) 70%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 780,
            padding: "64px 0 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={`data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`} width={60} height={73} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 40, letterSpacing: 1, lineHeight: 1 }}>
                DHANVIS
              </div>
              <div
                style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 15, letterSpacing: 6, color: "#c8c8c8", marginTop: 8 }}
              >
                ELEVATORS PVT LTD
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Montserrat", fontWeight: 800, fontSize: 66, lineHeight: 1.04, letterSpacing: -2 }}>
            <div>Engineered to lift.</div>
            <div style={{ color: "#a6a6a6" }}>Designed to impress.</div>
            <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 26, letterSpacing: 0, color: "#d4d4d4", marginTop: 26 }}>
              Lift installation &amp; service across Andhra Pradesh
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Inter", fontWeight: 500, fontSize: 24 }}>
            <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, background: "white", color: "#0a0a0a" }}>
              {site.phone}
            </div>
            <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, border: "2px solid rgba(255,255,255,0.3)" }}>
              Free site survey
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: display, weight: 800, style: "normal" },
        { name: "Montserrat", data: displaySemi, weight: 600, style: "normal" },
        { name: "Inter", data: body, weight: 500, style: "normal" },
      ],
    },
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": contentType } });
}
