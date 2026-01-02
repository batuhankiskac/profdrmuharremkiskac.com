import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import servicesData from "@/data/services.json";

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
        background: "linear-gradient(135deg, #FDFBF7 0%, #F1EFE9 100%)",
        padding: "2rem",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "700",
          color: "var(--color-primary)",
          maxWidth: "900px",
          lineHeight: "1.1"
        }}>
          Sağlıklı Bir Yaşam İçin <br />
          <span style={{ fontStyle: "italic", color: "var(--color-secondary)" }}>Bütüncül Yaklaşım</span>
        </h1>

        <p style={{
          fontSize: "1.25rem",
          color: "var(--color-text-light)",
          maxWidth: "700px",
          lineHeight: "1.6"
        }}>
          İç hastalıkları, diyabet ve fonksiyonel tıp alanında bilimsel ve kişiye özel çözümlerle sağlığınızı en üst seviyeye taşıyın.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/hakkinda" style={{
            padding: "1rem 2.5rem",
            background: "var(--color-primary)",
            color: "white",
            borderRadius: "var(--radius-lg)",
            fontWeight: "600",
            boxShadow: "0 4px 14px 0 rgba(74, 93, 78, 0.2)"
          }}>
            Hakkımda
          </Link>
          <Link href="/hizmetler" style={{
            padding: "1rem 2.5rem",
            background: "transparent",
            border: "2px solid var(--color-primary)",
            color: "var(--color-primary)",
            borderRadius: "var(--radius-lg)",
            fontWeight: "600"
          }}>
            Hizmetlerimiz
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: "5rem 2rem",
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          marginBottom: "3rem",
          textAlign: "center"
        }}>
          Uzmanlık Alanları
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px"
        }}>
          {servicesData.slice(0, 3).map((service) => (
             <ServiceCard
               key={service.id}
               title={service.title}
               description={service.description}
               iconName={service.icon}
             />
          ))}
        </div>

        <div style={{ marginTop: "3rem" }}>
             <Link href="/hizmetler" style={{
              color: "var(--color-primary)",
              fontWeight: "600",
              borderBottom: "2px solid var(--color-secondary)",
              paddingBottom: "2px"
            }}>
              Tüm Hizmetleri Görüntüle &rarr;
            </Link>
        </div>
      </section>

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

        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
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
