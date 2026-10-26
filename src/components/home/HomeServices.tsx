import type { CSSProperties } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import buttonStyles from "@/styles/button.module.css";
import layoutStyles from "@/styles/layout.module.css";
import type { Service } from "@/types/content";
import styles from "./HomeServices.module.css";

const MAX_ITEMS = 6;

// Ana sayfada hizmetler: kart yerine büyük tipografili, çizgili bir liste.
export default function HomeServices({ services }: { services: Service[] }) {
  const items = services.slice(0, MAX_ITEMS);

  return (
    <section
      className={layoutStyles.section}
      aria-labelledby="home-services-title"
    >
      <div className={layoutStyles.container}>
        <div className={styles.head} data-reveal>
          <span className={layoutStyles.eyebrow}>01</span>
          <h2 id="home-services-title" className={layoutStyles.h2}>
            Uzmanlık Alanları
          </h2>
        </div>

        <ul className={styles.list}>
          {items.map((service, index) => (
            <li
              key={service.id}
              className={styles.item}
              data-reveal
              style={{ "--i": index % 4 } as CSSProperties}
            >
              <Link href={`/hizmetler/${service.id}`} className={styles.row}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.title}>{service.title}</h3>
                {service.description && (
                  <p className={styles.desc}>{service.description}</p>
                )}
                <ArrowIcon className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.more} data-reveal>
          <Link href="/hizmetler" className={buttonStyles.link}>
            Tüm hizmetler
            <ArrowIcon className={buttonStyles.icon} />
          </Link>
        </div>
      </div>
    </section>
  );
}
