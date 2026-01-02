import styles from "./ServiceCard.module.css";

// Let's use simple text placeholders or simple SVGs if we don't have a library.
// For now, I will use a simple function to render icons or just a placeholder div.

export default function ServiceCard({ title, description, iconName }: { title: string, description: string, iconName?: string }) {
  // Simple icon placeholder logic
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {/* Placeholder for icon */ }
        <span>+</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
