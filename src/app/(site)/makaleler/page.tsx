import { Suspense } from "react";
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
    <main id="main-content" className={styles.container}>
      <h1 className={styles.heading}>Makaleler</h1>
      <Suspense fallback={<LoadingState />}>
        <PublicContentList
          load={getArticles}
          emptyText="Henüz yayınlanmış bir makale bulunmuyor."
          renderItem={(article) => <ArticleCard article={article} />}
        />
      </Suspense>
    </main>
  );
}
