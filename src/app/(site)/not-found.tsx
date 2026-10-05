import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h1>Sayfa bulunamadı</h1>
      <p className={styles.message}>
        Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya hiç var olmamış
        olabilir.
      </p>
      <Link href="/" className={styles.home}>
        Ana sayfaya dön
      </Link>
    </main>
  );
}
