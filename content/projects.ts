export interface WebsiteProject {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: "Self-initiated concept";
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  showcasePath: string;
}

export interface LiveProperty {
  title: string;
  category: string;
  summary: string;
  href: string;
  cta: string;
  external?: boolean;
}

export interface CladdingProject {
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const websiteProjects: WebsiteProject[] = [
  { slug: "forma-studio", title: "Forma Studio", category: "Architecture / Editorial web", summary: "A restrained, image-led architecture studio concept built around strong hierarchy, generous space and project storytelling.", status: "Self-initiated concept", image: "/media/forma.jpg", imageAlt: "Forma Studio architecture website concept", showcasePath: "/showcase/forma-studio/index.html" },
  { slug: "solstice-goods", title: "Solstice Goods", category: "E-commerce / UX", summary: "A warm lifestyle-commerce concept exploring product discovery, brand atmosphere and a calm responsive shopping journey.", status: "Self-initiated concept", image: "/media/solstice.jpg", imageAlt: "Solstice Goods e-commerce website concept", showcasePath: "/showcase/solstice-goods/index.html" },
  { slug: "vela-wealth", title: "Vela Wealth", category: "Fintech / Interface", summary: "A financial-services interface study balancing data clarity, trust and a composed premium visual system.", status: "Self-initiated concept", image: "/media/vela.jpg", imageAlt: "Vela Wealth financial website and interface concept", showcasePath: "/showcase/vela-wealth/index.html" },
  { slug: "nexus-ai", title: "Nexus AI", category: "SaaS / Product web", summary: "A multi-page AI product website exploring conversion structure, documentation, pricing and a scalable interface language.", status: "Self-initiated concept", image: "/media/work/nexus-ai.webp", imageAlt: "NexusAI enterprise intelligence homepage concept with analytics dashboard interface", showcasePath: "/showcase/nexus-ai/index.html" },
  { slug: "cape-and-blade", title: "Cape & Blade", category: "Barbershop / Brand web", summary: "A character-led identity and website concept combining local personality with a direct service-booking experience.", status: "Self-initiated concept", image: "/media/cape-and-blade.jpg", imageAlt: "Cape and Blade barbershop identity and website concept", showcasePath: "/showcase/cape-and-blade/index.html" },
  { slug: "onyx-and-ivy", title: "Onyx & Ivy", category: "Floral studio / Identity", summary: "A refined floral-studio concept using a monochrome identity, elegant pacing and an editorial digital presence.", status: "Self-initiated concept", image: "/media/work/onyx-and-ivy.png", imageAlt: "Onyx and Ivy floral studio identity", imageFit: "contain", showcasePath: "/showcase/onyx-and-ivy/index.html" },
  { slug: "veloce-systems", title: "Veloce Systems", category: "SaaS / Fintech UI", summary: "A high-precision technology brand and interface study built around speed, structure and confident technical typography.", status: "Self-initiated concept", image: "/media/work/veloce-systems.png", imageAlt: "Veloce Systems technology identity", imageFit: "contain", showcasePath: "/showcase/veloce-systems/index.html" },
  { slug: "origin-root", title: "Origin Root", category: "Specialty coffee / Brand web", summary: "A coffee brand and website exploration connecting provenance, tactile materials and a distinctive retail personality.", status: "Self-initiated concept", image: "/media/work/origin-root.png", imageAlt: "Origin Root specialty coffee identity", imageFit: "contain", showcasePath: "/showcase/origin-root/index.html" },
  { slug: "swiftpath-logistics", title: "SwiftPath Logistics", category: "Logistics / B2B web", summary: "A globally minded logistics concept focused on clear service navigation, operational confidence and straightforward lead generation.", status: "Self-initiated concept", image: "/media/work/swiftpath-logistics.webp", imageAlt: "SwiftPath Logistics homepage concept with global freight tracking interface", showcasePath: "/showcase/swiftpath-logistics/index.html" },
  { slug: "timbercraft-wholesale", title: "TimberCraft Wholesale", category: "Wholesale / Trade utility", summary: "An earthy B2B timber website combining product discovery, sustainable sourcing and a practical volume-calculation tool.", status: "Self-initiated concept", image: "/media/work/timbercraft-wholesale.webp", imageAlt: "TimberCraft Wholesale homepage concept for sustainable architectural timber", showcasePath: "/showcase/timbercraft-wholesale/index.html" },
  { slug: "aura-and-echo", title: "Aura & Echo", category: "Luxury audio / Product web", summary: "A high-end audio concept built around immersive typography, premium product presentation and a quiet sense of technical precision.", status: "Self-initiated concept", image: "/media/work/aura-and-echo.webp", imageAlt: "Aura and Echo luxury audio homepage concept featuring premium headphones", showcasePath: "/showcase/aura-and-echo/index.html" },
  { slug: "lumina-marketing", title: "Lumina Marketing", category: "Marketing / Growth agency", summary: "A performance-led agency concept combining bold branding, paid-media positioning and strategic narrative design.", status: "Self-initiated concept", image: "/media/work/lumina-marketing.webp", imageAlt: "Lumina Marketing growth agency homepage concept with bold gradient typography", showcasePath: "/showcase/lumina-marketing/index.html" },
];

export const liveProperties: LiveProperty[] = [
  { title: "KerfSuite", category: "Production software", summary: "A practical software suite for CNC and fabrication workflows, developed as part of the broader Synontech product ecosystem.", href: "https://kerf-suite.com/", cta: "Visit website", external: true },
  { title: "MKVoodoo", category: "Desktop media utility", summary: "A released Windows batch video transcoder combining product identity, Flutter interface design and a Python/FFmpeg processing engine.", href: "/work/mkvoodoo", cta: "View product story" },
  { title: "Synontech", category: "Software studio", summary: "The technology studio behind independent software, automation and digital product work.", href: "https://synontech.vercel.app/", cta: "Visit website", external: true },
  { title: "Byte This Games", category: "Independent games", summary: "An independent game-development label and creative outlet for interactive projects.", href: "https://byte-this-games.vercel.app/", cta: "Visit website", external: true },
];

export const claddingProjects: CladdingProject[] = [
  { title: "Sandton City Tower", location: "Johannesburg, Gauteng", description: "External facade elements formed as lightning-bolt profiles, cut from 2 mm solid aluminium and powder coated across four matched colours.", image: "/media/cladding/sandton-city.webp", imageAlt: "Sandton City Tower facade with coloured aluminium lightning-bolt cladding" },
  { title: "Telesure Head Office", location: "Steyn City, Johannesburg", description: "Precision-routed composite panels, architectural cladding and illuminated corporate branding within a coordinated facade package.", image: "/media/cladding/telesure.webp", imageAlt: "Telesure Head Office architectural facade and corporate signage" },
  { title: "15 Alice Lane", location: "Sandton, Johannesburg", description: "Exterior facade panels and custom architectural accents prepared through precision CNC cutting and production-aware detailing.", image: "/media/cladding/15-alice-lane.webp", imageAlt: "15 Alice Lane exterior architectural cladding" },
  { title: "BCX Headquarters", location: "Midrand, Gauteng", description: "Bespoke three-dimensional metal signage, routed wall features and powder-coated exterior architectural elements.", image: "/media/cladding/bcx-head-office.webp", imageAlt: "BCX headquarters exterior facade and dimensional signage" },
  { title: "Gateway West & PwC", location: "Waterfall City, Midrand", description: "Large-format exterior cladding and precision sheet-metal fabrication delivered as part of a premium architectural finish.", image: "/media/cladding/gateway-west-pwc.webp", imageAlt: "Gateway West and PwC towers with large-format exterior cladding" },
];
