import type { MetadataRoute } from "next";
import { getArticles, getServices } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

// Build anında prerender edilmez: build ortamında Firebase bilgileri yoksa
// site haritası makale ve hizmetler olmadan donmasın. Veri unstable_cache
// (300 sn) üzerinden geldiği için istek başına Firestore okuması yapılmaz.
export const dynamic = "force-dynamic";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticRoutes: [string, ChangeFrequency, number][] = [
  ["", "weekly", 1],
  ["/hakkinda", "monthly", 0.8],
  ["/hizmetler", "weekly", 0.8],
  ["/makaleler", "weekly", 0.8],
  ["/videolar", "weekly", 0.7],
  ["/iletisim", "yearly", 0.6],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, services] = await Promise.all([
    getArticles(),
    getServices(),
  ]);

  return [
    ...staticRoutes.map(([path, changeFrequency, priority]) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/makaleler/${article.id}`,
      lastModified: article.updatedAt ?? article.createdAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/hizmetler/${service.id}`,
      lastModified: service.updatedAt ?? service.createdAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
