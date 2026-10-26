import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import ConsentPreferencesButton from "./ConsentPreferencesButton";
import ContactActions from "./ContactActions";
import ExternalLink from "./ExternalLink";
import contactData from "@/data/contact.json";
import { contactLink, navigationLinks, privacyLink } from "@/data/navigation";
import buttonStyles from "@/styles/button.module.css";
import styles from "./Footer.module.css";

const footerLinks = [
  ...navigationLinks.filter((link) => link.href !== "/"),
  contactLink,
  privacyLink,
];

const externalLinks = [
  { href: "https://doktorhacamat.com", label: "Doktor Hacamat" },
  { href: "https://siboklinik.com", label: "Sibo Klinik" },
  { href: contactData.social.instagram, label: "Instagram" },
  { href: contactData.social.youtube, label: "YouTube" },
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
        <div className={styles.band}>
          <div className={styles.bandText}>
            <p className={styles.eyebrow}>İletişim</p>
            <h2 className={styles.bandTitle}>
              Randevu ve <em>bilgi için</em>
            </h2>
          </div>
          <div className={styles.bandActions}>
            <div className={styles.contact}>
              <ContactActions inverted />
            </div>
            <Link href={contactLink.href} className={styles.cta} prefetch={false}>
              Randevu Al
              <ArrowIcon className={buttonStyles.icon} />
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Prof. Dr. Muharrem Kıskaç</h2>
            <p className={styles.brandText}>
              İç hastalıkları, diyabet ve fonksiyonel tıp alanında bütüncül
              yaklaşımlarla sağlığınızı korumayı ve iyileştirmeyi hedefliyoruz.
            </p>
          </div>
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Hızlı Bağlantılar</h2>
            <nav className={styles.links} aria-label="Alt menü">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              ))}
              <ConsentPreferencesButton />
            </nav>
          </div>
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Bağlantılar</h2>
            <div className={styles.links}>
              {externalLinks.map((link) => (
                <ExternalLink key={link.label} href={link.href}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>İletişim</h2>
            <address className={styles.address}>{contactData.address}</address>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>
            © {currentYear()} Prof. Dr. Muharrem Kıskaç. Tüm hakları
            saklıdır.
          </div>
          <a href="#main-content" className={styles.toTop}>
            Yukarı dön
            <span className={styles.toTopIcon}>
              <ArrowIcon className={buttonStyles.icon} direction="up-right" />
            </span>
          </a>
        </div>
      </div>

      {/* Dekoratif dev marka yazısı; alt kenarda kırpılır. */}
      <div className={styles.wordmark} aria-hidden="true">
        Prof. Dr. Muharrem Kıskaç
      </div>
    </footer>
  );
}
