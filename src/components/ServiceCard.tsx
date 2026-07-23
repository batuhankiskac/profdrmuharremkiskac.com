import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/content";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ service }: { service: Service }) {
  const fallback = service.title.toLocaleLowerCase("tr-TR").includes("diyabet")
    ? "/images/service-diabetes.webp"
    : "/images/service-nutrition.webp";

  return (
    <Link
      href={`/hizmetler/${service.id}`}
      className={styles.card}
      aria-label={`${service.title} hizmetini incele`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={service.imageUrl ?? fallback}
          alt=""
          fill
          className={styles.image}
          sizes="(max-width: 700px) 100vw, 400px"
        />
      </div>
      <h2 className={styles.title}>{service.title}</h2>
      <p className={styles.description}>{service.description}</p>
    </Link>
  );
}
