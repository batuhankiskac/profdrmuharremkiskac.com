import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { getService } from "@/lib/content";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);
  if (!service) return {};

  const description = service.description.replace(/[#*_`]/g, "").slice(0, 160);
  return {
    title: service.title,
    description,
    alternates: { canonical: `/hizmetler/${id}` },
    openGraph: {
      type: "article",
      title: service.title,
      description,
      url: `/hizmetler/${id}`,
      images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = await getService(id);
  if (!service) notFound();

  return (
    <ContentDetail
      backHref="/hizmetler"
      backLabel="Hizmetlere Dön"
      title={service.title}
      imageUrl={service.imageUrl}
      imageAlt={`${service.title} hizmeti`}
      markdown={service.description}
    />
  );
}
