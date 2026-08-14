import type { LucideIcon } from "lucide-react";
import { Bot, Brush, MonitorUp, Palette, Printer } from "lucide-react";

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  heading: string;
  shortDescription: string;
  body: string[];
  capabilities: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  relatedLink?: { label: string; href: string };
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: "graphic-design",
    number: "01",
    title: "Graphic design",
    eyebrow: "Communication with intent",
    heading: "Design that earns a second look.",
    shortDescription: "Branding, print, campaign artwork and everyday design that makes the message easier to notice.",
    body: [
      "From campaign artwork and marketing collateral to everyday communication pieces, BGrafX creates work that communicates quickly and remains effective across its final medium.",
      "Design decisions are made with the finished application in mind, whether the work is destined for print, digital channels, presentation, advertising or production.",
    ],
    capabilities: ["Marketing and promotional material", "Campaign artwork", "Print and digital collateral", "Layout and publication design", "Presentation graphics", "Print-ready artwork", "Production preparation", "Ongoing design support"],
    ctaLabel: "Start a graphic design project",
    ctaHref: "mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20graphic%20design%20project",
    icon: Brush,
    image: "/media/work/origin-root.png",
    imageAlt: "Origin Root identity and packaging concept demonstrating BGrafX graphic design direction",
  },
  {
    id: "web-design",
    number: "02",
    title: "Web design",
    eyebrow: "Presentation that performs",
    heading: "Websites built around clarity and action.",
    shortDescription: "Responsive websites shaped around clear communication, strong presentation and straightforward action.",
    body: [
      "BGrafX designs and builds responsive websites that balance strong presentation with practical usability.",
      "Because design and implementation happen within the same workflow, the final build can remain faithful to the original creative direction while still being responsive, fast and straightforward to use.",
    ],
    capabilities: ["Custom responsive websites", "Landing pages", "Portfolio websites", "Business websites", "Interface and UX design", "Front-end development", "Website refreshes", "Ongoing improvements and support"],
    ctaLabel: "Discuss a website",
    ctaHref: "mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20website%20project",
    icon: MonitorUp,
    image: "/media/work/lumina-marketing.webp",
    imageAlt: "Lumina Marketing responsive website concept demonstrating BGrafX web design capability",
    relatedLink: { label: "View the website portfolio", href: "/work" },
  },
  {
    id: "automation",
    number: "03",
    title: "Automation",
    eyebrow: "Practical digital systems",
    heading: "Less repetitive work. Better systems.",
    shortDescription: "Practical workflows and digital tools designed to reduce repetitive work and improve consistency.",
    body: [
      "BGrafX develops practical digital tools and workflow improvements for businesses that rely on repetitive manual processes.",
      "The approach is informed by 14 years leading CNC production workflows: technology should reduce unnecessary work, improve consistency and fit the way the business actually operates.",
    ],
    capabilities: ["Workflow automation", "Custom internal tools", "Repetitive task automation", "Data processing utilities", "Integration between existing workflows", "Small business software", "Process improvement", "AI-assisted workflow solutions where appropriate"],
    ctaLabel: "Talk about an automation problem",
    ctaHref: "mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20automation%20project",
    icon: Bot,
    image: "/media/kerfsuite/workshop.jpg",
    imageAlt: "CNC laser cutting in a workshop, representing practical automation and production workflows",
    relatedLink: { label: "Read the KerfSuite case study", href: "/work/kerfsuite" },
  },
  {
    id: "branding",
    number: "04",
    title: "Branding",
    eyebrow: "Identity with structure",
    heading: "An identity that holds together.",
    shortDescription: "Identity systems, logos and visual direction built to give a business a confident, cohesive presence.",
    body: [
      "BGrafX develops identity systems designed to remain recognisable and consistent across real applications.",
      "The focus is not only the logo. Colour, typography, supporting elements, layout behaviour and practical usage all contribute to a brand that can remain coherent as the business grows.",
    ],
    capabilities: ["Logo design", "Brand identity systems", "Colour systems", "Typography systems", "Supporting visual assets", "Brand guidelines", "Marketing applications", "Digital and print brand rollout"],
    ctaLabel: "Start a branding project",
    ctaHref: "mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20branding%20project",
    icon: Palette,
    image: "/media/work/onyx-and-ivy.png",
    imageAlt: "Onyx and Ivy identity concept demonstrating a cohesive BGrafX brand system",
  },
  {
    id: "signage-production",
    number: "05",
    title: "Signage & production",
    eyebrow: "Experience beyond the screen",
    heading: "Design that survives the fabrication floor.",
    shortDescription: "Production-aware design for signage, displays, large-format graphics and fabrication handoff.",
    body: [
      "BGrafX brings 14 years of CNC production workflow leadership into signage, large-format graphics and fabrication-ready artwork.",
      "The work is developed with real output constraints in mind so that what gets approved on screen can translate cleanly into print, signage, display, cladding or fabrication.",
    ],
    capabilities: ["Signage design", "Large-format graphics", "Display and exhibition graphics", "Production-ready artwork", "Fabrication handoff", "CNC-aware design", "Cladding and architectural graphic applications", "Pre-production file checking"],
    ctaLabel: "Discuss a production project",
    ctaHref: "mailto:bruce.gordon8403@gmail.com?subject=BGrafX%20signage%20and%20production%20project",
    icon: Printer,
    image: "/media/cladding/15-alice-lane.webp",
    imageAlt: "Architectural cladding installation at 15 Alice Lane demonstrating BGrafX production experience",
    relatedLink: { label: "Explore the cladding archive", href: "/cladding" },
  },
];
