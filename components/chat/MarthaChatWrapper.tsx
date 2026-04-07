"use client";

import dynamic from "next/dynamic";

const MarthaChat = dynamic(() => import("@/components/chat/MarthaChat"), {
  ssr: false,
});

export default function MarthaChatWrapper() {
  return <MarthaChat />;
}
