import styles from "./page.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hoşgeldiniz</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Hizmetler</h2>
          <p>Hizmetlerinizi yönetin, düzenleyin veya yeni hizmet ekleyin.</p>
        </div>
        <div className={styles.card}>
          <h2>Makaleler</h2>
          <p>Blog yazılarınızı ve makalelerinizi buradan yönetebilirsiniz.</p>
        </div>
        <div className={styles.card}>
          <h2>Videolar</h2>
          <p>Youtube videolarınızı siteye ekleyin veya kaldırın.</p>
        </div>
      </div>
    </div>
  );
}
