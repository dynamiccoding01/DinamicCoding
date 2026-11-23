import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/site";

// Una sola landing: el sitio tiene una única URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${base}/`, lastModified: new Date(), priority: 1 }];
}
