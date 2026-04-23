import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.image}></div>
            <div className={styles.content}>
                <div className={styles.title}></div>
                <div className={styles.text}></div>
                <div className={styles.text}></div>
            </div>
        </div>
    );
}
