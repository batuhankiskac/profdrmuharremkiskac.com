import Link from "next/link";
import { excerpt } from "@/lib/text";
import type { Service } from "@/types/content";
import CardMedia from "./CardMedia";
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
      <CardMedia
        className={styles.imageContainer}
        src={service.imageUrl ?? fallback}
      />
      <h2 className={styles.title}>{service.title}</h2>
      <p className={styles.description}>{excerpt(service.description)}</p>
    </Link>
  );
}
