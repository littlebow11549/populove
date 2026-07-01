import type { Metadata, Viewport } from "next";

import { IconSprite } from "@/components/icon-sprite";

import "./globals.css";

const SITE_URL = "https://populove.org";
const TITLE = "POPULOVE 客製化團體服 | 班服、制服、活動服、品牌周邊";
const DESCRIPTION =
  "POPULOVE 提供客製化團體服、班服、公司制服、活動 T-Shirt、POLO 衫、帽 T、刺繡與印刷加工服務，從挑款、圖稿、估價到交件都有專人協助。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | POPULOVE 客製化團體服",
  },
  description: DESCRIPTION,
  applicationName: "POPULOVE",
  keywords: [
    "客製化團體服",
    "團體服",
    "班服",
    "公司制服",
    "活動服",
    "T恤",
    "POLO衫",
    "帽T",
    "刺繡",
    "印刷",
    "DTF 轉印",
    "品牌周邊",
    "POPULOVE",
  ],
  authors: [{ name: "POPULOVE" }],
  creator: "POPULOVE",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_URL,
    siteName: "POPULOVE 客製化團體服",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/banners/banner-populove-fashion.png",
        alt: "POPULOVE 客製化團體服",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/banners/banner-populove-fashion.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: { url: "/brand/populove-bear.svg", type: "image/svg+xml" },
    apple: "/brand/populove-bear.svg",
  },
  // 關閉 iOS 自動把電話/日期/時間/地址變成藍色連結。
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

// 宣告原生深色，避免瀏覽器自動深色模式二次調色。
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0d0d0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="antialiased">
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
