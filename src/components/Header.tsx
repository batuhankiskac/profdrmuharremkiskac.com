"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        Prof. Dr. Muharrem Kıskaç
      </Link>

      <button
        ref={buttonRef}
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        id="primary-navigation"
        aria-label="Ana menü"
        className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}
      >
        <Link href="/" className={styles.navLink} onClick={closeMenu}>Ana Sayfa</Link>
        <Link href="/hakkinda" className={styles.navLink} onClick={closeMenu}>Hakkında</Link>
        <Link href="/hizmetler" className={styles.navLink} onClick={closeMenu}>Hizmetler</Link>
        <Link href="/makaleler" className={styles.navLink} onClick={closeMenu}>Makaleler</Link>
        <Link href="/videolar" className={styles.navLink} onClick={closeMenu}>Videolar</Link>

        <Link href="/iletisim" className={styles.ctaButton} onClick={closeMenu}>Randevu Al</Link>
      </nav>
    </header>
  );
}
