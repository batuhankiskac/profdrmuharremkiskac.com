import { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";
import ContentGrid from "@/components/ContentGrid";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import { getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Makaleler",
  description: "Sağlık, diyabet ve beslenme üzerine güncel makaleler.",
  path: "/makaleler",
});

async function ArticleList() {
  const articles = await getArticles();

  return (
    <ContentGrid>
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <EmptyState>Henüz yayınlanmış bir makale bulunmuyor.</EmptyState>
      )}
    </ContentGrid>
  );
}

export default function ArticlesPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Makaleler</h1>
      <Suspense fallback={<LoadingState />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
