"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

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
    // Ensure the requested video is first
    const sortedVideos = [
        { id: "ipcPGVNjQjA", title: "IIT Guwahati Live Project", description: "Real-time performance and AI integration demo." },
        ...videos.filter(v => v.id !== "ipcPGVNjQjA")
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sortedVideos.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, sortedVideos.length]);

    const nextVideo = () => {
        setCurrentIndex((prev) => (prev + 1) % sortedVideos.length);
        setIsAutoPlaying(false);
    };

    const prevVideo = () => {
        setCurrentIndex((prev) => (prev - 1 + sortedVideos.length) % sortedVideos.length);
        setIsAutoPlaying(false);
    };

    const getPosition = (index: number) => {
        const diff = (index - currentIndex + sortedVideos.length) % sortedVideos.length;
        if (diff === 0) return "center";
        if (diff === 1 || diff === - (sortedVideos.length - 1)) return "right";
        if (diff === sortedVideos.length - 1 || diff === -1) return "left";
        return "hidden";
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-10 perspective-1000">
            {title && (
                <h3 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {title}
                </h3>
            )}

            <div className="relative h-[600px] flex items-center justify-center">
                <AnimatePresence initial={false}>
                    {sortedVideos.map((video, index) => {
                        const position = getPosition(index);
                        if (position === "hidden") return null;

                        return (
                            <motion.div
                                key={video.id}
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: position === "center" ? 1 : 0.85,
                                    x: position === "center" ? 0 : position === "right" ? "50%" : "-50%",
                                    zIndex: position === "center" ? 10 : 5,
                                    opacity: position === "center" ? 1 : 0.6,
                                    rotateY: position === "center" ? 0 : position === "right" ? -25 : 25,
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                                onClick={() => {
                                    if (position !== "center") {
                                        setCurrentIndex(index);
                                        setIsAutoPlaying(false);
                                    }
                                }}
                            >
                                <div className="relative w-full h-full group">
                                    <iframe
                                        className="w-full h-full pointer-events-none"
                                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&modestbranding=1`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />

                                    {/* Overlay */}
                                    <div className={`absolute inset-0 bg-black/20 transition-opacity ${position === "center" ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`}>
                                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                            <h4 className="text-white font-bold text-lg">{video.title}</h4>
                                            <p className="text-gray-300 text-sm mt-1 line-clamp-2">{video.description}</p>
                                        </div>

                                        {position === "center" && (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Play className="w-8 h-8 text-white fill-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={prevVideo}
                    className="absolute left-4 md:left-20 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-primary transition-colors border border-white/10"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={nextVideo}
                    className="absolute right-4 md:right-20 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-primary transition-colors border border-white/10"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            <p className="text-center text-gray-400 mt-8 text-sm">
                Click on side videos to bring them to center
            </p>
        </div>
    );
}
