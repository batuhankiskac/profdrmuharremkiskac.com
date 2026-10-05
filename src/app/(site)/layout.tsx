import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import contactData from "@/data/contact.json";
import { SITE_URL } from "@/lib/site";

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
  medicalSpecialty: ["InternalMedicine", "Endocrine"],
  sameAs: [contactData.social.instagram, contactData.social.youtube],
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
