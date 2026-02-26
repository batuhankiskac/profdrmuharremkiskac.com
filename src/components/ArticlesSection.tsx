"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit as firestoreLimit } from "firebase/firestore";
import { db } from "@/firebase/config";
import ArticleCard from "@/components/ArticleCard";
import styles from "@/app/makaleler/page.module.css";

interface Article {
    id: string;
    title: string;
    summary: string;
    content: string;
    image?: string;
    createdAt?: any;
}

interface ArticlesSectionProps {
    limit?: number;
}

export default function ArticlesSection({ limit }: ArticlesSectionProps) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Ideally enforce ordering by createdAt desc
                let q = collection(db, "articles");
                // For simplicity getting all then sorting client side if indexes not ready

                const querySnapshot = await getDocs(q);
                const fetchedArticles: Article[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedArticles.push({ id: doc.id, ...doc.data() } as Article);
                });

                // Sort by date desc
                fetchedArticles.sort((a, b) => {
                    const dateA = a.createdAt?.seconds || 0;
                    const dateB = b.createdAt?.seconds || 0;
                    return dateB - dateA;
                });

                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const displayedArticles = limit ? articles.slice(0, limit) : articles;

    if (loading) {
        return <div style={{ padding: "5rem", textAlign: "center" }}>Yükleniyor...</div>;
    }

    // If we are in the main page (limit exists), we might want a grid.
    // Using the same grid class from somewhere or defining inline.

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 400px))",
            justifyContent: "center",
            gap: "2rem",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto"
        }}>
            {displayedArticles.length > 0 ? displayedArticles.map((article) => (
                <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    summary={article.summary}
                    image={article.image}
                    date={article.createdAt}
                />
            )) : (
                <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--color-text-light)" }}>
                    Makale bulunamadı.
                </p>
            )}
        </div>
    );
}
