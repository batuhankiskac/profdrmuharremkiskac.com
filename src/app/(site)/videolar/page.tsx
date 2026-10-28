import { Suspense, type CSSProperties } from "react";
import ExternalLink from "@/components/ExternalLink";
import LoadingState from "@/components/LoadingState";
import PublicContentList from "@/components/PublicContentList";
import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import contactData from "@/data/contact.json";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Videolar",
  description: "Prof. Dr. Muharrem Kıskaç'ın iç hastalıkları, diyabet ve sağlıklı yaşam üzerine videoları.",
  path: "/videolar",
});

export default function VideosPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow} data-enter>
          Sağlıklı yaşam
        </p>
        <h1
          className={styles.title}
          data-enter
          style={{ "--i": 1 } as CSSProperties}
        >
          Videolar
        </h1>
      </header>
      <div className={styles.body}>
        <Suspense fallback={<LoadingState />}>
          <PublicContentList
            load={getVideos}
            emptyText={
              <>
                Videolarımız çok yakında burada olacak. O zamana kadar{" "}
                <ExternalLink href={contactData.social.youtube}>
                  YouTube kanalımıza
                </ExternalLink>{" "}
                göz atabilirsiniz.
              </>
            }
            renderItem={(video, index) => (
              <VideoCard video={video} index={index} />
            )}
          />
        </Suspense>
      </div>
    </main>
  );
}
