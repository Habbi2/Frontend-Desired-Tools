import { getAllTools, type ToolMeta } from "../lib/tools";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://frontend-tools.site/";
  const tools: ToolMeta[] = await getAllTools();
  const now = new Date().toISOString();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: base + "/about", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...tools.map((t) => ({
      url: `${base}/tools/${t.id}`,
      lastModified: t.updated || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
