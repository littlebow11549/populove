import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 允許 next/image 服務自家的 SVG（logo、圖示），以 sandbox 確保安全。
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
