"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

// Add type definition for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

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
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback("Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            setTimeout(() => setFeedback(""), 2000);
        };

        recognition.onresult = (event: any) => {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(command);
            handleCommand(command);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    const handleCommand = (command: string) => {
        setFeedback(`Heard: "${command}"`);

        if (command.includes("home") || command.includes("top")) {
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("about") || command.includes("me")) {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("project") || command.includes("work")) {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("contact") || command.includes("email")) {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("github") || command.includes("code")) {
            document.getElementById("github")?.scrollIntoView({ behavior: "smooth" });
        } else {
            setFeedback("Command not recognized");
        }
    };

    const toggleListening = () => {
        setIsListening(!isListening);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: 50 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-16 left-0 bg-black/80 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap backdrop-blur-md border border-white/10"
                    >
                        {feedback}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggleListening}
                className={`p-4 rounded-full shadow-lg transition-colors ${isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10"
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
