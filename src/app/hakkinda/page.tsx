import styles from "./page.module.css";
import bioData from "@/data/bio.json";
import { Metadata } from 'next';
import Image from "next/image";

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
          <Image
            src="/images/profile.jpg"
            alt="Prof. Dr. Muharrem Kıskaç"
            className={styles.profileImage}
            width={300}
            height={300}
            quality={80}
            style={{ objectFit: 'cover' }}
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
