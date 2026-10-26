import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  children: ReactNode;
  eyebrow?: string;
};

// Boş liste durumu: küçük üst etiket ve mesaj. Eylem butonu yoktur.
export default function EmptyState({
  children,
  eyebrow = "Yakında",
}: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status">
      <span className={styles.eyebrow}>{eyebrow}</span>
      <p className={styles.message}>{children}</p>
    </div>
  );
}
