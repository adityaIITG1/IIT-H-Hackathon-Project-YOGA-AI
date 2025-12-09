"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["ASPIRING AI/ML ENGINEER", "DATA SCIENTIST", "PROMPT GEN AI ENGINEER", "Youtube CONTENT CREATOR [ BSIITIAN ]", "BS @ IIT GUWAHATI"];

export default function CinematicIntro() {
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
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -1000 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[101] bg-black flex items-center justify-center overflow-hidden"
                >
                    <div className="relative w-full max-w-6xl mx-auto text-center px-4">
                        <motion.h1
                            key={index}
                            initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                            exit={{ opacity: 0, y: -40, filter: "blur(12px)", scale: 1.05 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        >
                            {words[index]}
                        </motion.h1>
                    </div>

                    {/* Loading Bar */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--primary)]"
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
