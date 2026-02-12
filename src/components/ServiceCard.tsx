import Link from "next/link";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ id, title, description, iconName, imageSrc }: { id: string, title: string, description: string, iconName?: string, imageSrc?: string }) {
  return (
    <Link href={`/hizmetler/${id}`} className={styles.card} style={{ textDecoration: "none", color: "inherit" }}>
      {imageSrc ? (
        <div style={{ width: "100%", height: "200px", borderRadius: "var(--radius-sm)", overflow: "hidden", marginBottom: "1rem" }}>
          {/* Using img for simplicity, in production next/image is better */}
          <img src={imageSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ) : (
        <div className={styles.icon}>
          {/* Placeholder for icon */}
          <span>+</span>
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description.substring(0, 150)}...</p>
    </Link>
  );
}
