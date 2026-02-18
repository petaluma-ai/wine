import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wine.petaluma.ai"),
  title: "Luma for Wine | Petaluma AI",
  description:
    "Luma is an AI business operator for wineries. Start with a free AI Impact Audit from Petaluma AI.",
  openGraph: {
    title: "Luma for Wine | Petaluma AI",
    description:
      "Your winery runs on tools that do not talk to each other. Luma connects the work and gives you your day in one briefing.",
    url: "https://wine.petaluma.ai",
    siteName: "Luma for Wine",
    type: "website",
    images: [
      {
        url: "/petal-mark.png",
        width: 496,
        height: 287,
        alt: "Luma by Petaluma AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luma for Wine | Petaluma AI",
    description:
      "A business operator built for wineries. See what Luma can do with a free AI Impact Audit.",
    images: ["/petal-mark.png"],
  },
  icons: {
    icon: "/petal-mark.png",
    apple: "/petal-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
