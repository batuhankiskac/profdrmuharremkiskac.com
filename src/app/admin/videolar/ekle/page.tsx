"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import styles from "./page.module.css";

export default function AddVideoPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const youtubeId = getYoutubeId(url);
    if (!youtubeId) {
      alert("Geçersiz YouTube URL'si");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = ref(storage, `videos/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      } else {
        // Fallback to YouTube max res thumbnail if no custom image is provided
        imageUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      }

      await addDoc(collection(db, "videos"), {
        title,
        youtubeId,
        image: imageUrl,
        createdAt: new Date(),
      });

      router.push("/admin/videolar");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Video eklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yeni Video Ekle</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="title">Başlık</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="url">YouTube Linki</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="image">Özel Kapak Resmi (İsteğe Bağlı)</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className={styles.fileInput}
          />
          <small className={styles.helperText}>Yüklenmezse YouTube otomatik kapak resmi kullanılır.</small>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
