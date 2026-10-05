import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { SITE_NAME } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

// Yalnız tüm sayfalar için geçerli varsayılanlar; sayfaya özel başlık, url ve
// canonical her sayfada pageMetadata() ile tanımlanır.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prof. Dr. Muharrem Kıskaç | İç Hastalıkları Uzmanı",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Prof. Dr. Muharrem Kıskaç resmi web sitesi. İç hastalıkları, diyabet ve fonksiyonel tıp uzmanı.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${outfit.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
