"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "./page.module.css";

export default function AddVideoPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
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
      await addDoc(collection(db, "videos"), {
        title,
        youtubeId,
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

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
