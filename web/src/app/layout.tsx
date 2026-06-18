import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POPULOVE｜重構基礎（P0）",
  description: "POPULOVE 客製化團體服網站重構專案的前端基礎建設。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
