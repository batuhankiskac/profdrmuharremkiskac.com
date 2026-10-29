import type { CSSProperties } from "react";
import Script from "next/script";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import styles from "../makaleler/page.module.css";

// Blog yazıları Soro tarafından istemcide #soro-blog içine yüklenir.
// Soro'da embed etkinleşip yazılar incelenene kadar sayfa gizli tutulur:
// menüde ve site haritasında yer almaz, dizine eklenmez.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Blog",
    description: "Sağlık, diyabet ve beslenme üzerine yazılar.",
    path: "/blog",
  }),
  robots: { index: false, follow: true },
};

const SORO_EMBED_SRC =
  "https://app.trysoro.com/api/embed/a82c2480-4d7b-4157-b37a-fc0c8b3aa8e4";

export default function BlogPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow} data-enter>
          Yazılar
        </p>
        <h1
          className={styles.title}
          data-enter
          style={{ "--i": 1 } as CSSProperties}
        >
          Blog
        </h1>
      </header>
      <div className={styles.body}>
        <div id="soro-blog" />
        <Script src={SORO_EMBED_SRC} strategy="afterInteractive" />
      </div>
    </main>
  );
}
