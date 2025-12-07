import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "./ui/glass-card";
import { Play } from "lucide-react";
import { VideoModal } from "./video-modal";

export interface Video {
    id: string;
    title: string;
    description?: string;
}

interface VideoGalleryProps {
    videos: Video[];
    title?: string;
}

export function VideoGallery({ videos, title }: VideoGalleryProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    // Ensure the requested video is first
    const sortedVideos = [
        { id: "ipcPGVNjQjA", title: "IIT Guwahati Live Project", description: "Real-time performance and AI integration demo." },
        ...videos.filter(v => v.id !== "ipcPGVNjQjA")
    ];

    return (
        <div className="w-full py-10">
            {title && (
                <h3 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {title}
                </h3>
            )}

            {/* Reels Container - Horizontal Scroll Snap */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-10 px-6 md:px-20 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {sortedVideos.map((video) => (
                    <motion.div
                        key={video.id}
                        className="snap-center shrink-0 w-[280px] md:w-[320px] aspect-[9/16] relative rounded-2xl overflow-hidden group cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 25px 5px rgba(59, 130, 246, 0.5)" // Touch to Glow effect
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedVideo(video)}
                    >
                        <GlassCard className="w-full h-full p-0 overflow-hidden border-0 bg-black/40">
                            <iframe
                                className="w-full h-full pointer-events-none"
                                src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&modestbranding=1`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                                        <Play className="w-4 h-4 text-white fill-white" />
                                    </div>
                                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Reel</span>
                                </div>
                                <h4 className="text-white font-bold text-lg leading-tight mb-1">{video.title}</h4>
                                <p className="text-gray-300 text-xs line-clamp-2">{video.description}</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
                <span className="animate-pulse">←</span> Swipe to explore <span className="animate-pulse">→</span>
            </p>

            {/* Video Modal */}
            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoId={selectedVideo?.id || ""}
                title={selectedVideo?.title || ""}
            />
        </div>
    );
}
