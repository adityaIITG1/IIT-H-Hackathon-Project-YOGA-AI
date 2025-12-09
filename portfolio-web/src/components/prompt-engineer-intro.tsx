"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const codeSnippet = `
// INITIALIZING AGI CORE...
// LOADING CONTEXT WINDOW... 1,000,000 TOKENS
// UPLOADING PROMPT: "SOLVE GLOBAL ENERGY CRISIS"
// OPTIMIZING NEURAL PATHWAYS...
// GENERATING SOLUTION...

class Singularity {
    constructor() {
        this.intelligence = Infinity;
        this.empathy = true;
    }

    solve(problem) {
        const context = this.readAllHumanKnowledge();
        const solution = this.synthesize(context, problem);
        return solution;
    }
}

// EXECUTING...
// SUCCESS. 
// SYSTEM READY.
`;

// Repeat the snippet to simulate massive scrolling
const massiveCode = Array(50).fill(codeSnippet).join("\n");

export function PromptEngineerIntro() {
    const [phase, setPhase] = useState<"typing" | "reveal" | "complete">("typing");
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        // Phase 1: Typing/Scrolling (0-2s)
        const timer1 = setTimeout(() => {
            setPhase("reveal");
        }, 2000);

        // Phase 2: Reveal Title (2-4s)
        const timer2 = setTimeout(() => {
            setShowContent(false);
            setPhase("complete");
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <AnimatePresence>
            {showContent && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[100] bg-black text-green-500 font-mono overflow-hidden"
                >
                    {/* Background Matrix/Code Rain Effect */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: -5000 }}
                            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                            className="text-xs md:text-sm leading-tight whitespace-pre"
                        >
                            {massiveCode}
                        </motion.div>
                    </div>

                    {/* Central Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        {phase === "typing" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-4xl bg-black/80 border border-green-500/30 p-6 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.2)] backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2 mb-4 border-b border-green-500/20 pb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-2 text-xs text-green-400">AGI_CONSOLE_V9.exe</span>
                                </div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-xl md:text-3xl font-bold text-white mb-2">
                                        &gt; GENERATING 10,000+ LINES PROMPT...
                                    </p>
                                    <p className="text-green-400 text-sm md:text-base animate-pulse">
                                        █ Processing user intent...
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}

                        {phase === "reveal" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.8, type: "spring" }}
                                className="text-center relative"
                            >
                                <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full" />
                                <h1 className="relative z-10 text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-emerald-600 tracking-tighter mb-4">
                                    ADITYA
                                </h1>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-6"
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="relative z-10 text-xl md:text-2xl font-bold text-white tracking-[0.5em] uppercase"
                                >
                                    Prompt Engineer
                                </motion.p>
                            </motion.div>
                        )}
                    </div>

                    {/* Progress Loader at Bottom */}
                    <div className="absolute bottom-10 left-0 w-full px-10">
                        <div className="w-full h-1 bg-green-900/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 7, ease: "linear" }}
                                className="h-full bg-green-500 shadow-[0_0_20px_#22c55e]"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-green-500/50 mt-2 font-mono">
                            <span>INITIALIZING SYSTEM</span>
                            <span>{(new Date().getFullYear())}</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
