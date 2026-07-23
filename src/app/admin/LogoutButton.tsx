"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./layout.module.css";

export default function LogoutButton() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setSubmitting(true);
    await fetch("/api/session", { method: "DELETE" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={logout}
      disabled={submitting}
      className={styles.signOutButton}
    >
      {submitting ? "Çıkış yapılıyor..." : "Çıkış Yap"}
    </button>
  );
}
