"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "./page.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Service {
    id: string;
    title: string;
    description: string;
    image?: string;
}

export default function ServiceDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;

            try {
                const docRef = doc(db, "services", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setService({ id: docSnap.id, ...docSnap.data() } as Service);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching service:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Yükleniyor...</div>;
    }

    if (!service) {
        return (
            <div className={styles.notFound}>
                <h1>Hizmet Bulunamadı</h1>
                <p>Aradığınız hizmet mevcut değil veya kaldırılmış olabilir.</p>
                <Link href="/hizmetler" className={styles.backLink}>
                    &larr; Hizmetlere Dön
                </Link>
            </div>
        );
    }

    return (
        <article className={styles.container}>
            <Link href="/hizmetler" className={styles.backLink}>
                &larr; Hizmetlere Dön
            </Link>

            <h1 className={styles.title}>{service.title}</h1>

            <div className={styles.content}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({node, ...props}) => <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }} {...props} />
                    }}
                >
                    {service.description}
                </ReactMarkdown>
            </div>
        </article>
    );
}
