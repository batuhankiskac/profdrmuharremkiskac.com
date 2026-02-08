import styles from "./page.module.css";
import ServicesSection from "@/components/ServicesSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz | Prof. Dr. Muharrem Kıskaç',
  description: 'Diyabet, Hipertansiyon, Metabolik Sendrom ve Fonksiyonel Tıp hizmetlerimiz.',
};

export default function ServicesPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hizmetlerimiz</h1>
        <p className={styles.subtitle}>
          Modern tıp ve bütüncül yaklaşımlarla sağlığınız için en iyi çözümleri sunuyoruz.
        </p>
      </div>

      <ServicesSection />
    </main>
  );
}
