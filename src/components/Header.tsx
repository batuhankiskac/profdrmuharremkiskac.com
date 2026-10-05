"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contactLink, isActivePath, navigationLinks } from "@/data/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sayfa değiştiğinde menü kapanır (render sırasında durum ayarlama).
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
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
        type="button"
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
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
        className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.navLink}
            aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href={contactLink.href}
          className={styles.ctaButton}
          aria-current={
            isActivePath(pathname, contactLink.href) ? "page" : undefined
          }
          onClick={closeMenu}
        >
          Randevu Al
        </Link>
      </nav>
    </header>
  );
}
