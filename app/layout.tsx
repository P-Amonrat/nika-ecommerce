import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const bodyFont = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NIKA - E-Commerce Store",
  description: "Modern e-commerce platform with Thai and English support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bodyFont.variable}>
      <body>{children}</body>
    </html>
  );
}
