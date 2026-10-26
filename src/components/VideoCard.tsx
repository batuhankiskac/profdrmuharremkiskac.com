"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { videoThumbnail } from "@/lib/youtube";
import type { Video } from "@/types/content";
import CardMedia from "./CardMedia";
import styles from "./VideoCard.module.css";

type VideoCardProps = {
  video: Video;
  // Liste içindeki sıra; giriş gecikmesi (--i) için kullanılır.
  index?: number;
};

export default function VideoCard({ video, index = 0 }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const thumbnail = videoThumbnail(video);

  // Oynat butonu kaldırıldığında klavye odağı kaybolmasın diye iframe'e taşınır.
  useEffect(() => {
    if (isPlaying) iframeRef.current?.focus();
  }, [isPlaying]);

  return (
    <article
      className={styles.card}
      data-reveal
      style={{ "--i": index % 3 } as CSSProperties}
    >
      {isPlaying ? (
        <div className={styles.videoContainer}>
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <CardMedia
          className={styles.media}
          src={thumbnail}
          onClick={() => setIsPlaying(true)}
          buttonLabel={`${video.title} videosunu oynat`}
        >
          <span className={styles.playOverlay} aria-hidden="true">
            <span className={styles.playButton}>
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M8 6.2v11.6L17.6 12z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </CardMedia>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>
          <span className={styles.titleText}>{video.title}</span>
        </h2>
      </div>
    </article>
  );
}
