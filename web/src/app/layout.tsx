import type { Metadata } from "next";

import { IconSprite } from "@/components/icon-sprite";

import "./globals.css";

export const metadata: Metadata = {
  title: "POPULOVE 客製化團體服 | 班服、制服、活動服、品牌周邊",
  description:
    "POPULOVE 提供客製化團體服、班服、公司制服、活動 T-Shirt、POLO 衫、帽 T、刺繡與印刷加工服務。",
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
