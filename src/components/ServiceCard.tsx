import Link from "next/link";
import type { CSSProperties } from "react";
import { excerpt } from "@/lib/text";
import type { Service } from "@/types/content";
import buttonStyles from "@/styles/button.module.css";
import ArrowIcon from "./ArrowIcon";
import CardMedia from "./CardMedia";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  service: Service;
  // Liste içindeki sıra; giriş gecikmesi (--i) için kullanılır.
  index?: number;
};

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const fallback = service.title.toLocaleLowerCase("tr-TR").includes("diyabet")
    ? "/images/service-diabetes.webp"
    : "/images/service-nutrition.webp";

  return (
    <Link
      href={`/hizmetler/${service.id}`}
      className={styles.card}
      aria-label={`${service.title} hizmetini incele`}
      data-reveal
      style={{ "--i": index % 3 } as CSSProperties}
    >
      <CardMedia
        className={styles.media}
        src={service.imageUrl ?? fallback}
      />
      <h2 className={styles.title}>{service.title}</h2>
      <p className={styles.description}>{excerpt(service.description)}</p>
      <span className={styles.more}>
        Detayları Gör
        <ArrowIcon className={buttonStyles.icon} />
      </span>
    </Link>
  );
}
