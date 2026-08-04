import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BGrafX v2 | Design Foundation",
  description: "The approved visual foundation for the BGrafX v2 portfolio.",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
