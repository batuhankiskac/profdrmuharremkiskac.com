"use server";

import { FieldValue, type DocumentData } from "firebase-admin/firestore";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { deleteImage, uploadImage } from "@/lib/uploads";
import { extractYoutubeId } from "@/lib/youtube";

function requiredText(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${name} alanı zorunludur.`);
  }
  return value.trim().slice(0, maxLength);
}

function optionalText(formData: FormData, name: string, maxLength: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function selectedFile(formData: FormData): File | null {
  const value = formData.get("image");
  return value instanceof File && value.size > 0 ? value : null;
}

function database() {
  const db = getAdminDb();
  if (!db) throw new Error("Firebase Admin veritabanı yapılandırması eksik.");
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

function refreshContent(tag: "articles" | "services" | "videos") {
  updateTag(tag);
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const db = database();
  const image = selectedFile(formData);
  const uploaded = image ? await uploadImage(image, "services") : null;

  await db.collection("services").add({
    title: requiredText(formData, "title", 160),
    description: requiredText(formData, "description", 20_000),
    imageUrl: uploaded?.imageUrl ?? null,
    imagePath: uploaded?.imagePath ?? null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  refreshContent("services");
  redirect("/admin/hizmetler");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const db = database();
  const reference = db.collection("services").doc(id);
  const snapshot = await reference.get();
  if (!snapshot.exists) throw new Error("Hizmet bulunamadı.");

  const previous = currentImage(snapshot.data()!);
  const image = selectedFile(formData);
  const uploaded = image ? await uploadImage(image, "services") : null;
  await reference.update({
    title: requiredText(formData, "title", 160),
    description: requiredText(formData, "description", 20_000),
    imageUrl: uploaded?.imageUrl ?? previous.imageUrl,
    imagePath: uploaded?.imagePath ?? previous.imagePath,
    updatedAt: FieldValue.serverTimestamp(),
  });
  if (uploaded) await deleteImage(previous.imageUrl, previous.imagePath);
  refreshContent("services");
  redirect("/admin/hizmetler");
}

export async function deleteService(id: string) {
  await requireAdmin();
  const db = database();
  const reference = db.collection("services").doc(id);
  const snapshot = await reference.get();
  if (snapshot.exists) {
    const previous = currentImage(snapshot.data()!);
    await reference.delete();
    await deleteImage(previous.imageUrl, previous.imagePath);
  }
  refreshContent("services");
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const db = database();
  const image = selectedFile(formData);
  const uploaded = image ? await uploadImage(image, "articles") : null;

  await db.collection("articles").add({
    title: requiredText(formData, "title", 200),
    summary: requiredText(formData, "summary", 600),
    content: requiredText(formData, "content", 100_000),
    citations: optionalText(formData, "citations", 20_000)
      .split("\n")
      .map((citation) => citation.trim())
      .filter(Boolean),
    imageUrl: uploaded?.imageUrl ?? null,
    imagePath: uploaded?.imagePath ?? null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  refreshContent("articles");
  redirect("/admin/makaleler");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdmin();
  const db = database();
  const reference = db.collection("articles").doc(id);
  const snapshot = await reference.get();
  if (!snapshot.exists) throw new Error("Makale bulunamadı.");

  const previous = currentImage(snapshot.data()!);
  const image = selectedFile(formData);
  const uploaded = image ? await uploadImage(image, "articles") : null;
  await reference.update({
    title: requiredText(formData, "title", 200),
    summary: requiredText(formData, "summary", 600),
    content: requiredText(formData, "content", 100_000),
    citations: optionalText(formData, "citations", 20_000)
      .split("\n")
      .map((citation) => citation.trim())
      .filter(Boolean),
    imageUrl: uploaded?.imageUrl ?? previous.imageUrl,
    imagePath: uploaded?.imagePath ?? previous.imagePath,
    updatedAt: FieldValue.serverTimestamp(),
  });
  if (uploaded) await deleteImage(previous.imageUrl, previous.imagePath);
  refreshContent("articles");
  redirect("/admin/makaleler");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const db = database();
  const reference = db.collection("articles").doc(id);
  const snapshot = await reference.get();
  if (snapshot.exists) {
    const previous = currentImage(snapshot.data()!);
    await reference.delete();
    await deleteImage(previous.imageUrl, previous.imagePath);
  }
  refreshContent("articles");
}

export async function createVideo(formData: FormData) {
  await requireAdmin();
  const db = database();
  const url = requiredText(formData, "url", 500);
  const youtubeId = extractYoutubeId(url);
  if (!youtubeId) throw new Error("Geçerli bir YouTube URL'si girin.");

  await db.collection("videos").add({
    title: requiredText(formData, "title", 200),
    youtubeId,
    imageUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  refreshContent("videos");
  redirect("/admin/videolar");
}

export async function deleteVideo(id: string) {
  await requireAdmin();
  await database().collection("videos").doc(id).delete();
  refreshContent("videos");
}
