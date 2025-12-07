"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Code, Cpu, Globe, Zap, MapPin, GraduationCap } from "lucide-react";
import { VideoGallery } from "./video-gallery";
import { TechStack3D } from "./tech-stack-3d";
import { Timeline } from "./timeline";

const stats = [
    { label: "Projects Delivered", value: "5+" },
    { label: "Years Experience", value: "2+" },
    { label: "Hackathons Won", value: "1" },
    { label: "Lines of Code Gen", value: "7000+" },
];

const skills = [
    "Python", "SQL", "Azure", "ETL Pipelines", "Spark", "AWS", "Cloud Computing", "Data Engineering", "React", "Next.js", "Generative AI", "Computer Vision", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"
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

const experienceVideos = [
    {
        id: "sKwTv76F-qM",
        title: "Data Science Experience",
        description: "Exploring the depths of data science at IIT Guwahati."
    },
    {
        id: "hbTvs4Bq9mU",
        title: "Campus Impression",
        description: "A glimpse into the vibrant campus life and academic atmosphere."
    },
    {
        id: "ipcPGVNjQjA",
        title: "IITG Channel Feature",
        description: "Featured on the official IIT Guwahati channel for academic excellence."
    },
    {
        id: "eAdZKgDoWZk",
        title: "Experience Section",
        description: "Sharing insights and learnings from my journey as a dual degree student."
    },
    {
        id: "n8bC5k4YYbo",
        title: "Professors Conversation",
        description: "Engaging discussions with leading professors in AI and Data Science."
    },
    {
        id: "NBnbKNUrufw",
        title: "First Experience",
        description: "My first impressions and early days at the institute."
    },
];

export function About() {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        "I don't just write code; I engineer prompts that build worlds."
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="h-full flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                                <Code className="w-24 h-24" />
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 shrink-0">
                                    <img
                                        src="/profile.jpg"
                                        alt="Aditya Kumar Singh"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Aditya Kumar Singh</h3>
                                    <p className="text-primary font-medium">Gen AI Prompt Engineer | YouTuber @ BS IITIAN | Aspiring Data Scientist ⚡</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                        <MapPin className="w-4 h-4" /> Prayagraj, Uttar Pradesh
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <Timeline />
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-secondary" /> Education
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>B.Tech in CSE (AI & ML) - AKTU (2024-2028)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                        <span>BSc Hons in Data Science & AI - IIT Guwahati</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">Prompt Eng.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-secondary/20 text-secondary">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">Data Science</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-accent/20 text-accent">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">AI & ML</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-500">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">Gen AI</span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard className="text-center py-8" hoverEffect>
                                        <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>

                        <GlassCard className="overflow-hidden">
                            <h4 className="text-lg font-semibold mb-4">Tech Stack (Interactive)</h4>
                            <TechStack3D />
                        </GlassCard>
                    </div>
                </div>

                {/* Top Projects Section */}
                <div className="mb-20">
                    <VideoGallery videos={topProjectVideos} title="Top Projects" />
                </div>

                {/* Student Experience Videos */}
                <VideoGallery videos={experienceVideos} title="Student Experience @ IIT Guwahati" />
            </div>
        </section>
    );
}
