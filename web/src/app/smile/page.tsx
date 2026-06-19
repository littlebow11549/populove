import type { Metadata } from "next";

import { SmileApp } from "@/features/smile/smile-app";

export const metadata: Metadata = {
  title: "你今天 Populove 了沒?",
  description: "每天看一張迷因圖，替自己補一點微笑能量。",
};

export default function SmilePage() {
  return <SmileApp />;
}
