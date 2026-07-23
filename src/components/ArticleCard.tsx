import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/content";
import styles from "./ArticleCard.module.css";

function formatDate(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(
        new Date(value),
      )
    : "";
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={styles.card}>
      <Link
        href={`/makaleler/${article.id}`}
        className={styles.link}
        aria-label={`${article.title} makalesini oku`}
      >
        <div className={styles.imageContainer}>
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className={styles.image}
              sizes="(max-width: 700px) 100vw, 400px"
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true">
              Makale
            </div>
          )}
        </div>
        <div className={styles.content}>
          {article.createdAt && (
            <time className={styles.date} dateTime={article.createdAt}>
              {formatDate(article.createdAt)}
            </time>
          )}
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.summary}>{article.summary}</p>
          <span className={styles.readMore}>Devamını Oku →</span>
        </div>
      </Link>
    </article>
  );
}
