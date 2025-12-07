"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Github, ExternalLink, Terminal, ArrowRight, Sparkles, Brain, Zap, Globe } from "lucide-react";

const promptSnippet = `
class SuperPrompt:
    def __init__(self, goal="AGI"):
        self.context = "Expert System"
        self.constraints = ["No Hallucinations", "Optimized Token Usage"]
        
    def generate_chain_of_thought(self, query):
        """
        Generates a multi-step reasoning path
        for complex problem solving.
        """
        prompt = f"""
        Role: {self.context}
        Task: Solve {query}
        Strategy:
        1. Deconstruct problem into sub-tasks
        2. Retrieve relevant knowledge chunks
        3. Synthesize answer with citation
        4. Verify logic against constraints
        """
        return self.llm.execute(prompt)
`;

const projects = [
    {
        title: "SustainifyAI",
        description: "Bridging the gap between raw climate data and actionable governance. AI-driven insights for regions facing rapid environmental changes.",
        tags: ["Python", "AI", "Climate Data", "Governance"],
        color: "from-green-400 to-emerald-600",
        icon: <Globe className="w-6 h-6 text-white" />,
        link: "https://github.com/adityaIITG1/SustainifyAI"
    },
    {
        title: "Digital Kuthputli",
        description: "AI-Powered Rajasthani Puppetry. A puppet that comes alive through your bare hands using Computer Vision, preserving cultural heritage with tech.",
        tags: ["Python", "Computer Vision", "MediaPipe", "Culture Tech"],
        color: "from-orange-400 to-red-600",
        icon: <Zap className="w-6 h-6 text-white" />,
        link: "https://github.com/adityaIITG1/Digital_Kuthputli"
    },
    {
        title: "AstraPredictor",
        description: "Military logistics forecasting system. Predicts supply needs (fuel, food, meds) for terrains like Siachen and Thar Desert using AI.",
        tags: ["Python", "Predictive AI", "Logistics", "Defense"],
        color: "from-blue-500 to-indigo-700",
        icon: <Brain className="w-6 h-6 text-white" />,
        link: "https://github.com/adityaIITG1/AstraPredictor"
    },
    {
        title: "Personality Predictor",
        description: "AI system that predicts Big 5 personality traits from Resumes (CV) using NLP and Machine Learning. Streamlining HR processes.",
        tags: ["Python", "NLP", "Machine Learning", "Psychology"],
        color: "from-purple-400 to-pink-600",
        icon: <Sparkles className="w-6 h-6 text-white" />,
        link: "https://github.com/adityaIITG1/personality-predictor"
    },
    {
        title: "Touchless Cursor",
        description: "Control your computer mouse with hand gestures. A CV-based accessibility tool for touchless interaction.",
        tags: ["Python", "OpenCV", "HCI", "Accessibility"],
        color: "from-cyan-400 to-blue-600",
        icon: <Terminal className="w-6 h-6 text-white" />,
        link: "https://github.com/adityaIITG1/Touchless_Cursor"
    }
];

export function ProjectShowcase() {
    const [typedCode, setTypedCode] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedCode(promptSnippet.slice(0, i));
            i++;
            if (i > promptSnippet.length) clearInterval(interval);
        }, 20);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
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
                        Merging creativity with code. Here are some of my "Solid" builds.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Code Window - Prompt Engineering */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30" />
                        <div className="relative bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-4 text-xs text-gray-400 font-mono flex items-center gap-2">
                                    <Terminal className="w-3 h-3" /> prompt_architect.py
                                </div>
                            </div>
                            <div className="p-6 font-mono text-sm overflow-x-auto h-[300px]">
                                <pre className="text-blue-400">
                                    <code>{typedCode}</code>
                                    <span className="animate-pulse">|</span>
                                </pre>
                            </div>
                        </div>
                    </motion.div>

                    {/* Intro Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <h3 className="text-3xl font-bold mb-4">Engineering the Future with AI</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            My work focuses on building intelligent systems that can understand, reason, and create.
                            From computer vision models that correct your posture to generative engines that create art,
                            I push the boundaries of what's possible with code.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {["Prompt Engineering", "Computer Vision", "LLMs", "System Design"].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Visual Project Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="h-full p-0 overflow-hidden group" hoverEffect>
                                {/* Visual Header */}
                                <div className={`h-48 bg-gradient-to-br ${project.color} relative p-6 flex flex-col justify-between`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    <div className="relative z-10 flex justify-between items-start">
                                        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md shadow-lg">
                                            {project.icon}
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <h3 className="relative z-10 text-2xl font-bold text-white mt-auto">{project.title}</h3>
                                </div>

                                {/* Content Body */}
                                <div className="p-6">
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed min-h-[80px]">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                                    >
                                        View Project <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
