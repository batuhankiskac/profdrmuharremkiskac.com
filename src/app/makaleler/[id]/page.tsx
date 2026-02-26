"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "./page.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Article {
    id: string;
    title: string;
    summary: string;
    content: string;
    image?: string;
    createdAt?: any;
    citations?: string[];
}

export default function ArticleDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArticle({ id: docSnap.id, ...docSnap.data() } as Article);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Yükleniyor...</div>;
    }

    if (!article) {
        return (
            <div className={styles.notFound}>
                <h1>Makale Bulunamadı</h1>
                <p>Aradığınız makale mevcut değil veya kaldırılmış olabilir.</p>
                <Link href="/makaleler" className={styles.backLink}>
                    &larr; Makalelere Dön
                </Link>
            </div>
        );
    }

    const formattedDate = article.createdAt
        ? new Date(article.createdAt.seconds * 1000).toLocaleDateString("tr-TR")
        : "";

    return (
        <article className={styles.container}>
            <Link href="/makaleler" className={styles.backLink}>
                &larr; Makalelere Dön
            </Link>

            <h1 className={styles.title}>{article.title}</h1>
            <span className={styles.date}>{formattedDate}</span>

            <div className={styles.content}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({node, ...props}) => <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }} {...props} />
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </div>

            {article.citations && article.citations.length > 0 && (
                <div className={styles.citationsSection}>
                    <h2 className={styles.citationsTitle}>Kaynakça</h2>
                    <ul className={styles.citationsList}>
                        {article.citations.map((citation, index) => {
                            const urlRegex = /(https?:\/\/[^\s]+)/g;
                            const parts = citation.split(urlRegex);

                            return (
                                <li key={index} className={styles.citationItem}>
                                    {parts.map((part, i) => (
                                        urlRegex.test(part) ? (
                                            <a
                                                key={i}
                                                href={part}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                                            >
                                                {part}
                                            </a>
                                        ) : (
                                            <span key={i}>{part}</span>
                                        )
                                    ))}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </article>
    );
}
