import type { Metadata } from "next";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { FontForgeApp } from "@/components/fontforge/FontForgeApp";

export const metadata: Metadata = {
  title: "FontForge | In-Browser Font Converter | BGrafX",
  description:
    "Convert TTF, OTF, WOFF, and WOFF2 inputs to TTF, WOFF, or WOFF2 directly inside your browser, with a live specimen preview.",
  alternates: { canonical: "/tools/fontforge" },
  openGraph: {
    title: "FontForge — Free In-Browser Font Converter | BGrafX",
    description:
      "Client-side conversion from TTF, OTF, WOFF, and WOFF2 inputs to TTF, WOFF, or WOFF2. Your font files stay on your device.",
    url: "/tools/fontforge",
    images: ["/og-bgrafx-v2.png"],
  },
};

export default function FontForgePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BGrafX FontForge",
    url: "https://www.bgrafx.co.za/tools/fontforge",
    description:
      "A client-side font converter accepting TTF, OTF, WOFF, and WOFF2 inputs and producing TTF, WOFF, or WOFF2 downloads with live specimen testing and zero server uploads.",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with WebAssembly support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Bruce Gordon",
      url: "https://www.bgrafx.co.za",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHeader />
      <FontForgeApp />
      <SiteFooter />
    </div>
  );
}
