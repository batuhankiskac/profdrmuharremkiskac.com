"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import styles from "../ekle/page.module.css"; // Reuse styles

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Unwrap params using React.use
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setCurrentImage(data.imageUrl);
        } else {
          alert("Hizmet bulunamadı");
          router.push("/admin/hizmetler");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
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
        const storageRef = ref(storage, `services/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(doc(db, "services", id), {
        title,
        description,
        imageUrl,
        updatedAt: new Date(),
      });

      router.push("/admin/hizmetler");
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Hizmet güncellenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hizmeti Düzenle</h1>
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
          <label htmlFor="description">Açıklama</label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="image">Resim (Değiştirmek için seçin)</label>
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

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Kaydediliyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
}
