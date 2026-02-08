"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import styles from "./page.module.css";

export default function AddArticlePage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [citations, setCitations] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = ref(storage, `articles/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "articles"), {
        title,
        summary,
        content,
        citations: citations.split("\n").filter((c) => c.trim() !== ""),
        image: imageUrl,
        createdAt: new Date(),
      });

      router.push("/admin/makaleler");
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Makale eklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yeni Makale Ekle</h1>
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
          <label htmlFor="summary">Özet (Listeleme sayfasında görünür)</label>
          <textarea
            id="summary"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="image">Kapak Resmi</label>
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
        </div>

        <div className={styles.group}>
          <label htmlFor="content">İçerik (HTML veya Düz Metin)</label>
          <textarea
            id="content"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="citations">Kaynakça (Her satıra bir tane)</label>
          <textarea
            id="citations"
            rows={5}
            value={citations}
            onChange={(e) => setCitations(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
