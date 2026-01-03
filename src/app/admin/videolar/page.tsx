"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "./page.module.css";

interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      setVideos(videosData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Bu videoyu silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "videos", id));
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Silme işlemi başarısız oldu.");
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Videolar</h1>
        <Link href="/admin/videolar/ekle" className={styles.addButton}>
          Yeni Video Ekle
        </Link>
      </div>

      <div className={styles.grid}>
        {videos.length === 0 ? (
          <p>Henüz eklenmiş bir video yok.</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className={styles.card}>
              <div className={styles.thumbnail}>
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                />
              </div>
              <div className={styles.content}>
                <h3>{video.title}</h3>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className={styles.deleteButton}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
