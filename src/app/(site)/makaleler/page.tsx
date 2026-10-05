import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import ContentGrid from "@/components/ContentGrid";
import EmptyState from "@/components/EmptyState";
import { getArticles } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Makaleler",
  description: "Sağlık, diyabet ve beslenme üzerine güncel makaleler.",
  alternates: { canonical: "/makaleler" },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Makaleler</h1>
      <ContentGrid>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <EmptyState>Henüz yayınlanmış bir makale bulunmuyor.</EmptyState>
        )}
      </ContentGrid>
    </main>
  );
}
