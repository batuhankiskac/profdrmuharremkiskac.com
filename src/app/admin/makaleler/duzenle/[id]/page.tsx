import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AdminForm,
  AdminFormField,
  adminFormStyles,
} from "@/components/admin/AdminForm";
import { getArticle } from "@/lib/content";
import { updateArticle } from "../../../actions";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  return (
    <AdminForm
      title="Makaleyi Düzenle"
      action={updateArticle.bind(null, id)}
      submitLabel="Güncelle"
    >
      <AdminFormField label="Başlık" htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={article.title}
          maxLength={200}
          required
          className={adminFormStyles.input}
        />
      </AdminFormField>
      <AdminFormField label="Özet" htmlFor="summary">
        <textarea
          id="summary"
          name="summary"
          rows={3}
          defaultValue={article.summary}
          maxLength={600}
          required
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
      <AdminFormField
        label="Kapak görseli"
        htmlFor="image"
        hint="Yeni dosya seçmezseniz mevcut görsel korunur."
      >
        {article.imageUrl && (
          <Image
            src={article.imageUrl}
            alt={`${article.title} mevcut kapak görseli`}
            width={240}
            height={160}
            className={adminFormStyles.preview}
          />
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className={adminFormStyles.fileInput}
        />
      </AdminFormField>
      <AdminFormField label="İçerik (Markdown)" htmlFor="content">
        <textarea
          id="content"
          name="content"
          rows={20}
          defaultValue={article.content}
          required
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
      <AdminFormField
        label="Kaynakça"
        htmlFor="citations"
        hint="Her satıra bir kaynak yazın."
      >
        <textarea
          id="citations"
          name="citations"
          rows={6}
          defaultValue={article.citations.join("\n")}
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
    </AdminForm>
  );
}
