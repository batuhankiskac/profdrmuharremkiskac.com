import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { getArticle } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { detailSchema } from "@/lib/schema";
import { excerpt } from "@/lib/text";

type PageProps = { params: Promise<{ id: string }> };

// Build'de Firestore'a gidilmez; detay sayfaları ilk istekte üretilip ISR ile
// önbelleğe alınır. Bilinmeyen id'ler notFound() ile 404 döner.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  return pageMetadata({
    title: article.title,
    description: excerpt(article.summary),
    path: `/makaleler/${id}`,
    image: article.imageUrl,
    type: "article",
    publishedTime: article.createdAt,
    modifiedTime: article.updatedAt,
  });
}

// Bu rotayı saran bir loading.tsx/Suspense yoktur; notFound() yanıt akışı
// başlamadan çalışır ve gerçek 404 durum kodu döner.
export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  return (
    <ContentDetail
      backHref="/makaleler"
      backLabel="Makalelere Dön"
      eyebrow="Makale"
      title={article.title}
      imageUrl={article.imageUrl}
      imageAlt={`${article.title} makale kapak görseli`}
      date={article.createdAt}
      updatedAt={article.updatedAt}
      showAuthor
      schema={detailSchema({
        kind: "article",
        path: `/makaleler/${id}`,
        title: article.title,
        description: excerpt(article.summary),
        imageUrl: article.imageUrl,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        citations: article.citations,
      })}
      markdown={article.content}
      citations={article.citations}
    />
  );
}
