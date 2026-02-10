"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import styles from "./layout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Clear the cookie
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return null; // or a spinner while redirecting
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <nav className={styles.nav}>

          <Link href="/admin/hizmetler" className={styles.link}>
            Hizmetler
          </Link>
          <Link href="/admin/makaleler" className={styles.link}>
            Makaleler
          </Link>
          <Link href="/admin/videolar" className={styles.link}>
            Videolar
          </Link>
        </nav>

        <div className={styles.userSection}>
          <div className={styles.user}>
            <span>{user?.email}</span>
          </div>
          <button onClick={handleSignOut} className={styles.signOutButton}>
            Çıkış Yap
          </button>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
