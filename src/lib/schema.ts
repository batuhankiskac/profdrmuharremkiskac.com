import bioData from "@/data/bio.json";
import contactData from "@/data/contact.json";
import { SITE_NAME } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

// Yapılandırılmış veri düğümleri sabit @id'lerle birbirine bağlanır; sayfa
// düğümleri hekimi ve siteyi tekrar tanımlamadan bu kimliklere başvurur.
export const PERSON_ID = `${SITE_URL}/#person`;
export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const IMAGE = `${SITE_URL}/images/profile.jpg`;

// Hekimin doğrulanmış dış profilleri (varlık eşleştirmesi için).
const SAME_AS = [
  contactData.social.instagram,
  contactData.social.youtube,
  "https://orcid.org/0000-0003-2534-2675",
  "https://dergipark.org.tr/tr/pub/@muharrem.kiskac",
];

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: bioData.name,
      honorificPrefix: "Prof. Dr.",
      jobTitle: bioData.title,
      url: `${SITE_URL}/hakkinda`,
      image: IMAGE,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "İstanbul Üniversitesi İstanbul Tıp Fakültesi",
      },
      knowsAbout: ["İç hastalıkları", "Diyabet", "Tiroid hastalıkları", "Obezite", "Fonksiyonel tıp"],
      worksFor: { "@id": CLINIC_ID },
      sameAs: SAME_AS,
    },
    {
      // Physician, schema.org'da muayenehaneyi (MedicalBusiness) temsil eder.
      "@type": "Physician",
      "@id": CLINIC_ID,
      name: SITE_NAME,
      url: SITE_URL,
      image: IMAGE,
      telephone: contactData.tel,
      address: {
        "@type": "PostalAddress",
        ...contactData.addressParts,
      },
      areaServed: { "@type": "City", name: contactData.addressParts.addressRegion },
      // Yalnız schema.org MedicalSpecialty listesindeki değerler geçerlidir;
      // "InternalMedicine" bu listede yok.
      medicalSpecialty: ["Endocrine", "PrimaryCare"],
      employee: { "@id": PERSON_ID },
      sameAs: [contactData.social.instagram, contactData.social.youtube],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "tr-TR",
      publisher: { "@id": CLINIC_ID },
    },
  ],
};

type Crumb = { name: string; path: string };

function breadcrumb(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

type DetailSchemaOptions = {
  kind: "article" | "service";
  path: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  citations?: string[];
};

// Makale ve hizmet detay sayfaları için tıbbi web sayfası, (makalede) yazar ve
// tarih bilgili Article ve gezinme yolu düğümleri.
export function detailSchema({
  kind,
  path,
  title,
  description,
  imageUrl,
  createdAt,
  updatedAt,
  citations = [],
}: DetailSchemaOptions) {
  const url = `${SITE_URL}${path}`;
  const modified = updatedAt ?? createdAt;
  const section =
    kind === "article"
      ? { name: "Makaleler", path: "/makaleler" }
      : { name: "Hizmetler", path: "/hizmetler" };

  const webPage = {
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": WEBSITE_ID },
    reviewedBy: { "@id": PERSON_ID },
    ...(modified ? { lastReviewed: modified.slice(0, 10) } : {}),
    ...(imageUrl ? { primaryImageOfPage: imageUrl } : {}),
    breadcrumb: breadcrumb([
      { name: "Ana Sayfa", path: "" },
      section,
      { name: title, path },
    ]),
  };

  const graph: object[] = [webPage];
  if (kind === "article") {
    graph.push({
      "@type": "Article",
      headline: title,
      description,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      author: { "@id": PERSON_ID },
      publisher: { "@id": CLINIC_ID },
      inLanguage: "tr-TR",
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(createdAt ? { datePublished: createdAt } : {}),
      ...(modified ? { dateModified: modified } : {}),
      ...(citations.length > 0 ? { citation: citations } : {}),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// JSON-LD betiğine gömülecek metin; içerikten gelen "<" betiği kapatamasın.
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
