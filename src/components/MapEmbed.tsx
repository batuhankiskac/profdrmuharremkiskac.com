"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MapEmbed.module.css";

interface MapEmbedProps {
  address: string;
  title: string;
}

// Google Haritalar içeriği yalnızca kullanıcı istediğinde yüklenir.
export default function MapEmbed({ address, title }: MapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Buton kaldırıldığında klavye odağı haritaya taşınır.
  useEffect(() => {
    if (isLoaded) iframeRef.current?.focus();
  }, [isLoaded]);

  return (
    <div className={styles.frame}>
      {isLoaded ? (
        <iframe
          ref={iframeRef}
          title={title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            address,
          )}&output=embed`}
          className={styles.iframe}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className={styles.placeholder}>
          <svg
            className={styles.pin}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <p className={styles.note}>
            Harita, Google Haritalar üzerinden yüklenir. Gösterdiğinizde Google
            içeriği yüklenecek ve Google çerez kullanabilecektir.
          </p>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsLoaded(true)}
          >
            Haritayı göster
          </button>
        </div>
      )}
    </div>
  );
}
