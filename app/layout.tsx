import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "travel around — Dein KI-Reiseberater",
  description: "Finde dein perfektes Reiseziel mit persönlicher KI-Beratung. Work & Travel, Backpacking, Sabbatical und mehr.",
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
      </body>
    </html>
  );
}
