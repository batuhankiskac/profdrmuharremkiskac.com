import { Suspense } from "react";
import ContentGrid from "@/components/ContentGrid";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
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

async function ServiceList() {
  const services = await getServices();

  return (
    <ContentGrid>
      {services.length > 0 ? (
        services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))
      ) : (
        <EmptyState>Hizmetlerimiz yakında eklenecektir.</EmptyState>
      )}
    </ContentGrid>
  );
}

// Yükleme göstergesi segment yerine sayfa içinde tutulur; segment düzeyindeki
// loading.tsx alt rotaları da sarar ve detay sayfalarında 404 durum kodunu
// engeller.
export default function ServicesPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hizmetlerimiz</h1>
        <p className={styles.subtitle}>
          Modern tıp ve bütüncül yaklaşımlarla sağlığınız için en iyi çözümleri
          sunuyoruz.
        </p>
      </div>

      <section aria-label="Hizmet listesi">
        <Suspense fallback={<LoadingState />}>
          <ServiceList />
        </Suspense>
      </section>
    </main>
  );
}
