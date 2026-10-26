import type { CSSProperties } from "react";
import Image from "next/image";
import bioData from "@/data/bio.json";
import { pageMetadata } from "@/lib/metadata";
import { excerpt } from "@/lib/text";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Hakkında",
  description: excerpt(bioData.short_bio),
  path: "/hakkinda",
});

// Kariyer çizelgesi yalnız biyografi paragraflarındaki tarih ve olgulardan oluşur.
const CAREER = [
  { year: "1996", label: "İstanbul (Çapa) Tıp Fakültesi'ne birincilikle girdi" },
  { year: "2002", label: "TUS ile Okmeydanı E.A.H. iç hastalıkları asistanı oldu" },
  { year: "2007–2010", label: "Siirt Devlet Hastanesi'nde mecburi hizmet" },
  { year: "2010", label: "Bezmialem Vakıf Üniversitesi Tıp Fakültesi'nde çalışmaya başladı" },
  { year: "2015", label: "Yardımcı doçent doktor unvanını aldı" },
  { year: "2016", label: "Doçent doktor unvanını aldı" },
  { year: "2022", label: "Profesörlük unvanını aldı" },
  { year: "2025", label: "Bakırköy'de özel muayenehanesinde hasta kabulüne devam ediyor" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.layout}>
        <figure className={styles.media} data-enter="mask">
          {/* next/image fill, sticky üst öğeyi kabul etmez; göreli iç çerçeve. */}
          <div className={styles.frame}>
            <Image
              src="/images/profile.jpg"
              alt="Prof. Dr. Muharrem Kıskaç"
              fill
              preload
              sizes="(max-width: 899px) 100vw, 42vw"
              className={styles.image}
            />
          </div>
        </figure>

        <div className={styles.content}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-enter style={{ "--i": 0 } as CSSProperties}>
              Hakkında
            </p>
            <h1 className={styles.title} data-enter style={{ "--i": 1 } as CSSProperties}>
              {bioData.name}
            </h1>
            <p className={styles.lead} data-enter style={{ "--i": 2 } as CSSProperties}>
              {bioData.title}
            </p>
          </header>

          <p className={styles.statement} data-reveal>
            {bioData.short_bio}
          </p>

          <div className={styles.prose}>
            {bioData.bio_paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-reveal
                style={{ "--i": index % 4 } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <section className={styles.career} aria-labelledby="kariyer-baslik">
            <h2
              id="kariyer-baslik"
              className={styles.careerTitle}
              data-reveal
            >
              Kariyer
            </h2>
            <ol className={styles.timeline}>
              {CAREER.map((item, index) => (
                <li
                  key={item.year}
                  className={styles.item}
                  data-reveal
                  style={{ "--i": index % 4 } as CSSProperties}
                >
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.label}>{item.label}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
