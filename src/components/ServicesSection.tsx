"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit as firestoreLimit } from "firebase/firestore";
import { db } from "@/firebase/config";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import styles from "@/app/hizmetler/page.module.css";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
}

interface ServicesSectionProps {
    limit?: number;
    showButton?: boolean;
}

export default function ServicesSection({ limit, showButton }: ServicesSectionProps) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let q = collection(db, "services");
                // We can add ordering or limiting here if needed.
                // For simplicity, fetching all and slicing in JS, or using simple limit.
                // Assuming 'createdAt' field might not exist on old data, so just fetching collection.

                const querySnapshot = await getDocs(q);
                const fetchedServices: Service[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedServices.push({ id: doc.id, ...doc.data() } as Service);
                });

                setServices(fetchedServices);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const displayedServices = limit ? services.slice(0, limit) : services;

    if (loading) {
        return <div style={{ padding: "5rem", textAlign: "center" }}>Yükleniyor...</div>;
    }

    return (
        <section style={{
            padding: "5rem 2rem",
            background: "var(--color-bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>


            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 400px))",
                justifyContent: "center",
                gap: "2rem",
                width: "100%",
                maxWidth: "1200px"
            }}>
                {displayedServices.length > 0 ? displayedServices.map((service) => {
                    // Fallback images if not in data (or we can use the logic from page.tsx)
                    // Ideally image should be in the DB.
                    let img = service.image || "";
                    if (!img) {
                        if (service.title.toLowerCase().includes('diyabet')) img = "/images/service-diabetes.png";
                        else img = "/images/service-nutrition.png";
                    }

                    return (
                        <ServiceCard
                            key={service.id}
                            id={service.id}
                            title={service.title}
                            description={service.description}
                            iconName={service.icon}
                            imageSrc={img}
                        />
                    );
                }) : (
                    <p style={{ gridColumn: "1 / -1", color: "var(--color-text-light)", textAlign: "center" }}>Hizmetlerimiz yakında eklenecektir.</p>
                )}
            </div>

            {showButton && (
                <div style={{ marginTop: "3rem" }}>
                    <Link href="/hizmetler" style={{
                        color: "var(--color-primary)",
                        fontWeight: "600",
                        borderBottom: "2px solid var(--color-secondary)",
                        paddingBottom: "2px"
                    }}>
                        Tüm Hizmetleri Görüntüle &rarr;
                    </Link>
                </div>
            )}
        </section>
    );
}
