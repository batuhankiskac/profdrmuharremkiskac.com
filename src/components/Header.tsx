"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        Prof. Dr. Muharrem Kıskaç
      </Link>

      <button
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Menüyü Aç/Kapat"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
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
