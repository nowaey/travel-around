import type { Metadata } from "next";
import "./globals.css";
import MarthaChat from "@/components/chat/MarthaChat";

export const metadata: Metadata = {
  title: "travel around — Gap Year Beraterin Martha",
  description: "Plane dein Gap Year mit KI-Beraterin Martha. Au pair, Work & Travel, Freiwilligenarbeit und mehr — persönliche Empfehlungen in Minuten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-stone-50 text-stone-900 antialiased">
        {children}
        <MarthaChat />
      </body>
    </html>
  );
}
