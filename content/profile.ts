export interface ProfileDiscipline {
  title: string;
  items: string[];
}

export interface ProfileProject {
  title: string;
  category: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface ExperienceEntry {
  period: string;
  title: string;
  organisation: string;
  summary: string;
}

export const profileDisciplines: ProfileDiscipline[] = [
  {
    title: "Design & production",
    items: ["CorelDRAW", "Figma", "Adobe Creative Suite", "Branding", "Prepress", "Production-ready artwork"],
  },
  {
    title: "Software & web",
    items: ["Python", "TypeScript", "JavaScript", "React", "Next.js", "Flutter", "PyQt6"],
  },
  {
    title: "CNC & manufacturing",
    items: ["CNC preparation", "G-code authoring", "Mach3", "CAD artworking", "Sheet optimisation", "Production supervision"],
  },
  {
    title: "Product delivery",
    items: ["Product architecture", "UI/UX systems", "Git & GitHub", "Vercel", "Release management", "Workflow automation"],
  },
];

export const profileProjects: ProfileProject[] = [
  {
    title: "KerfSuite",
    category: "Production software",
    description: "A growing CNC and fabrication software ecosystem shaped by practical workshop knowledge, product design and engineering.",
    href: "https://kerf-suite.com/",
    external: true,
  },
  {
    title: "MKVoodoo",
    category: "Released desktop application",
    description: "A Windows batch-video transcoder that combines a Flutter interface with Python and FFmpeg processing.",
    href: "/work/mkvoodoo",
  },
  {
    title: "BGrafX",
    category: "Design & web practice",
    description: "The studio site and commercial front door for graphic design, web development and practical automation work.",
    href: "/",
  },
  {
    title: "FontForge",
    category: "Browser tool",
    description: "A privacy-respecting browser utility for practical font conversion, built as part of the BGrafX tools collection.",
    href: "/tools/fontforge",
  },
];

export const experience: ExperienceEntry[] = [
  {
    period: "2025 — Present",
    title: "Founder, Full Stack Developer & Creative Director",
    organisation: "Synontech / BGrafX",
    summary: "Designing, building and releasing software products, responsive websites and digital systems from concept through deployment.",
  },
  {
    period: "2010 — 2025",
    title: "Senior Graphic Designer & CNC Supervisor",
    organisation: "Alania Building Systems",
    summary: "Translated architectural requirements into CNC-ready production files while supporting production, fabrication coordination and technical problem solving.",
  },
  {
    period: "2009 — 2010",
    title: "Lead Graphic Designer & Coordinator",
    organisation: "Launch Group",
    summary: "Led creative output across print, promotional and digital deliverables in a deadline-driven production environment.",
  },
  {
    period: "2003 — 2009",
    title: "Graphic Design, Print & CAD Production",
    organisation: "Early professional roles",
    summary: "Built a foundation in production artwork, sublimation printing, CAD artworking and repeatable manufacturing workflows.",
  },
];
