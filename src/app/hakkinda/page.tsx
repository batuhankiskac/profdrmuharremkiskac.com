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
        <div style={{ float: "right", marginLeft: "2rem", marginBottom: "1rem" }}>
          <img
            src="/images/profile.jpg"
            alt="Prof. Dr. Muharrem Kıskaç"
            style={{
              borderRadius: "var(--radius-lg)",
              width: "300px",
              height: "auto",
              boxShadow: "var(--shadow-md)"
            }}
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
