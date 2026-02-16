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
        <div className={styles.imageContainer}>
          <img
            src="/images/profile.jpg"
            alt="Prof. Dr. Muharrem Kıskaç"
            className={styles.profileImage}
          />
        </div>
        <p style={{ marginBottom: "1.5rem" }}>{bioData.short_bio}</p>

        {bioData.bio_paragraphs.map((paragraph, index) => (
          <p key={index} style={{ marginBottom: "1rem" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
}
