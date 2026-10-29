import type { MetadataRoute } from "next";
import { getArticles, getServices, getVideos } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import type { ArticleSummary, Service } from "@/types/content";

// Build anında prerender edilmez: build ortamında Firebase bilgileri yoksa
// site haritası makale ve hizmetler olmadan donmasın. Veri unstable_cache
// (300 sn) üzerinden geldiği için istek başına Firestore okuması yapılmaz.
// readOrEmpty okuma hatasında boş liste döndürdüğü için bu dosya revalidate ile
// ISR'a alınmaz: boş liste yenileme süresince önbellekte kalırdı.
export const dynamic = "force-dynamic";

// changefreq/priority Google tarafından yok sayıldığı için üretilmez.
const staticRoutes = [
  "",
  "/hakkinda",
  "/hizmetler",
  "/makaleler",
  "/iletisim",
  "/gizlilik",
];

// Okuma hatası site haritasını 500'e çevirmesin: hata kaydedilir ve o koleksiyon
// boş kabul edilerek statik rotalar döndürülür.
async function readOrEmpty<T>(label: string, read: () => Promise<T[]>): Promise<T[]> {
  try {
    return await read();
  } catch (error) {
    console.error(`Site haritası için ${label} okunamadı:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, services] = await Promise.all([
    readOrEmpty<ArticleSummary>("makaleler", getArticles),
    readOrEmpty<Service>("hizmetler", getServices),
  ]);
  // Video sayfası boşken haritaya eklenmez: boş sayfa dizine girmesin.
  const videos = await readOrEmpty("videolar", getVideos);

  return [
    ...staticRoutes.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...(videos.length > 0 ? [{ url: `${SITE_URL}/videolar` }] : []),
    ...articles.map((article) => ({
      url: `${SITE_URL}/makaleler/${article.id}`,
      lastModified: article.updatedAt ?? article.createdAt ?? undefined,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/hizmetler/${service.id}`,
      lastModified: service.updatedAt ?? service.createdAt ?? undefined,
    })),
  ];
}
