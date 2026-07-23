import styles from "./page.module.css";
import VideosSection from "@/components/VideosSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videolar',
  description: 'Sağlıklı yaşam rehberi videoları.',
  alternates: { canonical: '/videolar' },
};

export default function VideosPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Videolar</h1>
      <VideosSection />
    </main>
  );
}
