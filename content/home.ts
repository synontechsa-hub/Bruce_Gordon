import type { LucideIcon } from "lucide-react";
import { Bot, Brush, MonitorUp, Palette, Printer } from "lucide-react";

export interface ServicePreview {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeaturedStudy {
  title: string;
  category: string;
  status: "Self-initiated concept";
  image: string;
  imageAlt: string;
}

export const services: ServicePreview[] = [
  {
    title: "Graphic design",
    description: "Branding, print, campaign artwork and everyday design that makes the message easier to notice.",
    icon: Brush,
  },
  {
    title: "Web design",
    description: "Responsive websites shaped around clear communication, strong presentation and straightforward action.",
    icon: MonitorUp,
  },
  {
    title: "Automation",
    description: "Practical workflows and digital tools designed to reduce repetitive work and improve consistency.",
    icon: Bot,
  },
  {
    title: "Branding",
    description: "Identity systems, logos and visual direction built to give a business a confident, cohesive presence.",
    icon: Palette,
  },
  {
    title: "Signage & production",
    description: "Production-aware design for signage, displays, large-format graphics and fabrication handoff.",
    icon: Printer,
  },
];

export const featuredStudies: FeaturedStudy[] = [
  {
    title: "Forma Studio",
    category: "Architecture / Web",
    status: "Self-initiated concept",
    image: "/media/forma.jpg",
    imageAlt: "Forma Studio architectural website concept displayed on a dark editorial layout",
  },
  {
    title: "Solstice Goods",
    category: "E-commerce / UX",
    status: "Self-initiated concept",
    image: "/media/solstice.jpg",
    imageAlt: "Solstice Goods e-commerce concept with warm product photography and interface design",
  },
  {
    title: "Vela Wealth",
    category: "Fintech / Interface",
    status: "Self-initiated concept",
    image: "/media/vela.jpg",
    imageAlt: "Vela Wealth financial interface concept shown across desktop and mobile screens",
  },
  {
    title: "Cape & Blade",
    category: "Identity / Web",
    status: "Self-initiated concept",
    image: "/media/cape-and-blade.jpg",
    imageAlt: "Cape and Blade barbershop identity and mobile website concept",
  },
];
