import "server-only";

import { unstable_cache } from "next/cache";
import type { DocumentData } from "firebase-admin/firestore";
import { getAdminDb } from "./firebase-admin";
import type { Article, Service, Video } from "@/types/content";

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

function toArticle(id: string, data: DocumentData): Article {
  return {
    id,
    title: text(data.title),
    summary: text(data.summary),
    content: text(data.content),
    citations: Array.isArray(data.citations)
      ? data.citations.filter((item): item is string => typeof item === "string")
      : [],
    imageUrl: imageUrl(data),
    createdAt: isoDate(data.createdAt),
    updatedAt: isoDate(data.updatedAt),
  };
}

function toService(id: string, data: DocumentData): Service {
  return {
    id,
    title: text(data.title),
    description: text(data.description),
    icon: optionalText(data.icon),
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
  return items.sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime(),
  );
}

async function readCollection<T>(
  collectionName: string,
  normalize: (id: string, data: DocumentData) => T,
): Promise<T[]> {
  const db = getAdminDb();
  if (!db) return [];
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((document) =>
    normalize(document.id, document.data()),
  );
}

export const getArticles = unstable_cache(
  async () => newestFirst(await readCollection("articles", toArticle)),
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

export async function getArticle(id: string): Promise<Article | null> {
  return unstable_cache(
    async () => {
      const db = getAdminDb();
      if (!db) return null;
      const document = await db.collection("articles").doc(id).get();
      return document.exists ? toArticle(document.id, document.data()!) : null;
    },
    ["article", id],
    { revalidate: 3600, tags: ["articles", `article:${id}`] },
  )();
}

export async function getService(id: string): Promise<Service | null> {
  return unstable_cache(
    async () => {
      const db = getAdminDb();
      if (!db) return null;
      const document = await db.collection("services").doc(id).get();
      return document.exists ? toService(document.id, document.data()!) : null;
    },
    ["service", id],
    { revalidate: 3600, tags: ["services", `service:${id}`] },
  )();
}
