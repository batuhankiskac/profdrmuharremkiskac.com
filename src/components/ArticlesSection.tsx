import { getArticles } from "@/lib/content";
import ArticleCard from "./ArticleCard";
import ContentGrid from "./ContentGrid";
import EmptyState from "./EmptyState";

export default async function ArticlesSection({ limit }: { limit?: number }) {
  const articles = await getArticles();
  const displayed = limit ? articles.slice(0, limit) : articles;

  return (
    <ContentGrid>
      {displayed.length > 0 ? (
        displayed.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <EmptyState>Henüz yayınlanmış bir makale bulunmuyor.</EmptyState>
      )}
    </ContentGrid>
  );
}
