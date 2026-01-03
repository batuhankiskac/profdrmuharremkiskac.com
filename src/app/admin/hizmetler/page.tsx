"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import styles from "./page.module.css";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "services", id));
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Silme işlemi başarısız oldu.");
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hizmetler</h1>
        <Link href="/admin/hizmetler/ekle" className={styles.addButton}>
          Yeni Hizmet Ekle
        </Link>
      </div>

      <div className={styles.list}>
        {services.length === 0 ? (
          <p>Henüz eklenmiş bir hizmet yok.</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className={styles.listItem}>
              <div>
                <h3>{service.title}</h3>
                <p className={styles.description}>
                  {service.description.substring(0, 100)}...
                </p>
              </div>
              <div className={styles.actions}>
                <Link
                  href={`/admin/hizmetler/duzenle/${service.id}`}
                  className={styles.editButton}
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
                  className={styles.deleteButton}
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
