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
            src="https://www.google.com/maps?q=Zuhuratbaba,%20Haksever%20Sk.%20Pa%C5%9Fa%20i%C5%9F%20merkezi%20No:2%20Daire:14,%20Bak%C4%B1rk%C3%B6y/%C4%B0stanbul&output=embed"
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
