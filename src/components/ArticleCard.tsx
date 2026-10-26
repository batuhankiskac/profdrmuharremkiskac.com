import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/types/content";
import CardMedia from "./CardMedia";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className={styles.card}>
      <Link
        href={`/makaleler/${article.id}`}
        className={styles.link}
        aria-label={`${article.title} makalesini oku`}
      >
        <CardMedia
          className={styles.imageContainer}
          src={article.imageUrl}
          placeholder="Makale"
        />
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
