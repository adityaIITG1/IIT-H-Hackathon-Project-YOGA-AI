"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Linkedin, MapPin, Link as LinkIcon, Users, Building } from "lucide-react";

export function LinkedInShowcase() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                        Professional Network
                    </h2>

                    <GlassCard className="p-0 overflow-hidden relative group">
                        {/* Banner */}
                        <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
                        </div>

                        <div className="px-6 md:px-8 pb-8 relative">
                            {/* Profile Picture */}
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black bg-gray-800 absolute -top-16 md:-top-20 overflow-hidden">
                                {/* Placeholder for user image - using a generic avatar or the uploaded one if available */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl">
                                    👨‍💻
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="mt-24 md:mt-28 flex flex-col md:flex-row justify-between items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">Aditya Kumar Singh</h3>
                                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/50">✓</span>
                                    </div>
                                    <p className="text-gray-300 mt-1 max-w-2xl">
                                        Data Science & AI Undergraduate (IIT Guwahati + AKTU) | Building ETL Pipelines & Scalable Systems | Aspiring Data Engineer 🚀
                                    </p>

                                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Building className="w-4 h-4" /> Indian Institute of Technology, Guwahati
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> Prayagraj, Uttar Pradesh, India
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4 text-sm font-medium text-blue-400">
                                        <span className="hover:underline cursor-pointer">3,647 followers</span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                        <span className="hover:underline cursor-pointer">500+ connections</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href="https://www.linkedin.com/in/aditya-kumar-singh-39245525b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <Linkedin className="w-4 h-4" /> Connect
                                    </a>
                                    <button className="px-6 py-2 rounded-full border border-blue-500 text-blue-400 font-medium hover:bg-blue-500/10 transition-colors">
                                        Message
                                    </button>
                                </div>
                            </div>

                            {/* Featured Section */}
                            <div className="mt-12">
                                <h4 className="text-xl font-bold text-white mb-6">Featured</h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer group/card">
                                            <div className="h-32 bg-gray-800 relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                                    <div className="w-full">
                                                        <div className="text-xs text-blue-400 mb-1">Post</div>
                                                        <div className="text-sm text-white font-medium line-clamp-2 group-hover/card:text-blue-400 transition-colors">
                                                            Excited to share my latest project on Generative AI and Computer Vision! #AI #MachineLearning
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 flex justify-between items-center text-xs text-gray-400 bg-white/5">
                                                <span>{100 * i} likes</span>
                                                <span>{10 * i} comments</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
