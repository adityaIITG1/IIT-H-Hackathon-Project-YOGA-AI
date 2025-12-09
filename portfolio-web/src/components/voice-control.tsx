"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Command } from "lucide-react";

// Add type definition for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const sectionKeywords = [
    { id: "home", keywords: ["home", "top", "intro", "start", "beginning"] },
    { id: "about", keywords: ["about", "myself", "bio", "profile", "who are you"] },
    { id: "certificates", keywords: ["certificate", "certification", "achievement", "award", "degree"] },
    { id: "tech-stack", keywords: ["tech", "skill", "stack", "technology", "tool", "language"] },
    { id: "python-libraries", keywords: ["python", "library", "framework", "pandas", "numpy"] },
    { id: "project-showcase", keywords: ["showcase", "featured", "best project", "highlight"] },
    { id: "projects", keywords: ["project", "work", "portfolio", "creation", "app"] },
    { id: "contact", keywords: ["contact", "email", "touch", "message", "reach"] },
];

export function VoiceControl() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.warn("Speech recognition not supported");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false; // Changed to false to avoid repeated triggers
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback("Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            // Don't clear feedback immediately so user can see what was heard
            setTimeout(() => setFeedback(""), 3000);
        };

        recognition.onresult = (event: any) => {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(command);
            handleCommand(command);
        };

        const handleCommand = (command: string) => {
            setFeedback(`Heard: "${command}"`);

            // Check for scroll commands
            let foundSection = false;
            for (const section of sectionKeywords) {
                if (section.keywords.some(keyword => command.includes(keyword))) {
                    const element = document.getElementById(section.id);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        setFeedback(`Navigating to ${section.id.replace('-', ' ')}...`);
                        foundSection = true;
                        break;
                    }
                }
            }

            if (!foundSection) {
                setFeedback("Command not understood. Try 'Go to About'...");
            }
        };

        if (isListening) {
            try {
                recognition.start();
            } catch (e) {
                console.error("Recognition already started");
            }
        }

        // Cleanup function
        return () => {
            // We don't stop recognition here to allow toggle logic to work cleanly
            // relying on state is better
            recognition.onend = null; // Prevent loops
            if (isListening) recognition.stop();
        };
    }, [isListening]);

    const toggleListening = () => {
        setIsListening(!isListening);
    };

    return (
        <div className="fixed bottom-8 left-8 z-50">
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-20 left-0 bg-black/80 text-white px-6 py-3 rounded-xl text-sm whitespace-nowrap backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-3"
                    >
                        <Command className="w-4 h-4 text-primary" />
                        {feedback}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggleListening}
                className={`p-4 rounded-full shadow-2xl transition-all duration-300 border ${isListening
                    ? "bg-red-500 text-white animate-pulse border-red-400 shadow-red-500/50"
                    : "bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border-white/10 hover:border-primary/50"
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
