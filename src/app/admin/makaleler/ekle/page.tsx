import {
  AdminForm,
  AdminFormField,
  adminFormStyles,
} from "@/components/admin/AdminForm";
import { createArticle } from "../../actions";

export default function AddArticlePage() {
  return (
    <AdminForm
      title="Yeni Makale Ekle"
      action={createArticle}
      submitLabel="Kaydet"
    >
      <AdminFormField label="Başlık" htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          maxLength={200}
          required
          className={adminFormStyles.input}
        />
      </AdminFormField>
      <AdminFormField
        label="Özet"
        htmlFor="summary"
        hint="Listeleme ve arama sonuçlarında kullanılır."
      >
        <textarea
          id="summary"
          name="summary"
          rows={3}
          maxLength={600}
          required
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
      <AdminFormField
        label="Kapak görseli"
        htmlFor="image"
        hint="JPEG, PNG, WebP veya AVIF; en fazla 5 MB. Görsel otomatik optimize edilir."
      >
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
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
    </AdminForm>
  );
}
