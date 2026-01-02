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
        <div className={styles.videoCard}>
          <div className={styles.videoPlaceholder}>Video Önizleme</div>
          <div className={styles.videoInfo}>
            <h3 className={styles.videoTitle}>Sağlıklı Yaşam İpuçları</h3>
          </div>
        </div>
        <div className={styles.videoCard}>
          <div className={styles.videoPlaceholder}>Video Önizleme</div>
          <div className={styles.videoInfo}>
            <h3 className={styles.videoTitle}>Diyabet Yönetimi</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
