import styles from "./LoadingState.module.css";

export default function LoadingState({
  label = "İçerik hazırlanıyor…",
}: {
  label?: string;
}) {
  return (
    <div className={styles.state} role="status" aria-live="polite">
      <span className={styles.track} aria-hidden="true">
        <span className={styles.bar} />
      </span>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
