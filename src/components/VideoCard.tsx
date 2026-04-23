import { useState } from "react";
import Image from "next/image";
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

    const [imgSrc, setImgSrc] = useState(
        image || `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    );

    const handleImageError = () => {
        setImgSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    };

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
                    <Image src={imgSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} className={styles.image} onError={handleImageError} />
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
