import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import contactData from "@/data/contact.json";

// Hostinger CDN (hcdn) `Vary: rsc` başlığını yok sayıyor; statik sayfaların
// RSC yükü (text/x-component) normal ziyaretçilere HTML yerine sunulabiliyor.
// Dinamik render `Cache-Control: private, no-store` gönderir ve CDN bu
// sayfaları önbelleğe almaz. Firestore verisi unstable_cache ile önbellekte kalır.
export const dynamic = "force-dynamic";

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalBusiness"],
  name: "Prof. Dr. Muharrem Kıskaç",
  url: "https://profdrmuharremkiskac.com",
  image: "https://profdrmuharremkiskac.com/images/profile.jpg",
  telephone: contactData.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Zuhuratbaba, Haksever Sk. Paşa İş Merkezi No:2 Daire:14",
    addressLocality: "Bakırköy",
    addressRegion: "İstanbul",
    postalCode: "34147",
    addressCountry: "TR",
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
