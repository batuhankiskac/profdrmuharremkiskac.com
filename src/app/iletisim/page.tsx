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
          <div className={styles.value} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span>{contactData.phone}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a href={`tel:+${contactData.whatsapp}`} title="Hemen Ara" className="iconButtonHover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.05)', color: 'inherit' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a href={`https://wa.me/${contactData.whatsapp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp'tan Yaz" className="iconButtonHover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#25D366', color: 'white' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}
