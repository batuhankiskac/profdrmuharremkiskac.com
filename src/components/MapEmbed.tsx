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
