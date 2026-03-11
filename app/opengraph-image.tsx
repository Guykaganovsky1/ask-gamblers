import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Ask Gamblers - מדריך קזינו בישראל 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    path.join(process.cwd(), "public/Ask_Gamblers_Logo.png")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoData.buffer as unknown as string}
            width={420}
            height={315}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Domain */}
        <span style={{ display: "flex", fontFamily: "sans-serif", fontSize: "22px", color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>
          askgamblers.co.il
        </span>
      </div>
    ),
    { ...size }
  );
}
