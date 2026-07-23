import type { MetadataRoute } from "next";
import { getArticles, getServices } from "@/lib/content";

export const revalidate = 86_400;

const baseUrl = "https://profdrmuharremkiskac.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/hakkinda`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/makaleler`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videolar`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const [articles, services] = await Promise.all([
    getArticles(),
    getServices(),
  ]);

  return [
    ...staticRoutes,
    ...articles.map((article) => ({
      url: `${baseUrl}/makaleler/${article.id}`,
      lastModified: article.updatedAt ?? article.createdAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/hizmetler/${service.id}`,
      lastModified: service.updatedAt ?? service.createdAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
