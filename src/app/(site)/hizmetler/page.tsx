import type { Metadata } from "next";
import ContentGrid from "@/components/ContentGrid";
import EmptyState from "@/components/EmptyState";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Diyabet, Hipertansiyon, Metabolik Sendrom ve Fonksiyonel Tıp hizmetlerimiz.",
  alternates: { canonical: "/hizmetler" },
};

export default async function ServicesPage() {
  const services = await getServices();

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
        <ContentGrid>
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <EmptyState>Hizmetlerimiz yakında eklenecektir.</EmptyState>
          )}
        </ContentGrid>
      </section>
    </main>
  );
}
