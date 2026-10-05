import type { Metadata } from "next";
import ContactActions from "@/components/ContactActions";
import contactData from "@/data/contact.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "İletişim",
  description: "İletişim bilgileri, telefon ve muayenehane adresi.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>İletişim</h1>
      <div className={styles.card}>
        <div className={styles.map}>
          <iframe
            title="Prof. Dr. Muharrem Kıskaç muayenehanesi konumu"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              contactData.address,
            )}&output=embed`}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <section className={styles.section}>
          <h2 className={styles.label}>Adres</h2>
          <address className={styles.value}>{contactData.address}</address>
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>Telefon</h2>
          <ContactActions />
        </section>
      </div>
    </main>
  );
}
