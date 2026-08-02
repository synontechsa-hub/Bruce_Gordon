import type { Metadata } from "next";
import "@fontsource/barlow-condensed/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bgrafx.co.za"),
  title: "Bruce Gordon | Design That Gets Noticed",
  description: "Graphic design, branding, responsive websites and practical digital solutions by Bruce Gordon in South Africa.",
  icons: { icon: "/favicon.svg" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
