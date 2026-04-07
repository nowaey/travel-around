import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f766e, #0891b2)",
          borderRadius: 8,
        }}
      >
        <span style={{ fontSize: 20, color: "white", fontWeight: 800 }}>t</span>
      </div>
    ),
    { ...size }
  );
}
