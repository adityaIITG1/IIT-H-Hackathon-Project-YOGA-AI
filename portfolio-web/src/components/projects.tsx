"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { ExternalLink, Github, Trophy } from "lucide-react";
import { VideoGallery } from "./video-gallery";

const projectVideos = [
    {
        id: "ipcPGVNjQjA",
        title: "IIT Guwahati Live Project",
        description: "Real-time performance and AI integration demo."
    },
    {
        id: "7IIGeClYXvQ",
        title: "Project Demo 1",
        description: "Showcasing the core features and user interface of the project."
    },
    {
        id: "v4RFdwpPqBc",
        title: "Project Demo 2",
        description: "Deep dive into the technical implementation and architecture."
    },
    {
        id: "no-_5qOyNlw",
        title: "Project Demo 3",
        description: "Highlighting the real-time performance and AI integration."
    },
    {
        id: "5zoFV5vbmlw",
        title: "Project Demo 4",
        description: "Demonstrating the scalability and robustness of the system."
    },
];

const topProjectVideos = [
    {
        id: "DwTb3zTigDU",
        title: "Top Project 1",
        description: "A revolutionary AI project demonstrating advanced computer vision capabilities."
    },
    {
        id: "bZddmT-zG7U",
        title: "Top Project 2",
        description: "Innovative machine learning application solving real-world problems."
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A selection of my recent work, including hackathon wins and AI innovations.
                    </p>
                </motion.div>

                {/* Hackathon Win */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <GlassCard className="border-primary/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Trophy className="w-40 h-40 text-yellow-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                                <h3 className="text-2xl font-bold text-yellow-500">Winner: Technosavvys NXT Hackathon</h3>
                            </div>
                            <p className="text-gray-300 text-lg mb-6">
                                Recognized for innovative problem-solving and technical excellence.
                            </p>
                            <a
                                href="https://github.com/adityaIITG1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-medium"
                            >
                                <Github className="w-5 h-5" /> View Repositories
                            </a>
                        </div>
                    </GlassCard>
                </motion.div>

                <div className="space-y-20">
                    <VideoGallery videos={projectVideos} title="Project Showcases" />
                    <VideoGallery videos={topProjectVideos} title="Top Projects" />
                </div>

                <div className="mt-20 text-center">
                    <a
                        href="https://github.com/adityaIITG1?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                        <Github className="w-6 h-6" /> View All Projects on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
