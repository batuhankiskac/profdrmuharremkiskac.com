"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public içerik yüklenemedi:", error);
  }, [error]);

  return (
    <main className={styles.container}>
      <h1>İçerik şu anda yüklenemiyor</h1>
      <p className={styles.message}>
        Geçici bir bağlantı sorunu oluştu. Biraz sonra yeniden deneyebilirsiniz.
      </p>
      <button type="button" className={styles.retry} onClick={reset}>
        Yeniden dene
      </button>
    </main>
  );
}
