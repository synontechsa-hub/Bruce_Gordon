import type { Metadata } from "next";
import { HomeHeader } from "@/components/site-header/HomeHeader";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { FontForgeApp } from "@/components/fontforge/FontForgeApp";

export const metadata: Metadata = {
  title: "FontForge | In-Browser Font Converter (TTF, OTF, WOFF, WOFF2) | BGrafX",
  description:
    "Convert fonts directly inside your browser with BGrafX FontForge. 100% private client-side font conversion between TTF, OTF, WOFF, and WOFF2 with live specimen preview.",
  alternates: { canonical: "/tools/fontforge" },
  openGraph: {
    title: "FontForge — Free In-Browser Font Converter | BGrafX",
    description:
      "Fast, client-side font conversion between TTF, OTF, WOFF, and WOFF2. Your font files stay on your device.",
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
      "A fast, 100% client-side web font converter supporting TTF, OTF, WOFF, and WOFF2 formats with live specimen testing and zero server uploads.",
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
