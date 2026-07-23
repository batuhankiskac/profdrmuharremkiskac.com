import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { getArticle } from "@/lib/content";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/makaleler/${id}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: `/makaleler/${id}`,
      publishedTime: article.createdAt ?? undefined,
      modifiedTime: article.updatedAt ?? undefined,
      images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  return (
    <ContentDetail
      backHref="/makaleler"
      backLabel="Makalelere Dön"
      title={article.title}
      imageUrl={article.imageUrl}
      imageAlt={`${article.title} makale kapak görseli`}
      date={article.createdAt}
      markdown={article.content}
      citations={article.citations}
    />
  );
}
