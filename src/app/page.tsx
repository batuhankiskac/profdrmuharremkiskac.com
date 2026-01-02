import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2.5rem",
      background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(246,249,251,1) 100%)",
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

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/hakkinda" style={{
          padding: "1rem 2.5rem",
          background: "var(--color-primary)",
          color: "white",
          borderRadius: "var(--radius-lg)",
          fontWeight: "600",
          boxShadow: "0 4px 14px 0 rgba(15, 76, 92, 0.39)"
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
    </main>
  );
}
