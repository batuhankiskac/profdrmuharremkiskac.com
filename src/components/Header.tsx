import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Prof. Dr. Muharrem Kıskaç
      </Link>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Ana Sayfa</Link>
        <Link href="/hakkinda" className={styles.navLink}>Hakkında</Link>
        <Link href="/hizmetler" className={styles.navLink}>Hizmetler</Link>
        <Link href="/makaleler" className={styles.navLink}>Makaleler</Link>
        <Link href="/videolar" className={styles.navLink}>Videolar</Link>
        <Link href="/iletisim" className={styles.navLink}>İletişim</Link>
        <Link href="/iletisim" className={styles.ctaButton}>Randevu Al</Link>
      </nav>
    </header>
  );
}
