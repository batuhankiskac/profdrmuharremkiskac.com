import ContactActions from "@/components/ContactActions";
import ExternalLink from "@/components/ExternalLink";
import MapEmbed from "@/components/MapEmbed";
import contactData from "@/data/contact.json";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

const description = "İletişim bilgileri, telefon ve muayenehane adresi.";

export const metadata = pageMetadata({
  title: "İletişim",
  description,
  path: "/iletisim",
});

// Harita yüklenmeden de çalışan dış bağlantı.
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactData.address,
)}`;

export default function ContactPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>İletişim</p>
        <h1 className={styles.title}>İletişim</h1>
        <p className={styles.lead}>{description}</p>
      </header>

      <div className={styles.layout}>
        <div className={styles.info}>
          <section className={styles.row}>
            <h2 className={styles.label}>Telefon</h2>
            <a className={styles.phone} href={`tel:${contactData.tel}`}>
              {contactData.phone}
            </a>
            <ContactActions />
          </section>

          <section className={styles.row}>
            <h2 className={styles.label}>Adres</h2>
            <address className={styles.address}>{contactData.address}</address>
            <p>
              <ExternalLink className={styles.textLink} href={mapsSearchUrl}>
                Google Haritalar&apos;da aç
              </ExternalLink>
            </p>
          </section>

          <section className={styles.row}>
            <h2 className={styles.label}>Sosyal Medya</h2>
            <ul className={styles.social}>
              <li>
                <ExternalLink
                  className={styles.textLink}
                  href={contactData.social.instagram}
                >
                  Instagram
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  className={styles.textLink}
                  href={contactData.social.youtube}
                >
                  YouTube
                </ExternalLink>
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.map} data-reveal="mask">
          <MapEmbed
            address={contactData.address}
            title="Prof. Dr. Muharrem Kıskaç muayenehanesi konumu"
          />
        </div>
      </div>
    </main>
  );
}
