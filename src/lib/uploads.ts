import "server-only";

import { randomUUID } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { getAdminStorage } from "./firebase-admin";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export interface UploadedImage {
  imageUrl: string;
  imagePath: string;
}

export async function uploadImage(
  file: File,
  folder: "articles" | "services",
): Promise<UploadedImage> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Yalnız JPEG, PNG, WebP veya AVIF görseller yüklenebilir.");
  }
  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Görsel boyutu 5 MB veya daha küçük olmalıdır.");
  }

  const storage = getAdminStorage();
  if (!storage) {
    throw new Error("Firebase Storage sunucu yapılandırması eksik.");
  }

  const source = Buffer.from(await file.arrayBuffer());
  const processed = await sharp(source)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toBuffer();

  const safeBaseName =
    path
      .basename(file.name, path.extname(file.name))
      .toLocaleLowerCase("tr-TR")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "gorsel";
  const token = randomUUID();
  const imagePath = `${folder}/${Date.now()}-${safeBaseName}-${token}.webp`;
  const bucket = storage.bucket();

  await bucket.file(imagePath).save(processed, {
    resumable: false,
    contentType: "image/webp",
    metadata: {
      cacheControl: "public,max-age=31536000,immutable",
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });

  const imageUrl =
    `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/` +
    `${encodeURIComponent(imagePath)}?alt=media&token=${token}`;
  return { imageUrl, imagePath };
}

function pathFromDownloadUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    if (url.hostname === "firebasestorage.googleapis.com") {
      const match = url.pathname.match(/\/o\/(.+)$/);
      return match ? decodeURIComponent(match[1]) : null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function deleteImage(
  imageUrl: string | null,
  imagePath?: string | null,
): Promise<void> {
  const targetPath = imagePath || (imageUrl ? pathFromDownloadUrl(imageUrl) : null);
  if (!targetPath) return;

  const storage = getAdminStorage();
  if (!storage) return;

  try {
    await storage.bucket().file(targetPath).delete({ ignoreNotFound: true });
  } catch (error) {
    console.error("Eski görsel silinemedi:", error);
  }
}
