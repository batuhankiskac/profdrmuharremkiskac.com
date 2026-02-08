import Link from "next/link";
import styles from "./Footer.module.css";
import contactData from "@/data/contact.json";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Prof. Dr. Muharrem Kıskaç</h3>
          <p>
            İç hastalıkları, diyabet ve fonksiyonel tıp alanında bütüncül yaklaşımlarla
            sağlığınızı korumayı ve iyileştirmeyi hedefliyoruz.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Hızlı Bağlantılar</h3>
          <div className={styles.links}>
            <Link href="/hakkinda">Hakkımda</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/makaleler">Makaleler</Link>
            <Link href="/videolar">Videolar</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>

        <div className={styles.column}>
          <h3>İletişim</h3>
          <div className={styles.links}>
            <p>{contactData.address}</p>
            <a href={`tel:${contactData.phone.replace(/ /g, "")}`}>{contactData.phone}</a>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} Prof. Dr. Muharrem Kıskaç. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
