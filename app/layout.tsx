import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haultime.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og-share.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og-share.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
