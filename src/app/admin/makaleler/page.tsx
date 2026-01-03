"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "./page.module.css";

interface Article {
  id: string;
  title: string;
  summary: string;
  createdAt: any;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articlesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Bu makaleyi silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "articles", id));
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
        alert("Silme işlemi başarısız oldu.");
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Makaleler</h1>
        <Link href="/admin/makaleler/ekle" className={styles.addButton}>
          Yeni Makale Ekle
        </Link>
      </div>

      <div className={styles.list}>
        {articles.length === 0 ? (
          <p>Henüz eklenmiş bir makale yok.</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className={styles.listItem}>
              <div>
                <h3>{article.title}</h3>
                <p className={styles.summary}>{article.summary}</p>
              </div>
              <div className={styles.actions}>
                <Link
                  href={`/admin/makaleler/duzenle/${article.id}`}
                  className={styles.editButton}
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(article.id)}
                  className={styles.deleteButton}
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
