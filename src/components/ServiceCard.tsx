import Link from "next/link";
import Image from "next/image";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ id, title, description, iconName, imageSrc }: { id: string, title: string, description: string, iconName?: string, imageSrc?: string }) {
  return (
    <Link href={`/hizmetler/${id}`} className={styles.card} style={{ textDecoration: "none", color: "inherit" }}>
      {imageSrc ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", borderRadius: "var(--radius-sm)", overflow: "hidden", marginBottom: "1rem" }}>
          <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
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
