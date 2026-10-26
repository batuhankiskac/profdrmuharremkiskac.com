import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/types/content";
import buttonStyles from "@/styles/button.module.css";
import ArrowIcon from "./ArrowIcon";
import CardMedia from "./CardMedia";
import styles from "./ArticleCard.module.css";

type ArticleCardProps = {
  article: ArticleSummary;
  // Liste içindeki sıra; giriş gecikmesi (--i) için kullanılır.
  index?: number;
};

// Kutusuz, editoryal kart: çerçeve ve arka plan yok, görsel yavaşça yakınlaşır.
export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {

  return (
    <article
      className={styles.card}
      data-reveal
      style={{ "--i": index % 3 } as CSSProperties}
    >
      <Link
        href={`/makaleler/${article.id}`}
        className={styles.link}
        aria-label={`${article.title} makalesini oku`}
      >
        {article.imageUrl ? (
          <CardMedia className={styles.media} src={article.imageUrl} />
        ) : null}
        <div
          className={
            article.imageUrl ? styles.content : `${styles.content} ${styles.textOnly}`
          }
        >
          {article.createdAt && (
            <time className={styles.date} dateTime={article.createdAt}>
              {formatDate(article.createdAt)}
            </time>
          )}
          <h2 className={styles.title}>
            <span className={styles.titleText}>{article.title}</span>
          </h2>
          <p className={styles.summary}>{article.summary}</p>
          <span className={styles.more}>
            Devamını Oku
            <ArrowIcon className={buttonStyles.icon} />
          </span>
        </div>
      </Link>
    </article>
  );
}
