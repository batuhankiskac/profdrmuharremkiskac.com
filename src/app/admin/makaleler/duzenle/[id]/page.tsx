"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import styles from "../../ekle/page.module.css"; // Reuse styles

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [citations, setCitations] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setSummary(data.summary);
          setContent(data.content);
          setCitations(
            Array.isArray(data.citations) ? data.citations.join("\n") : ""
          );
          setCurrentImage(data.imageUrl);
        } else {
          alert("Makale bulunamadı");
          router.push("/admin/makaleler");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);

    try {
      let imageUrl = currentImage;

      if (image) {
        const storageRef = ref(storage, `articles/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(doc(db, "articles", id), {
        title,
        summary,
        content,
        citations: citations.split("\n").filter((c) => c.trim() !== ""),
        imageUrl,
        updatedAt: new Date(),
      });

      router.push("/admin/makaleler");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Makale güncellenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Makaleyi Düzenle</h1>
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
          <label htmlFor="summary">Özet</label>
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
          {currentImage && (
            <div style={{ marginBottom: "10px" }}>
              <img
                src={currentImage}
                alt="Current"
                style={{ height: "100px", borderRadius: "8px" }}
              />
            </div>
          )}
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
          <label htmlFor="content">İçerik</label>
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
          <label htmlFor="citations">Kaynakça</label>
          <textarea
            id="citations"
            rows={5}
            value={citations}
            onChange={(e) => setCitations(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Kaydediliyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
}
