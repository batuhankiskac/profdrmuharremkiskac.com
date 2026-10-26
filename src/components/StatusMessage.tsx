import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import buttonStyles from "@/styles/button.module.css";
import styles from "./StatusMessage.module.css";

type StatusAction = { href: string } | { onAction: () => void };

type StatusMessageProps = {
  eyebrow?: string;
  title: string;
  message: string;
  actionLabel: string;
} & StatusAction;

// Hata ve 404 ekranlarının ortak kabuğu: etiket, başlık, mesaj ve tek bir eylem.
export default function StatusMessage({
  eyebrow,
  title,
  message,
  actionLabel,
  ...action
}: StatusMessageProps) {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        {"href" in action ? (
          <Link href={action.href} className={styles.action}>
            {actionLabel}
            <ArrowIcon className={buttonStyles.icon} />
          </Link>
        ) : (
          <button
            type="button"
            className={styles.action}
            onClick={() => action.onAction()}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </main>
  );
}
