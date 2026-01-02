import styles from "./page.module.css";
import bioData from "@/data/bio.json";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkında | Prof. Dr. Muharrem Kıskaç',
  description: bioData.short_bio,
};

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hakkında</h1>

      <div className={styles.content}>
        <p className={styles.highlight}>{bioData.short_bio}</p>

        {bioData.bio.split(". ").map((sentence, index) => (
          sentence && (
            <p key={index}>
              {sentence}.
            </p>
          )
        ))}
      </div>
    </main>
  );
}
