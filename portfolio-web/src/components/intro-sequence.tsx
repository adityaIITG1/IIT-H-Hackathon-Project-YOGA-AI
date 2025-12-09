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
        <AnimatePresence>
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
    );
}
