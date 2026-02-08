import styles from "./page.module.css";
import ArticlesSection from "@/components/ArticlesSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Makaleler | Prof. Dr. Muharrem Kıskaç',
  description: 'Sağlık, diyabet ve beslenme üzerine güncel makaleler.',
};

export default function ArticlesPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Makaleler</h1>
      <ArticlesSection />
    </main>
  );
}
