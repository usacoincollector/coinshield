import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coinshieldproducts.com"),
  title: {
    default: "Coin Shield | Premium Coin Storage & Protection Supplies",
    template: "%s | Coin Shield"
  },
  description:
    "Coin Shield manufactures clean, collector-focused coin storage and protection supplies for wholesale buyers and serious dealers.",
  keywords: [
    "Coin Shield",
    "coin storage supplies",
    "coin flips",
    "coin toploaders",
    "wholesale coin supplies",
    "coin storage boxes"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Coin Shield | Premium Coin Storage & Protection Supplies",
    description:
      "Archival-safe, collector-trusted coin storage and protection supplies for long-term preservation.",
    url: "https://www.coinshieldproducts.com",
    siteName: "Coin Shield",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Coin Shield | Premium Coin Storage & Protection Supplies",
    description:
      "Collector-trusted storage and protection supplies built for consistency, presentation, and wholesale fulfillment."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSerif.variable}`}>
      <body className="font-[family-name:var(--font-sans)] text-[var(--foreground)] antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
