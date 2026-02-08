"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import VideoCard from "@/components/VideoCard";

interface Video {
    id: string;
    title: string;
    youtubeId: string;
    image?: string;
    createdAt?: any;
}

interface VideosSectionProps {
    limit?: number;
}

export default function VideosSection({ limit }: VideosSectionProps) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                let q = collection(db, "videos");
                const querySnapshot = await getDocs(q);
                const fetchedVideos: Video[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedVideos.push({ id: doc.id, ...doc.data() } as Video);
                });

                fetchedVideos.sort((a, b) => {
                    const dateA = a.createdAt?.seconds || 0;
                    const dateB = b.createdAt?.seconds || 0;
                    return dateB - dateA;
                });

                setVideos(fetchedVideos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const displayedVideos = limit ? videos.slice(0, limit) : videos;

    if (loading) {
        return <div style={{ padding: "5rem", textAlign: "center" }}>Yükleniyor...</div>;
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto"
        }}>
            {displayedVideos.length > 0 ? displayedVideos.map((video) => (
                <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    youtubeId={video.youtubeId}
                    image={video.image}
                />
            )) : (
                <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--color-text-light)" }}>
                    Video bulunamadı.
                </p>
            )}
        </div>
    );
}
