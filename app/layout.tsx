import type { Metadata } from "next";
import "@fontsource/barlow-condensed/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { AlyssaAssistant } from "@/components/assistant/AlyssaAssistant";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bgrafx.co.za"),
  title: "Bruce Gordon | Graphic Design, Web & Automation",
  description: "BGrafX is the independent South African studio of Bruce Gordon, creating graphic design, branding, responsive websites and practical automation.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: "BGrafX",
    title: "Bruce Gordon | Design That Gets Noticed",
    description: "Graphic design, websites and practical digital systems - built with 22+ years of creative experience.",
    images: [{ url: "/og-bgrafx-v2.png", width: 1200, height: 630, alt: "BGrafX - Design that gets noticed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruce Gordon | Design That Gets Noticed",
    description: "Graphic design, websites and practical digital systems by BGrafX.",
    images: ["/og-bgrafx-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        <GoogleTagManager />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
        <AlyssaAssistant />
      </body>
    </html>
  );
}