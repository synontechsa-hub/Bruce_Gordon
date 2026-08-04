import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://www.bgrafx.co.za", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://www.bgrafx.co.za/work", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.bgrafx.co.za/work/kerfsuite", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.bgrafx.co.za/cladding", lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];
}