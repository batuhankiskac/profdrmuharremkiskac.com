import {
  AdminForm,
  AdminFormField,
  adminFormStyles,
} from "@/components/admin/AdminForm";
import { createService } from "../../actions";

export default function AddServicePage() {
  return (
    <AdminForm
      title="Yeni Hizmet Ekle"
      action={createService}
      submitLabel="Kaydet"
    >
      <AdminFormField label="Başlık" htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          maxLength={160}
          required
          className={adminFormStyles.input}
        />
      </AdminFormField>
      <AdminFormField label="Açıklama (Markdown)" htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={12}
          required
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
      <AdminFormField
        label="Görsel"
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
    </AdminForm>
  );
}
