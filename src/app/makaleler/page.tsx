import styles from "./page.module.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Makaleler | Prof. Dr. Muharrem Kıskaç',
  description: 'Sağlık, diyabet ve beslenme üzerine güncel makaleler.',
};

export default function ArticlesPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Makaleler</h1>
      <div className={styles.grid}>
        <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--color-text-light)", padding: "2rem" }}>
          Makaleler yakında eklenecektir.
        </p>
      </div>
    </main>
  );
}
