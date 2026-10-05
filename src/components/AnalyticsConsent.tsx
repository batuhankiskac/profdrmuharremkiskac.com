"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { OPEN_CONSENT_EVENT } from "@/lib/consent";
import styles from "./AnalyticsConsent.module.css";

type ConsentState = "accepted" | "rejected" | null;

const STORAGE_KEY = "analytics-consent";

// localStorage erişilemediğinde (ör. Safari gizli mod) tercih bellekte tutulur.
let memoryConsent: ConsentState = null;
const listeners = new Set<() => void>();

function readConsent(): ConsentState {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "rejected") return saved;
  } catch {}
  return memoryConsent;
}

function writeConsent(value: Exclude<ConsentState, null>) {
  memoryConsent = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export default function AnalyticsConsent() {
  const consent = useSyncExternalStore<ConsentState | "unknown">(
    subscribe,
    readConsent,
    () => "unknown",
  );
  const [showPreferences, setShowPreferences] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const open = () => {
      // Tercih seçildikten sonra odak, paneli açan öğeye geri döner.
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setShowPreferences(true);
      // Panel zaten görünürse odak hemen taşınır.
      firstButtonRef.current?.focus();
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  // "Çerez tercihleri" ile açılan panelde odak ilk butona taşınır.
  useEffect(() => {
    if (showPreferences) firstButtonRef.current?.focus();
  }, [showPreferences]);

  // Başka sekmede onay geri çekilirse yüklenmiş GTM'i durdurmak için yenilenir.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === STORAGE_KEY &&
        event.oldValue === "accepted" &&
        event.newValue === "rejected"
      ) {
        window.location.reload();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const choose = (value: Exclude<ConsentState, null>) => {
    const previous = consent;
    writeConsent(value);
    setShowPreferences(false);
    if (returnFocusRef.current?.isConnected) {
      returnFocusRef.current.focus();
    }
    returnFocusRef.current = null;
    // Yüklenmiş GTM'i durdurmanın tek yolu sayfayı yenilemektir.
    if (previous === "accepted" && value === "rejected") {
      window.location.reload();
    }
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

      {consent !== "unknown" && (consent === null || showPreferences) && (
        <aside
          className={styles.banner}
          aria-label="Çerez ve analiz tercihi"
          aria-describedby="analytics-consent-description"
        >
          <p id="analytics-consent-description">
            Site deneyimini ve reklam dönüşümlerini ölçmek için isteğe bağlı
            analiz çerezleri kullanıyoruz.
          </p>
          <div className={styles.actions}>
            <button
              ref={firstButtonRef}
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
