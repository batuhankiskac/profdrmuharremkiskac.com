import Image from "next/image";
import bioData from "@/data/bio.json";
import { pageMetadata } from "@/lib/metadata";
import { excerpt } from "@/lib/text";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Hakkında",
  description: excerpt(bioData.short_bio),
  path: "/hakkinda",
});

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hakkında</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/profile.jpg"
            alt="Prof. Dr. Muharrem Kıskaç"
            width={529}
            height={530}
            sizes="(max-width: 640px) 70vw, 300px"
            className={styles.profileImage}
          />
        </div>
        <p>{bioData.short_bio}</p>
        {bioData.bio_paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
