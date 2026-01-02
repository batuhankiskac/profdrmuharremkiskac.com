import styles from "./page.module.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videolar | Prof. Dr. Muharrem Kıskaç',
  description: 'Sağlıklı yaşam rehberi videoları.',
};

export default function VideosPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Videolar</h1>
      <div className={styles.grid}>
        <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--color-text-light)", padding: "2rem" }}>
          Videolar yakında eklenecektir.
        </p>
      </div>
    </main>
  );
}
