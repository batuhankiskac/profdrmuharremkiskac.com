import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.link}>
            Dashboard
          </Link>
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
        <div className={styles.user}>
          <span>{session.user?.email}</span>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
