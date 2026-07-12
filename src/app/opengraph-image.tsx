import { ImageResponse } from "next/og";

import {
  ORGANIZATION_NAME,
  ORGANIZATION_NAME_SHORT,
  SITE_ORGANIZATION_DESCRIPTION_SHORT,
} from "@/lib/site";

export const alt = `${ORGANIZATION_NAME} — 水と森の未来を守る`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * デフォルト OG 画像（1200×630）。
 * 新素材は使わず、既存ブランド文言で生成する（素材差し替えはマスター確認後）。
 */
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
          padding: "64px 72px",
          background: "linear-gradient(145deg, #F7F4EC 0%, #E8F0E3 55%, #D7E8F2 100%)",
          color: "#1F2A24",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.08em",
              color: "#3F6B4A",
              fontWeight: 600,
            }}
          >
            {ORGANIZATION_NAME_SHORT}
          </div>
          <div
            style={{
              fontSize: 54,
              lineHeight: 1.2,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            水と森の未来を守る
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: "#405249",
              maxWidth: 980,
            }}
          >
            {SITE_ORGANIZATION_DESCRIPTION_SHORT}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#5A6B62",
          }}
        >
          <span>{ORGANIZATION_NAME}</span>
          <span>earth-savers.org</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
