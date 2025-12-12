"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PromptEngineerIntro } from "./prompt-engineer-intro";
import CinematicIntro from "./cinematic-intro";

export function IntroSequence() {
    const [phase, setPhase] = useState<"prompt" | "cinematic" | "complete">("prompt");

    useEffect(() => {
        // Phase 1: Prompt Engineer Intro (0-4s)
        const timer1 = setTimeout(() => {
            setPhase("cinematic");
        }, 4000);

        // Phase 2: Cinematic Intro (Starts at 4s, dura 5 words * 1.5s = 7.5s. Total ~12s)
        const timer2 = setTimeout(() => {
            setPhase("complete");
        }, 13000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    if (phase === "complete") return null;

    return (
        <>
            <AnimatePresence mode="wait">
                {phase === "prompt" && (
                    <motion.div
                        key="prompt"
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                    >
                        <PromptEngineerIntro />
                    </motion.div>
                )}
                {phase === "cinematic" && <CinematicIntro key="cinematic" />}
            </AnimatePresence>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setPhase("complete")}
                className="fixed bottom-10 right-10 z-[100] px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all text-sm font-medium tracking-wider uppercase"
            >
                Skip Intro
            </motion.button>
        </>
    );
}
