import { Suspense, type CSSProperties } from "react";
import ArticleCard from "@/components/ArticleCard";
import LoadingState from "@/components/LoadingState";
import PublicContentList from "@/components/PublicContentList";
import { getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Makaleler",
  description: "Sağlık, diyabet ve beslenme üzerine güncel makaleler.",
  path: "/makaleler",
});

export default function ArticlesPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow} data-enter>
          Yazılar
        </p>
        <h1
          className={styles.title}
          data-enter
          style={{ "--i": 1 } as CSSProperties}
        >
          Makaleler
        </h1>
      </header>
      <div className={styles.body}>
        <Suspense fallback={<LoadingState />}>
          <PublicContentList
            load={getArticles}
            emptyText="Henüz yayınlanmış bir makale bulunmuyor."
            renderItem={(article, index) => (
              <ArticleCard article={article} index={index} />
            )}
          />
        </Suspense>
      </div>
    </main>
  );
}
