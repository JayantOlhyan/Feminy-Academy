import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/content/site";

export const alt = "Feminy Academy by Sunita Rathee";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/feminy-crest-transparent.png"));
  const experienceStat = siteConfig.stats.find((s) => s.id === "experience");
  const studentsStat = siteConfig.stats.find((s) => s.id === "students");
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#fffefb",
          padding: "80px",
          color: "#342b36",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* ImageResponse requires a native image with an embedded source. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="Feminy crest" width={72} height={70} style={{objectFit:"contain"}} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", letterSpacing: "-0.02em" }}>
              Feminy
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#75600f",
                textTransform: "uppercase",
              }}
            >
              ACADEMY
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "20px",
              color: "#75600f",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 600,
            }}
          >
            Beauty courses · Hindi mein · Bahadurgarh
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "bold",
              lineHeight: 1.15,
              color: "#342b36",
              maxWidth: "900px",
            }}
          >
            Beauty ka hunar seekhiye — aur apne naam se kaam shuru kijiye.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            borderTop: "1px solid #e8e1eb",
            paddingTop: "24px",
            width: "100%",
            fontSize: "18px",
            color: "#665c69",
          }}
        >
          <span>
            Sunita Rathee
            {experienceStat?.verified ? ` (${experienceStat.value} saal experience)` : " (Cosmetologist & Mentor)"}
          </span>
          <span>•</span>
          {studentsStat?.verified && (
            <>
              <span>{studentsStat.value} Students trained</span>
              <span>•</span>
            </>
          )}
          <span>Online & Bahadurgarh Academy</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

