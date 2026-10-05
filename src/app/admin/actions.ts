"use server";

import { FieldValue, type DocumentData } from "firebase-admin/firestore";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  deleteImage,
  uploadImage,
  validateImageFile,
  type UploadedImage,
} from "@/lib/uploads";
import { extractYoutubeId } from "@/lib/youtube";

export type FormState = { error?: string };

type Collection = "services" | "articles" | "videos";

// Kullanıcıya gösterilmesi güvenli hata mesajları.
class FormError extends Error {}

const FIELD_LABELS: Record<string, string> = {
  title: "Başlık",
  description: "Açıklama",
  summary: "Özet",
  content: "İçerik",
  url: "YouTube URL'si",
};

const NOT_FOUND: Record<Collection, string> = {
  services: "Hizmet bulunamadı.",
  articles: "Makale bulunamadı.",
  videos: "Video bulunamadı.",
};

function requiredText(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new FormError(`${FIELD_LABELS[name] ?? name} alanı zorunludur.`);
  }
  return value.trim().slice(0, maxLength);
}

function optionalLines(formData: FormData, name: string, maxLength: number): string[] {
  const value = formData.get(name);
  if (typeof value !== "string") return [];
  return value
    .slice(0, maxLength)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function selectedFile(formData: FormData): File | null {
  const value = formData.get("image");
  return value instanceof File && value.size > 0 ? value : null;
}

function database() {
  const db = getAdminDb();
  if (!db) throw new FormError("Firebase Admin veritabanı yapılandırması eksik.");
  return db;
}

function currentImage(data: DocumentData) {
  return {
    imageUrl:
      typeof data.imageUrl === "string"
        ? data.imageUrl
        : typeof data.image === "string"
          ? data.image
          : null,
    imagePath: typeof data.imagePath === "string" ? data.imagePath : null,
  };
}

function errorState(error: unknown): FormState {
  if (error instanceof FormError) return { error: error.message };
  console.error("Admin işlemi başarısız:", error);
  return { error: "İşlem tamamlanamadı. Lütfen tekrar deneyin." };
}

const serviceFields = (formData: FormData) => ({
  title: requiredText(formData, "title", 160),
  description: requiredText(formData, "description", 20_000),
});

const articleFields = (formData: FormData) => ({
  title: requiredText(formData, "title", 200),
  summary: requiredText(formData, "summary", 600),
  content: requiredText(formData, "content", 100_000),
  citations: optionalLines(formData, "citations", 20_000),
});

const videoFields = (formData: FormData) => {
  const title = requiredText(formData, "title", 200);
  const youtubeId = extractYoutubeId(requiredText(formData, "url", 500));
  if (!youtubeId) throw new FormError("Geçerli bir YouTube URL'si girin.");
  return { title, youtubeId };
};

async function saveContent(
  collection: Collection,
  id: string | null,
  formData: FormData,
  readFields: (formData: FormData) => DocumentData,
  redirectTo: string,
): Promise<FormState> {
  try {
    // Tüm alanlar, görsel yüklenmeden önce doğrulanır.
    const fields = readFields(formData);
    const image = selectedFile(formData);
    const invalidImage = image && validateImageFile(image);
    if (invalidImage) throw new FormError(invalidImage);

    const db = database();
    const reference = id
      ? db.collection(collection).doc(id)
      : db.collection(collection).doc();
    let previous: ReturnType<typeof currentImage> | null = null;
    if (id) {
      const snapshot = await reference.get();
      if (!snapshot.exists) throw new FormError(NOT_FOUND[collection]);
      previous = currentImage(snapshot.data()!);
    }

    const uploaded: UploadedImage | null = image
      ? await uploadImage(image, collection)
      : null;
    try {
      if (previous) {
        await reference.update({
          ...fields,
          imageUrl: uploaded?.imageUrl ?? previous.imageUrl,
          imagePath: uploaded?.imagePath ?? previous.imagePath,
          updatedAt: FieldValue.serverTimestamp(),
        });
      } else {
        await reference.set({
          ...fields,
          imageUrl: uploaded?.imageUrl ?? null,
          imagePath: uploaded?.imagePath ?? null,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      if (uploaded) await deleteImage(uploaded.imageUrl, uploaded.imagePath);
      throw error;
    }
    if (uploaded && previous) {
      await deleteImage(previous.imageUrl, previous.imagePath);
    }
  } catch (error) {
    return errorState(error);
  }

  updateTag(collection);
  redirect(redirectTo);
}

async function deleteContent(collection: Collection, id: string) {
  const reference = database().collection(collection).doc(id);
  const snapshot = await reference.get();
  if (snapshot.exists) {
    const previous = currentImage(snapshot.data()!);
    await reference.delete();
    await deleteImage(previous.imageUrl, previous.imagePath);
  }
  updateTag(collection);
}

export async function createService(_state: FormState, formData: FormData) {
  await requireAdmin();
  return saveContent("services", null, formData, serviceFields, "/admin/hizmetler");
}

export async function updateService(id: string, _state: FormState, formData: FormData) {
  await requireAdmin();
  return saveContent("services", id, formData, serviceFields, "/admin/hizmetler");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await deleteContent("services", id);
}

export async function createArticle(_state: FormState, formData: FormData) {
  await requireAdmin();
  return saveContent("articles", null, formData, articleFields, "/admin/makaleler");
}

export async function updateArticle(id: string, _state: FormState, formData: FormData) {
  await requireAdmin();
  return saveContent("articles", id, formData, articleFields, "/admin/makaleler");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await deleteContent("articles", id);
}

export async function createVideo(_state: FormState, formData: FormData) {
  await requireAdmin();
  return saveContent("videos", null, formData, videoFields, "/admin/videolar");
}

export async function deleteVideo(id: string) {
  await requireAdmin();
  await deleteContent("videos", id);
}
