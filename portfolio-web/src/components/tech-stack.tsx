"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Database, Layers, Code, Terminal } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

const techCategories = [
    {
        title: "AI & Machine Learning",
        icon: <Cpu className="w-6 h-6 text-purple-400" />,
        skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "MediaPipe", "Scikit-learn", "YOLOv8", "LLMs", "LangChain"]
    },
    {
        title: "Full Stack Development",
        icon: <Globe className="w-6 h-6 text-blue-400" />,
        skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "FastAPI"]
    },
    {
        title: "Data & Cloud",
        icon: <Database className="w-6 h-6 text-green-400" />,
        skills: ["MongoDB", "Firebase", "PostgreSQL", "Google Cloud", "AWS", "Git/GitHub"]
    },
    {
        title: "Tools & Others",
        icon: <Terminal className="w-6 h-6 text-orange-400" />,
        skills: ["Docker", "Linux", "VS Code", "Jupyter", "Arduino", "Figma"]
    }
];

export function TechStack() {
    return (
        <section id="tech-stack" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Technical <span className="text-gradient">Arsenal</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="h-full bg-white/5 border-white/5 hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-white/5">
                                        {category.icon}
                                    </div>
                                    <h3 className="font-bold text-lg">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-1 text-xs font-mono rounded bg-black/40 text-gray-300 border border-white/5 hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
