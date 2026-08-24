import type { MetadataRoute } from "next";

/** Lists Signal's public, indexable routes for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://signal-polymarket-challenge.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://signal-polymarket-challenge.vercel.app/search",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://signal-polymarket-challenge.vercel.app/trending",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
