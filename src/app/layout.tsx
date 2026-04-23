import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Prof. Dr. Muharrem Kıskaç | İç Hastalıkları Uzmanı",
  description: "Prof. Dr. Muharrem Kıskaç resmi web sitesi. İç hastalıkları, diyabet ve fonksiyonel tıp uzmanı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-10815764688"
        />
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10815764688');
              gtag('config', 'AW-10815764688/n3JqCOfT_e8bENDxraUo', {
                'phone_conversion_number': '05322193364'
              });
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${playfair.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
