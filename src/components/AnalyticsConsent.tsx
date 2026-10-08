"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { OPEN_CONSENT_EVENT } from "@/lib/consent";
import styles from "./AnalyticsConsent.module.css";

type ConsentState = "accepted" | "rejected" | null;

const STORAGE_KEY = "analytics-consent";
const GTM_ID = "GTM-5DGZ7QV3";

const CONSENT_TYPES = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

function consentPayload(value: "granted" | "denied") {
  return Object.fromEntries(CONSENT_TYPES.map((type) => [type, value]));
}

// Consent Mode v2: GTM her ziyarette yüklenir fakat onay verilene kadar
// çerez yazmaz; Google Ads reddeden ziyaretçiler için dönüşümü modelleyebilir.
// Varsayılan "denied" gtm.js olayından önce dataLayer'a girmelidir.
const GTM_BOOTSTRAP = `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',${JSON.stringify({ ...consentPayload("denied"), wait_for_update: 500 })});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try{if(localStorage.getItem('${STORAGE_KEY}')==='accepted'){gtag('consent','update',${JSON.stringify(consentPayload("granted"))});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// gtag komutları dizi değil arguments nesnesi olarak beklenir.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function updateConsent(value: Exclude<ConsentState, null>) {
  gtag(
    "consent",
    "update",
    consentPayload(value === "accepted" ? "granted" : "denied"),
  );
}

// Telefon ve WhatsApp bağlantıları (makale içindekiler dahil) GTM'de
// dönüşüm etiketi tetiklemek için tek bir olayla bildirilir.
function contactMethod(link: HTMLAnchorElement) {
  const href = link.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) return "phone";
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp";
  return null;
}

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

  // Başka sekmede verilen tercih bu sekmedeki GTM'e de iletilir.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === STORAGE_KEY &&
        (event.newValue === "accepted" || event.newValue === "rejected")
      ) {
        updateConsent(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      const method = link && contactMethod(link);
      if (!method) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "contact_click",
        contact_method: method,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  const choose = (value: Exclude<ConsentState, null>) => {
    writeConsent(value);
    updateConsent(value);
    setShowPreferences(false);
    if (returnFocusRef.current?.isConnected) {
      returnFocusRef.current.focus();
    }
    returnFocusRef.current = null;
  };

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: GTM_BOOTSTRAP }}
      />

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
