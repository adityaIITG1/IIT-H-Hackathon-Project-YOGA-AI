"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Github, Star, GitFork, ExternalLink, Code, Terminal, ArrowRight } from "lucide-react";

const codeSnippet = `
class PromptEngineer:
    def __init__(self, model="gpt-4"):
        self.model = model
        self.context_window = 128000
        
    def generate_system_architecture(self, requirements):
        """
        Generates a scalable microservices architecture
        based on user requirements.
        """
        prompt = f"""
        Design a high-availability system for: {requirements}
        Include:
        - Docker/K8s configuration
        - CI/CD pipelines (GitHub Actions)
        - Database schema (PostgreSQL + Redis)
        """
        return self.ai.complete(prompt)

    def optimize_performance(self, code_base):
        # Analyzing 7000+ lines of code...
        # Identifying bottlenecks...
        # Refactoring for O(n) complexity...
        return "Performance improved by 300%"
`;

export function GithubShowcase() {
    const [repos, setRepos] = useState<any[]>([]);
    const [typedCode, setTypedCode] = useState("");

    useEffect(() => {
        // Simulate typing effect
        let i = 0;
        const interval = setInterval(() => {
            setTypedCode(codeSnippet.slice(0, i));
            i++;
            if (i > codeSnippet.length) clearInterval(interval);
        }, 30);

        // Fetch GitHub Repos (Mock data for now to ensure "Beautiful" look, can be replaced with real API)
        setRepos([
            {
                name: "Yoga-AI-Trainer",
                description: "Real-time yoga pose correction using Computer Vision & AI.",
                stars: 124,
                forks: 45,
                language: "Python",
                url: "https://github.com/adityaIITG1/Yoga-AI"
            },
            {
                name: "Generative-Art-Engine",
                description: "AI-powered tool to generate abstract art from text prompts.",
                stars: 89,
                forks: 23,
                language: "TypeScript",
                url: "https://github.com/adityaIITG1"
            },
            {
                name: "Automated-Trading-Bot",
                description: "High-frequency trading bot using reinforcement learning.",
                stars: 256,
                forks: 89,
                language: "Python",
                url: "https://github.com/adityaIITG1"
            }
        ]);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="github" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Open Source <span className="text-gradient">Contributions</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Exploring the frontiers of AI and Software Engineering.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Code Window */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30" />
                        <div className="relative bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                            {/* Window Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-4 text-xs text-gray-400 font-mono flex items-center gap-2">
                                    <Terminal className="w-3 h-3" /> prompt_engineer.py
                                </div>
                            </div>
                            {/* Code Area */}
                            <div className="p-6 font-mono text-sm overflow-x-auto">
                                <pre className="text-green-400">
                                    <code>{typedCode}</code>
                                    <span className="animate-pulse">|</span>
                                </pre>
                            </div>
                        </div>
                    </motion.div>

                    {/* Repo Grid */}
                    <div className="space-y-6">
                        {repos.map((repo, index) => (
                            <motion.div
                                key={repo.name}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className="group hover:border-primary/50 transition-colors" hoverEffect>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                                <Github className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                                {repo.name}
                                            </h3>
                                        </div>
                                        <a
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <p className="text-gray-400 mb-6 line-clamp-2">
                                        {repo.description}
                                    </p>
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            {repo.language}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4" />
                                            {repo.stars}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork className="w-4 h-4" />
                                            {repo.forks}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center pt-4"
                        >
                            <a
                                href="https://github.com/adityaIITG1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                View all repositories <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
