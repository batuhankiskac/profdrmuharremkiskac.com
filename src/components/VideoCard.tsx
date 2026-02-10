import { useState } from "react";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
    id: string;
    title: string;
    youtubeId: string;
    image?: string;
}

export default function VideoCard({
    id,
    title,
    youtubeId,
    image,
}: VideoCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    // If "image" prop is passed, use it, otherwise fallback to standard YouTube thumb
    const thumbnail =
        image || `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    const handlePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPlaying(true);
    };

    return (
        <div className={styles.card}>
            {isPlaying ? (
                <div className={styles.videoContainer}>
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                        title={title}
                        className={styles.iframe}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className={styles.imageContainer} onClick={handlePlay}>
                    <img src={thumbnail} alt={title} className={styles.image} />
                    <div className={styles.playOverlay}>
                        <div className={styles.playButton}>▶</div>
                    </div>
                </div>
            )}
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
            </div>
        </div>
    );
}
