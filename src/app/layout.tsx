import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://profdrmuharremkiskac.com"),
  title: {
    default: "Prof. Dr. Muharrem Kıskaç | İç Hastalıkları Uzmanı",
    template: "%s | Prof. Dr. Muharrem Kıskaç",
  },
  description:
    "Prof. Dr. Muharrem Kıskaç resmi web sitesi. İç hastalıkları, diyabet ve fonksiyonel tıp uzmanı.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Prof. Dr. Muharrem Kıskaç",
    title: "Prof. Dr. Muharrem Kıskaç | İç Hastalıkları Uzmanı",
    description:
      "İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve bütüncül yaklaşım.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. Dr. Muharrem Kıskaç | İç Hastalıkları Uzmanı",
    description:
      "İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve bütüncül yaklaşım.",
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
