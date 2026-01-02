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
        <div className={styles.articleCard}>
            <h2 className={styles.articleTitle}>Magnezyum Nedir?</h2>
            <p className={styles.articleDate}>14 Temmuz 2024</p>
            <p>Magnezyum, insan vücudu için temel bir mineraldir...</p>
        </div>
        <div className={styles.articleCard}>
            <h2 className={styles.articleTitle}>Tansiyon Ölçümü Nasıl Olmalıdır?</h2>
            <p className={styles.articleDate}>14 Temmuz 2024</p>
            <p>Tansiyonun normal veya normale yakın değerlerde tutulması hayati önemdedir...</p>
        </div>
      </div>
    </main>
  );
}
