import Link from "next/link";
import { getServices } from "@/lib/content";
import ContentGrid from "./ContentGrid";
import EmptyState from "./EmptyState";
import ServiceCard from "./ServiceCard";
import styles from "./ServicesSection.module.css";

interface ServicesSectionProps {
  limit?: number;
  showButton?: boolean;
}

export default async function ServicesSection({
  limit,
  showButton = false,
}: ServicesSectionProps) {
  const services = await getServices();
  const displayed = limit ? services.slice(0, limit) : services;

  return (
    <section className={styles.section} aria-label="Hizmet listesi">
      <ContentGrid>
        {displayed.length > 0 ? (
          displayed.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <EmptyState>Hizmetlerimiz yakında eklenecektir.</EmptyState>
        )}
      </ContentGrid>
      {showButton && (
        <Link href="/hizmetler" className={styles.allLink}>
          Tüm Hizmetleri Görüntüle →
        </Link>
      )}
    </section>
  );
}
