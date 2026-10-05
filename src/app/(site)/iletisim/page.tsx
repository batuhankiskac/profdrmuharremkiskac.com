import ContactActions from "@/components/ContactActions";
import MapEmbed from "@/components/MapEmbed";
import contactData from "@/data/contact.json";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "İletişim",
  description: "İletişim bilgileri, telefon ve muayenehane adresi.",
  path: "/iletisim",
});

// Harita yüklenmeden de çalışan dış bağlantı.
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactData.address,
)}`;

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>İletişim</h1>
      <div className={styles.card}>
        <div className={styles.map}>
          <MapEmbed
            address={contactData.address}
            title="Prof. Dr. Muharrem Kıskaç muayenehanesi konumu"
          />
        </div>
        <section className={styles.section}>
          <h2 className={styles.label}>Adres</h2>
          <address className={styles.value}>{contactData.address}</address>
          <p>
            <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
              Google Haritalar&apos;da aç
            </a>
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>Telefon</h2>
          <ContactActions />
        </section>
      </div>
    </main>
  );
}
