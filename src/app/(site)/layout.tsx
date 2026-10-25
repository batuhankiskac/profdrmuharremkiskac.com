import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import contactData from "@/data/contact.json";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
import { SITE_URL } from "@/lib/site";
import styles from "./layout.module.css";

// Hostinger CDN (hcdn) `Vary: rsc` başlığını yok sayıyor; statik sayfaların
// RSC yükü (text/x-component) normal ziyaretçilere HTML yerine sunulabiliyor.
// Dinamik render `Cache-Control: private, no-store` gönderir ve CDN bu
// sayfaları önbelleğe almaz. Firestore verisi unstable_cache ile önbellekte kalır.
export const dynamic = "force-dynamic";

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalBusiness"],
  name: "Prof. Dr. Muharrem Kıskaç",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  telephone: contactData.tel,
  address: {
    "@type": "PostalAddress",
    ...contactData.addressParts,
  },
  // Yalnız schema.org MedicalSpecialty listesindeki değerler geçerlidir;
  // "InternalMedicine" bu listede yok.
  medicalSpecialty: ["Endocrine", "PrimaryCare"],
  sameAs: [contactData.social.instagram, contactData.social.youtube],
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Consent Mode varsayılanları etkileşimden önce, sunucu HTML'iyle gelir. */}
      <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
      {/* Klavye kullanıcıları menüyü geçip doğrudan sayfa içeriğine gidebilir. */}
      <a href="#main-content" className={styles.skipLink}>
        İçeriğe atla
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <Header />
      {children}
      <Footer />
      <AnalyticsConsent />
    </>
  );
}
