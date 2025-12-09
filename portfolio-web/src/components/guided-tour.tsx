"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Compass } from "lucide-react";

export function GuidedTour() {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { id: "home", duration: 4000 },
        { id: "about", duration: 8000 },
        { id: "certificates", duration: 6000 },
        { id: "tech-stack", duration: 6000 },
        { id: "python-libraries", duration: 5000 },
        { id: "project-showcase", duration: 8000 },
        { id: "projects", duration: 8000 },
        { id: "contact", duration: 5000 },
    ];

    const startTour = () => {
        setIsActive(true);
        setCurrentStep(0);
    };

    const stopTour = () => {
        setIsActive(false);
        setCurrentStep(0);
    };

    useEffect(() => {
        if (!isActive) return;

        const step = steps[currentStep];
        const element = document.getElementById(step.id);

        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        const timer = setTimeout(() => {
            if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1);
            } else {
                stopTour();
            }
        }, step.duration);

        return () => clearTimeout(timer);
    }, [isActive, currentStep]);

    return (
        <>
            {/* Start Button (Visible only when tour is inactive) */}
            <AnimatePresence>
                {!isActive && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            boxShadow: ["0 0 0 rgba(139, 92, 246, 0)", "0 0 20px rgba(139, 92, 246, 0.5)", "0 0 0 rgba(139, 92, 246, 0)"]
                        }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        onClick={startTour}
                        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group border border-white/20"
                    >
                        <Compass className="w-6 h-6 animate-pulse" />
                        <span className="text-lg">Start Tour</span>
                        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Tour Controls (Visible when active) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl shadow-primary/20"
                    >
                        <span className="text-sm font-medium text-white flex items-center gap-2">
                            <Compass className="w-4 h-4 text-primary animate-spin-slow" />
                            Touring: <span className="text-primary capitalize font-bold">{steps[currentStep]?.id?.replace('-', ' ')}</span>
                        </span>
                        <button
                            onClick={stopTour}
                            className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                        >
                            <Square className="w-4 h-4 fill-current" />
                        </button>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-linear rounded-full"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
