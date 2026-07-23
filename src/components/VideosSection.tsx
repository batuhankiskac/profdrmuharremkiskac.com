import { getVideos } from "@/lib/content";
import ContentGrid from "./ContentGrid";
import EmptyState from "./EmptyState";
import VideoCard from "./VideoCard";

export default async function VideosSection({ limit }: { limit?: number }) {
  const videos = await getVideos();
  const displayed = limit ? videos.slice(0, limit) : videos;

  return (
    <ContentGrid>
      {displayed.length > 0 ? (
        displayed.map((video) => <VideoCard key={video.id} video={video} />)
      ) : (
        <EmptyState>Henüz yayınlanmış bir video bulunmuyor.</EmptyState>
      )}
    </ContentGrid>
  );
}
