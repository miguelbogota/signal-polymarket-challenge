import type { MetadataRoute } from "next";

/** Returns crawler rules and the canonical sitemap location. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://signal-polymarket-challenge.vercel.app/sitemap.xml",
  };
}
