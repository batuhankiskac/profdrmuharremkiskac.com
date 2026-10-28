import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import ArticleCard from "@/components/ArticleCard";
import ExternalLink from "@/components/ExternalLink";
import HomeServices from "@/components/home/HomeServices";
import bioData from "@/data/bio.json";
import contactData from "@/data/contact.json";
import { getArticles, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import buttonStyles from "@/styles/button.module.css";
import layoutStyles from "@/styles/layout.module.css";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Prof. Dr. Muharrem Kıskaç | İç Hastalıkları Uzmanı",
  description:
    "İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve bütüncül yaklaşım.",
  path: "/",
});

// Giriş şeridindeki üç çalışma alanı.
const FOCUS_AREAS = [
  { title: "İç Hastalıkları", label: "Erişkin sağlığında bütüncül değerlendirme" },
  { title: "Diyabet", label: "Kişiye özel tedavi ve düzenli takip" },
  { title: "Fonksiyonel Tıp", label: "Kök nedene odaklanan yaklaşım" },
];

const ARTICLE_LIMIT = 3;

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export default async function Home() {
  const [services, articles] = await Promise.all([getServices(), getArticles()]);
  const latestArticles = articles.slice(0, ARTICLE_LIMIT);
  const { addressLocality, addressRegion } = contactData.addressParts;
  const [firstBioParagraph] = bioData.bio_paragraphs;

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={layoutStyles.eyebrow} data-enter style={stagger(0)}>
              {bioData.title} · {addressLocality}, {addressRegion}
            </p>
            <h1 className={styles.heroTitle} data-enter style={stagger(1)}>
              Sağlıklı Bir Yaşam İçin
              <em className={styles.heroEm}>Bütüncül Yaklaşım</em>
            </h1>
            <p className={layoutStyles.lead} data-enter style={stagger(2)}>
              İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve
              kişiye özel yaklaşımlarla sağlığınızı korumanıza destek olmayı
              hedefliyoruz.
            </p>
            <div className={styles.ctas} data-enter style={stagger(3)}>
              <Link href="/iletisim" className={styles.primaryCta}>
                Randevu Al
                <ArrowIcon className={buttonStyles.icon} />
              </Link>
              <Link href="/hakkinda" className={styles.ghostCta}>
                Hakkımda
              </Link>
            </div>
            <ul className={styles.focusAreas} data-enter style={stagger(4)}>
              {FOCUS_AREAS.map((area) => (
                <li key={area.title} className={styles.focusArea}>
                  <span className={styles.focusTitle}>{area.title}</span>
                  <span className={styles.focusLabel}>{area.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.visual}>
            <div className={styles.frame} data-enter="mask" style={stagger(1)}>
              <Image
                src="/images/profile.jpg"
                alt={bioData.name}
                fill
                preload
                fetchPriority="high"
                sizes="(max-width: 899px) 100vw, 40vw"
                className={styles.frameImage}
              />
            </div>
            <div className={styles.idCard} data-enter="fade" style={stagger(5)}>
              <p className={styles.idName}>{bioData.name}</p>
              <p className={styles.idTitle}>{bioData.title}</p>
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 && <HomeServices services={services} />}

      <section
        className={`${layoutStyles.section} ${styles.about}`}
        aria-labelledby="home-about-title"
      >
        <div className={styles.aboutGrid}>
          <div className={styles.aboutMedia} data-reveal="scale">
            <Image
              src="/images/home-hero.avif"
              alt={bioData.name}
              fill
              sizes="(max-width: 899px) 100vw, 40vw"
              className={styles.aboutImage}
            />
          </div>

          <div className={styles.aboutText}>
            <h2 id="home-about-title" className={layoutStyles.eyebrow} data-reveal>
              02 · Hakkında
            </h2>
            <p className={styles.statement} data-reveal style={stagger(1)}>
              {bioData.short_bio}
            </p>
            <p className={styles.body} data-reveal style={stagger(2)}>
              {firstBioParagraph}
            </p>
            <Link
              href="/hakkinda"
              className={buttonStyles.link}
              data-reveal
              style={stagger(3)}
            >
              Biyografinin tamamı
              <ArrowIcon className={buttonStyles.icon} />
            </Link>
          </div>
        </div>
      </section>

      {latestArticles.length > 0 && (
        <section
          className={layoutStyles.section}
          aria-labelledby="home-articles-title"
        >
          <div className={layoutStyles.container}>
            <div className={styles.sectionHead} data-reveal>
              <div className={styles.sectionTitle}>
                <span className={layoutStyles.eyebrow}>03</span>
                <h2 id="home-articles-title" className={layoutStyles.h2}>
                  Makaleler
                </h2>
              </div>
              <Link href="/makaleler" className={buttonStyles.link}>
                Tüm makaleler
                <ArrowIcon className={buttonStyles.icon} />
              </Link>
            </div>

            <div className={styles.articleGrid}>
              {/* Kartın reveal'ini ArticleCard yapar; çift animasyon olmasın. */}
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className={`${layoutStyles.dark} ${styles.videos}`}
        aria-labelledby="home-videos-title"
      >
        <div className={layoutStyles.container}>
          <div className={styles.videosContent}>
            <span className={layoutStyles.eyebrow} data-reveal>
              04 · Videolar
            </span>
            <h2
              id="home-videos-title"
              className={styles.videosTitle}
              data-reveal
              style={stagger(1)}
            >
              Videolar ve İçerikler
            </h2>
            <p className={styles.videosText} data-reveal style={stagger(2)}>
              Sağlıklı yaşam, beslenme ve hastalıklar hakkında detaylı bilgilere
              ulaşabileceğiniz videolarımıza göz atın.
            </p>
            <div className={styles.videosActions} data-reveal style={stagger(3)}>
              <Link href="/videolar" className={styles.lightCta}>
                Video Galerisine Git
                <ArrowIcon className={buttonStyles.icon} />
              </Link>
              <ExternalLink
                href={contactData.social.youtube}
                className={styles.ghostLightCta}
              >
                YouTube kanalı
                <ArrowIcon className={buttonStyles.icon} direction="up-right" />
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
