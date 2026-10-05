import type { Metadata } from "next";
import ContentGrid from "@/components/ContentGrid";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Videolar",
  description: "Sağlıklı yaşam rehberi videoları.",
  alternates: { canonical: "/videolar" },
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Videolar</h1>
      <ContentGrid>
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        ) : (
          <EmptyState>Henüz yayınlanmış bir video bulunmuyor.</EmptyState>
        )}
      </ContentGrid>
    </main>
  );
}
