"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import styles from "./AnalyticsConsent.module.css";

type ConsentState = "accepted" | "rejected" | null;

const STORAGE_KEY = "analytics-consent";

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DGZ7QV3');`,
          }}
        />
      )}

      {ready && consent === null && (
        <aside
          className={styles.banner}
          aria-label="Çerez ve analiz tercihi"
          aria-live="polite"
        >
          <p>
            Site deneyimini ve reklam dönüşümlerini ölçmek için isteğe bağlı
            analiz çerezleri kullanıyoruz.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => choose("rejected")}
            >
              Reddet
            </button>
            <button
              type="button"
              className={styles.primary}
              onClick={() => choose("accepted")}
            >
              Kabul Et
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
