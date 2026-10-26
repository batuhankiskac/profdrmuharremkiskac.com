import { Suspense, type CSSProperties } from "react";
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
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow} data-enter>
          Hizmetler
        </p>
        <h1
          className={styles.title}
          data-enter
          style={{ "--i": 1 } as CSSProperties}
        >
          Hizmetlerimiz
        </h1>
        <p
          className={styles.lead}
          data-enter
          style={{ "--i": 2 } as CSSProperties}
        >
          Modern tıp ve bütüncül yaklaşımlarla sağlığınız için kişiye özel
          hizmetler sunuyoruz.
        </p>
      </header>

      <div className={styles.body}>
        <section aria-label="Hizmet listesi">
          <Suspense fallback={<LoadingState />}>
            <PublicContentList
              load={getServices}
              emptyText="Hizmetlerimiz yakında eklenecektir."
              renderItem={(service, index) => (
                <ServiceCard service={service} index={index} />
              )}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
