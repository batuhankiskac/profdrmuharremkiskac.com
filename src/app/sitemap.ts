import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

// Dinamik olarak oluşturulmasını zorluyoruz, böylece Firebase verilerini her istekte veya belirli aralıklarla tazeleyebilir
export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 saatte bir yenile (opsiyonel, force-dynamic ile birlikte kullanımı değişebilir ama Vercel için faydalıdır)

const baseUrl = 'https://profdrmuharremkiskac.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statik Sayfalar
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkinda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/makaleler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videolar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // Check if Firebase config is valid before attempting to fetch
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn('Firebase API Key missing (likely during build). Skipping dynamic sitemap generation.');
    return sitemapData;
  }

  try {
    // 1. Makaleleri çek ve ekle
    const articlesSnapshot = await getDocs(collection(db, 'articles'));
    articlesSnapshot.forEach((doc) => {
      sitemapData.push({
        url: `${baseUrl}/makaleler/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // 2. Videoları çek ve ekle
    const videosSnapshot = await getDocs(collection(db, 'videos'));
    videosSnapshot.forEach((doc) => {
      sitemapData.push({
        url: `${baseUrl}/videolar/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // 3. Hizmetleri çek ve ekle
    const servicesSnapshot = await getDocs(collection(db, 'services'));
    servicesSnapshot.forEach((doc) => {
      sitemapData.push({
        url: `${baseUrl}/hizmetler/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error('Sitemap dinamik URL getirme hatası:', error);
    // Hata olursa en azından statik sayfaları döndürmeye devam et
  }

  return sitemapData;
}
