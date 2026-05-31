import { ImageResponse } from "next/og";

const brand = "Agent Team for Founders";
const tagline = "You just talk, we handle the rest";

export const alt = `${brand} - ${tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f8fa",
        color: "#171717",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "72px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #dfe3e8",
          borderRadius: "24px",
          background: "#ffffff",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          <span>{brand}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              maxWidth: "880px",
              fontSize: "86px",
              fontWeight: 800,
              lineHeight: 0.96,
            }}
          >
            {brand}
          </div>
          <div
            style={{
              maxWidth: "760px",
              color: "#4b5563",
              fontSize: "38px",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
