import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth-Led Product — Continuous Viral Growth in the Age of AI",
  description:
    "Growth-Led Product is more than a framework — it's a philosophy, a methodology, and a movement. The roadmap from product-first to ecosystem-first.",
  openGraph: {
    title: "Growth-Led Product",
    description: "Continuous Viral Growth in the Age of AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
