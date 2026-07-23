import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AdminForm,
  AdminFormField,
  adminFormStyles,
} from "@/components/admin/AdminForm";
import { getService } from "@/lib/content";
import { updateService } from "../../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getService(id);
  if (!service) notFound();

  return (
    <AdminForm
      title="Hizmeti Düzenle"
      action={updateService.bind(null, id)}
      submitLabel="Güncelle"
    >
      <AdminFormField label="Başlık" htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={service.title}
          maxLength={160}
          required
          className={adminFormStyles.input}
        />
      </AdminFormField>
      <AdminFormField label="Açıklama (Markdown)" htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={14}
          defaultValue={service.description}
          required
          className={adminFormStyles.textarea}
        />
      </AdminFormField>
      <AdminFormField
        label="Görsel"
        htmlFor="image"
        hint="Yeni dosya seçmezseniz mevcut görsel korunur."
      >
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
            alt={`${service.title} mevcut görseli`}
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
    </AdminForm>
  );
}
