import Link from "next/link";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main style={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <section style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
        textAlign: "center",
        color: "white"
      }}>
        {/* Blurred Background Layer */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/home-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: 0
        }} />

        {/* Dark Overlay for Readability */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1
        }} />

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            color: "white",
            maxWidth: "900px",
            lineHeight: "1.1",
            marginBottom: "1rem"
          }}>
            Sağlıklı Bir Yaşam İçin <br />
            <span style={{ fontStyle: "italic", color: "#FDFBF7" }}>Bütüncül Yaklaşım</span>
          </h1>

          <p style={{
            fontSize: "1.25rem",
            color: "#F1EFE9",
            maxWidth: "700px",
            lineHeight: "1.6",
            margin: "0 auto 2rem auto"
          }}>
            İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve kişiye özel çözümlerle sağlığınızı en üst seviyeye taşıyın.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/hakkinda" style={{
              padding: "1rem 2.5rem",
              background: "var(--color-primary)",
              color: "white",
              borderRadius: "var(--radius-lg)",
              fontWeight: "600",
              boxShadow: "0 4px 14px 0 rgba(255, 255, 255, 0.2)"
            }}>
              Hakkımda
            </Link>
            <Link href="/hizmetler" style={{
              padding: "1rem 2.5rem",
              background: "transparent",
              border: "2px solid white",
              color: "white",
              borderRadius: "var(--radius-lg)",
              fontWeight: "600"
            }}>
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section Removed as per request */}

      {/* Videos / Content Section */}
      <section style={{
        padding: "5rem 2rem",
        background: "var(--color-bg-alt)",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem"
        }}>
          Videolar ve İçerikler
        </h2>
        <p style={{
          maxWidth: "600px",
          margin: "0 auto 3rem auto",
          color: "var(--color-text-light)"
        }}>
          Sağlıklı yaşam, beslenme ve hastalıklar hakkında detaylı bilgilere ulaşabileceğiniz videolarımıza göz atın.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>


          <Link href="/videolar" style={{
            padding: "1rem 2.5rem",
            background: "var(--color-primary)",
            color: "white",
            borderRadius: "var(--radius-lg)",
            fontWeight: "600"
          }}>
            Video Galerisine Git
          </Link>
        </div>
      </section>
    </main>
  );
}
