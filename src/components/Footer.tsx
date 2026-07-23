import Link from "next/link";
import ContactActions from "./ContactActions";
import contactData from "@/data/contact.json";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h2>Prof. Dr. Muharrem Kıskaç</h2>
          <p>
            İç hastalıkları, diyabet ve fonksiyonel tıp alanında bütüncül
            yaklaşımlarla sağlığınızı korumayı ve iyileştirmeyi hedefliyoruz.
          </p>
        </div>
        <div className={styles.column}>
          <h2>Hızlı Bağlantılar</h2>
          <nav className={styles.links} aria-label="Alt menü">
            <Link href="/hakkinda">Hakkımda</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/makaleler">Makaleler</Link>
            <Link href="/videolar">Videolar</Link>
            <Link href="/iletisim">İletişim</Link>
          </nav>
        </div>
        <div className={styles.column}>
          <h2>Bağlantılar</h2>
          <div className={styles.links}>
            <a href="https://doktorhacamat.com" target="_blank" rel="noopener noreferrer">
              Doktor Hacamat
            </a>
            <a href="https://siboklinik.com" target="_blank" rel="noopener noreferrer">
              Sibo Klinik
            </a>
            <a href={contactData.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={contactData.social.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
        <div className={styles.column}>
          <h2>İletişim</h2>
          <address className={styles.address}>{contactData.address}</address>
          <ContactActions compact inverted />
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Prof. Dr. Muharrem Kıskaç. Tüm hakları
        saklıdır.
      </div>
    </footer>
  );
}
