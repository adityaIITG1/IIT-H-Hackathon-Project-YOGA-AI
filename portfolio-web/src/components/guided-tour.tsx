"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square } from "lucide-react";

export function GuidedTour() {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { id: "home", duration: 3000 },
        { id: "about", duration: 8000 }, // Longer for reading/watching
        { id: "projects", duration: 8000 },
        { id: "contact", duration: 4000 },
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
            {/* Start Button (Visible only when tour is inactive and scrolled to top) */}
            <AnimatePresence>
                {!isActive && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={startTour}
                        className="fixed bottom-8 right-8 z-40 bg-primary text-black font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-current" /> Start Tour
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
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-4"
                    >
                        <span className="text-sm font-medium text-white">
                            Touring: <span className="text-primary capitalize">{steps[currentStep].id}</span>
                        </span>
                        <button
                            onClick={stopTour}
                            className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                        >
                            <Square className="w-4 h-4 fill-current" />
                        </button>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ease-linear"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
