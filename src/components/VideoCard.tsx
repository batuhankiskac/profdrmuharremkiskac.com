import styles from "./VideoCard.module.css";

interface VideoCardProps {
    id: string;
    title: string;
    youtubeId: string;
    image?: string;
}

export default function VideoCard({ id, title, youtubeId, image }: VideoCardProps) {
    // If image is provided, use it. Otherwise use YouTube thumb.
    const thumbnail = image || `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    // Link to youtube or open modal? For now, external link or just visual placeholder.
    // The user requirement likely implies viewing it on the site or just checking it exists.
    // Simple: Link to youtube video.
    const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

    return (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={thumbnail} alt={title} className={styles.image} />
                <div className={styles.playOverlay}>
                    <div className={styles.playButton}>▶</div>
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
            </div>
        </a>
    );
}
