import styles from "./page.module.css";
import VideosSection from "@/components/VideosSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videolar | Prof. Dr. Muharrem Kıskaç',
  description: 'Sağlıklı yaşam rehberi videoları.',
};

export default function VideosPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Videolar</h1>
      <VideosSection />
    </main>
  );
}
