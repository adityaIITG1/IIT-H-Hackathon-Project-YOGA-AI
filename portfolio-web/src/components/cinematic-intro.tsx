"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["DATA SCIENTIST", "PROMPT ENGINEER", "AI/ML EXPERT", "ADITYA"];

export function CinematicIntro() {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === words.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 1000);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -1000 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                >
                    <div className="relative">
                        <motion.h1
                            key={index}
                            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                            transition={{ duration: 0.5 }}
                            className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary tracking-tighter"
                        >
                            {words[index]}
                        </motion.h1>

                        {/* Glitch Effect Layers */}
                        <motion.div
                            className="absolute inset-0 text-6xl md:text-9xl font-black text-primary opacity-50 mix-blend-screen"
                            animate={{ x: [-2, 2, -2], y: [2, -2, 2] }}
                            transition={{ repeat: Infinity, duration: 0.1 }}
                        >
                            {words[index]}
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 text-6xl md:text-9xl font-black text-secondary opacity-50 mix-blend-screen"
                            animate={{ x: [2, -2, 2], y: [-2, 2, -2] }}
                            transition={{ repeat: Infinity, duration: 0.1 }}
                        >
                            {words[index]}
                        </motion.div>
                    </div>

                    {/* Loading Bar */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.5, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
