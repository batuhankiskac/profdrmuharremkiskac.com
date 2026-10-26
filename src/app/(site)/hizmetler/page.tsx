import { Suspense } from "react";
import LoadingState from "@/components/LoadingState";
import PublicContentList from "@/components/PublicContentList";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Hizmetlerimiz",
  description:
    "Diyabet, Hipertansiyon, Metabolik Sendrom ve Fonksiyonel Tıp hizmetlerimiz.",
  path: "/hizmetler",
});

// Yükleme göstergesi segment yerine sayfa içinde tutulur; segment düzeyindeki
// loading.tsx alt rotaları da sarar ve detay sayfalarında 404 durum kodunu
// engeller.
export default function ServicesPage() {
  return (
    <main id="main-content" className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hizmetlerimiz</h1>
        <p className={styles.subtitle}>
          Modern tıp ve bütüncül yaklaşımlarla sağlığınız için kişiye özel
          hizmetler sunuyoruz.
        </p>
      </div>

      <section aria-label="Hizmet listesi">
        <Suspense fallback={<LoadingState />}>
          <PublicContentList
            load={getServices}
            emptyText="Hizmetlerimiz yakında eklenecektir."
            renderItem={(service) => <ServiceCard service={service} />}
          />
        </Suspense>
      </section>
    </main>
  );
}
