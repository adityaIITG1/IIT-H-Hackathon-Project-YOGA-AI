"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Youtube } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
    const [particles, setParticles] = useState<Array<{ x: number, y: number, scale: number, duration: number, size: number }>>([]);

    useEffect(() => {
        setParticles([...Array(20)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 5 + 5,
            size: Math.random() * 4 + 1
        })));
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

                {/* Neural Network Effect */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                    {particles.map((p, i) => (
                        particles.map((p2, j) => {
                            if (i < j) {
                                const dx = p.x - p2.x;
                                const dy = p.y - p2.y;
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                if (distance < 20) {
                                    return (
                                        <motion.line
                                            key={`${i}-${j}`}
                                            x1={`${p.x}%`}
                                            y1={`${p.y}%`}
                                            x2={`${p2.x}%`}
                                            y2={`${p2.y}%`}
                                            stroke="white"
                                            strokeWidth="1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: (20 - distance) / 20 * 0.5 }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                        />
                                    );
                                }
                            }
                            return null;
                        })
                    ))}
                </svg>

                {/* Particle Effects */}
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        initial={{
                            opacity: 0,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            scale: p.scale,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, Math.random() * 10 - 5, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: p.size + "px",
                            height: p.size + "px",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-md">
                        🚀 Gen AI Prompt Engineer & Aspiring Data Scientist
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="perspective-1000"
                >
                    <motion.h1
                        className="text-5xl md:text-8xl font-bold mb-6 tracking-tight"
                        whileHover={{
                            rotateX: 10,
                            rotateY: -10,
                            scale: 1.05,
                            textShadow: "0px 10px 20px rgba(0,0,0,0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Hi, I'm <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">Aditya</span>
                    </motion.h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
                >
                    Building intelligent systems that bridge the gap between complex AI models and beautiful user interfaces.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-3 rounded-full bg-white text-black font-bold transition-all hover:scale-105 flex items-center gap-2"
                    >
                        View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="https://github.com/adityaIITG1" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/aditya-kumar-singh-39245525b" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://youtube.com/@iitg_student" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
