import styles from "./ServiceCard.module.css";

// Let's use simple text placeholders or simple SVGs if we don't have a library.
// For now, I will use a simple function to render icons or just a placeholder div.

export default function ServiceCard({ title, description, iconName, imageSrc }: { title: string, description: string, iconName?: string, imageSrc?: string }) {
  return (
    <div className={styles.card}>
      {imageSrc ? (
        <div style={{ width: "100%", height: "200px", borderRadius: "var(--radius-sm)", overflow: "hidden", marginBottom: "1rem" }}>
             {/* Using img for simplicity, in production next/image is better */}
            <img src={imageSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ) : (
        <div className={styles.icon}>
            {/* Placeholder for icon */ }
            <span>+</span>
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
