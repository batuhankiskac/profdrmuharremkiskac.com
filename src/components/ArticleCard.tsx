import Link from "next/link";
import Image from "next/image";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
    id: string;
    title: string;
    summary: string;
    image?: string;
    date?: any; // Firestore timestamp
}

export default function ArticleCard({ id, title, summary, image, date }: ArticleCardProps) {
    // Format date if available
    const formattedDate = date ? new Date(date.seconds * 1000).toLocaleDateString("tr-TR") : "";

    return (
        <article className={styles.card}>
            <Link href={`/makaleler/${id}`} className={styles.link}>
                <div className={styles.imageContainer}>
                    {image ? (
                        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} className={styles.image} />
                    ) : (
                        <div className={styles.placeholder}>
                            <span>Makale Görseli</span>
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <span className={styles.date}>{formattedDate}</span>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.summary}>{summary}</p>
                    <span className={styles.readMore}>Devamını Oku &rarr;</span>
                </div>
            </Link>
        </article>
    );
}
