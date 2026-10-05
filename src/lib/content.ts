import "server-only";

import { unstable_cache } from "next/cache";
import type { DocumentData } from "firebase-admin/firestore";
import { getAdminDb } from "./firebase-admin";
import type {
  Article,
  ArticleSummary,
  Service,
  Video,
} from "@/types/content";

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function optionalText(value: unknown): string | null {
  const result = text(value).trim();
  return result ? result : null;
}

function isoDate(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString();
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  return null;
}

function imageUrl(data: DocumentData): string | null {
  return optionalText(data.imageUrl) ?? optionalText(data.image);
}

function toArticleSummary(id: string, data: DocumentData): ArticleSummary {
  return {
    id,
    title: text(data.title),
    summary: text(data.summary),
    imageUrl: imageUrl(data),
    createdAt: isoDate(data.createdAt),
    updatedAt: isoDate(data.updatedAt),
  };
}

function toArticle(id: string, data: DocumentData): Article {
  return {
    ...toArticleSummary(id, data),
    content: text(data.content),
    citations: Array.isArray(data.citations)
      ? data.citations.filter((item): item is string => typeof item === "string")
      : [],
  };
}

function toService(id: string, data: DocumentData): Service {
  return {
    id,
    title: text(data.title),
    description: text(data.description),
    imageUrl: imageUrl(data),
    createdAt: isoDate(data.createdAt),
    updatedAt: isoDate(data.updatedAt),
  };
}

function toVideo(id: string, data: DocumentData): Video {
  return {
    id,
    title: text(data.title),
    youtubeId: text(data.youtubeId),
    imageUrl: imageUrl(data),
    createdAt: isoDate(data.createdAt),
    updatedAt: isoDate(data.updatedAt),
  };
}

function newestFirst<T extends { createdAt: string | null }>(items: T[]): T[] {
  return items.sort((a, b) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
  );
}

async function readCollection<T>(
  collectionName: string,
  normalize: (id: string, data: DocumentData) => T,
  fields?: string[],
): Promise<T[]> {
  const db = getAdminDb();
  if (!db) return [];
  const collection = db.collection(collectionName);
  const query = fields ? collection.select(...fields) : collection;
  const snapshot = await query.get();
  return snapshot.docs.map((document) =>
    normalize(document.id, document.data()),
  );
}

export const getArticles = unstable_cache(
  async () =>
    newestFirst(
      await readCollection("articles", toArticleSummary, [
        "title",
        "summary",
        "imageUrl",
        "image",
        "createdAt",
        "updatedAt",
      ]),
    ),
  ["articles"],
  { revalidate: 3600, tags: ["articles"] },
);

export const getServices = unstable_cache(
  async () => newestFirst(await readCollection("services", toService)),
  ["services"],
  { revalidate: 3600, tags: ["services"] },
);

export const getVideos = unstable_cache(
  async () => newestFirst(await readCollection("videos", toVideo)),
  ["videos"],
  { revalidate: 3600, tags: ["videos"] },
);

const getArticleById = (id: string) =>
  unstable_cache(
    async () => {
      const db = getAdminDb();
      if (!db) return null;
      const document = await db.collection("articles").doc(id).get();
      return document.exists ? toArticle(document.id, document.data()!) : null;
    },
    ["article", id],
    { revalidate: 3600, tags: ["articles"] },
  )();

// Yalnız listede bulunan id'ler sorgulanır; rastgele id'ler önbellek kaydı
// oluşturmaz ve "/" içeren id'ler doc() çağrısına ulaşmaz.
export async function getArticle(id: string): Promise<Article | null> {
  const articles = await getArticles();
  if (!articles.some((article) => article.id === id)) return null;
  return getArticleById(id);
}

export async function getService(id: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((service) => service.id === id) ?? null;
}
