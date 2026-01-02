import styles from "./page.module.css";
import contactData from "@/data/contact.json";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Prof. Dr. Muharrem Kıskaç',
  description: 'İletişim bilgileri ve adres.',
};

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>İletişim</h1>

      <div className={styles.card}>
        <div className={styles.section}>
            <span className={styles.label}>Adres</span>
            <p className={styles.value}>{contactData.address}</p>
        </div>

        <div className={styles.section}>
            <span className={styles.label}>Telefon</span>
            <a href={`tel:${contactData.phone.replace(/ /g, "")}`} className={styles.value}>
                {contactData.phone}
            </a>
        </div>

        <div className={styles.section}>
            <span className={styles.label}>E-Posta</span>
            <a href={`mailto:${contactData.email}`} className={styles.value}>
                {contactData.email}
            </a>
        </div>
      </div>
    </main>
  );
}
