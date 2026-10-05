import Link from "next/link";
import ConsentPreferencesButton from "./ConsentPreferencesButton";
import ContactActions from "./ContactActions";
import contactData from "@/data/contact.json";
import { contactLink, navigationLinks } from "@/data/navigation";
import styles from "./Footer.module.css";

const footerLinks = [
  ...navigationLinks.filter((link) => link.href !== "/"),
  contactLink,
];

// Yıl, sunucunun saat diliminden bağımsız olarak İstanbul'a göre hesaplanır.
function currentYear() {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

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
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <ConsentPreferencesButton />
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
        © {currentYear()} Prof. Dr. Muharrem Kıskaç. Tüm hakları
        saklıdır.
      </div>
    </footer>
  );
}
