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
        {/* Map Iframe */}
        <div style={{ width: "100%", height: "400px", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "2rem", border: "1px solid rgba(0,0,0,0.1)" }}>
             <iframe
                src="https://www.google.com/maps?q=Zuhuratbaba,%20Haksever%20Sk.%20Pa%C5%9Fa%20i%C5%9F%20merkezi%20No:2%20Daire:14,%20Bak%C4%B1rk%C3%B6y/%C4%B0stanbul&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
        </div>

        <div className={styles.section}>
            <span className={styles.label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Adres
            </span>
            <p className={styles.value}>{contactData.address}</p>
        </div>

        <div className={styles.section}>
            <span className={styles.label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Telefon
            </span>
            <a href={`tel:${contactData.phone.replace(/ /g, "")}`} className={styles.value}>
                {contactData.phone}
            </a>
        </div>

        <div className={styles.section}>
            <span className={styles.label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                E-Posta
            </span>
            <a href={`mailto:${contactData.email}`} className={styles.value}>
                {contactData.email}
            </a>
        </div>
      </div>
    </main>
  );
}
