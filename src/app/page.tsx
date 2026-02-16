import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Blurred Background Layer */}
        <div className={styles.heroBackground} />

        {/* Dark Overlay for Readability */}
        <div className={styles.heroOverlay} />

        {/* Hero Content */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Sağlıklı Bir Yaşam İçin <br />
            <span className={styles.heroSubtitle}>Bütüncül Yaklaşım</span>
          </h1>

          <p className={styles.heroText}>
            İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve kişiye özel çözümlerle sağlığınızı en üst seviyeye taşıyın.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/hakkinda" className={styles.primaryButton}>
              Hakkımda
            </Link>
            <Link href="/hizmetler" className={styles.secondaryButton}>
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section Removed as per request */}

      {/* Videos / Content Section */}
      <section className={styles.videosSection}>
        <h2 className={styles.sectionTitle}>
          Videolar ve İçerikler
        </h2>
        <p className={styles.sectionText}>
          Sağlıklı yaşam, beslenme ve hastalıklar hakkında detaylı bilgilere ulaşabileceğiniz videolarımıza göz atın.
        </p>

        <div className={styles.videosContainer}>
          <Link href="/videolar" className={styles.primaryButton}>
            Video Galerisine Git
          </Link>
        </div>
      </section>
    </main>
  );
}
