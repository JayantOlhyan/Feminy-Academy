import { ImageResponse } from "next/og";

export const alt = "Feminy Academy by Sunita Rathee";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#161314",
          padding: "80px",
          color: "#F2EFEC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#7A1F3D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F2EFEC",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            F
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", letterSpacing: "-0.02em" }}>
              Feminy
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#B8915A",
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
              color: "#B8915A",
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
              color: "#FFFFFF",
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
            borderTop: "1px solid #332D2F",
            paddingTop: "24px",
            width: "100%",
            fontSize: "18px",
            color: "#B9B0AC",
          }}
        >
          <span>Sunita Rathee (15+ saal experience)</span>
          <span>•</span>
          <span>150+ Students trained</span>
          <span>•</span>
          <span>Online & Bahadurgarh Academy</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

