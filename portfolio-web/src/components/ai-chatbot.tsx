"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
}

const KNOWLEDGE_BASE = {
    default: "I'm Aditya's AI assistant. I can tell you about his skills, projects, or experience. Try asking 'What are his skills?' or 'Tell me about Yoga AI'.",
    skills: "Aditya is a pro at Python, React, Next.js, and Generative AI. He's also a Prompt Engineering wizard!",
    projects: "He has built amazing projects like Yoga AI (Computer Vision), Generative Art Engine, and this premium portfolio!",
    experience: "He is a Dual Degree student at IIT Guwahati and AKTU, with over 2 years of experience in building AI-driven systems.",
    contact: "You can reach him at iitianadityakumarsingh@gmail.com or connect on LinkedIn.",
    python: "Yes! He has extensive experience with Python, especially for AI/ML and backend development.",
    react: "He builds stunning UIs using React, Next.js, and Framer Motion (like this chatbot!).",
    hello: "Hi there! How can I help you explore Aditya's portfolio?",
    hi: "Hello! Ask me anything about Aditya.",
};

export function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hi! I'm Aditya's AI Assistant. Ask me anything!", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleTrigger = (e: CustomEvent<{ message: string }>) => {
            setIsOpen(true);
            const userMsg: Message = { id: Date.now().toString(), text: e.detail.message, sender: "user" };
            setMessages((prev) => [...prev, userMsg]);
            setIsTyping(true);

            // Process the triggered message
            setTimeout(() => {
                const lowerInput = userMsg.text.toLowerCase();
                let responseText = KNOWLEDGE_BASE.default;

                if (lowerInput.includes("skill") || lowerInput.includes("stack")) responseText = KNOWLEDGE_BASE.skills;
                else if (lowerInput.includes("project") || lowerInput.includes("work")) responseText = KNOWLEDGE_BASE.projects;
                else if (lowerInput.includes("experience") || lowerInput.includes("background")) responseText = KNOWLEDGE_BASE.experience;
                else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach")) responseText = KNOWLEDGE_BASE.contact;
                else if (lowerInput.includes("python")) responseText = KNOWLEDGE_BASE.python;
                else if (lowerInput.includes("react") || lowerInput.includes("next")) responseText = KNOWLEDGE_BASE.react;
                else if (lowerInput.includes("hello") || lowerInput.includes("hey")) responseText = KNOWLEDGE_BASE.hello;
                else if (lowerInput.includes("hi")) responseText = KNOWLEDGE_BASE.hi;
                // Specific skill queries
                else if (lowerInput.includes("tell me about aditya's experience with")) {
                    const skill = lowerInput.split("with ")[1].replace("?", "");
                    responseText = `Aditya is highly proficient in ${skill}. He has used it in multiple projects to build scalable and efficient solutions.`;
                }
                // Specific timeline queries
                else if (lowerInput.includes("what did aditya achieve at")) {
                    const company = lowerInput.split("at ")[1].replace("?", "");
                    responseText = `At ${company}, Aditya worked on critical full-stack and data engineering tasks, delivering high-impact solutions.`;
                }

                const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: "bot" };
                setMessages((prev) => [...prev, botMsg]);
                setIsTyping(false);
            }, 1500);
        };

        window.addEventListener("trigger-ai-chat" as any, handleTrigger as any);
        return () => window.removeEventListener("trigger-ai-chat" as any, handleTrigger as any);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let responseText = KNOWLEDGE_BASE.default;

            if (lowerInput.includes("skill") || lowerInput.includes("stack")) responseText = KNOWLEDGE_BASE.skills;
            else if (lowerInput.includes("project") || lowerInput.includes("work")) responseText = KNOWLEDGE_BASE.projects;
            else if (lowerInput.includes("experience") || lowerInput.includes("background")) responseText = KNOWLEDGE_BASE.experience;
            else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach")) responseText = KNOWLEDGE_BASE.contact;
            else if (lowerInput.includes("python")) responseText = KNOWLEDGE_BASE.python;
            else if (lowerInput.includes("react") || lowerInput.includes("next")) responseText = KNOWLEDGE_BASE.react;
            else if (lowerInput.includes("hello") || lowerInput.includes("hey")) responseText = KNOWLEDGE_BASE.hello;
            else if (lowerInput.includes("hi")) responseText = KNOWLEDGE_BASE.hi;

            const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: "bot" };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg z-50 hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    boxShadow: ["0px 0px 0px 0px rgba(59, 130, 246, 0.7)", "0px 0px 20px 10px rgba(59, 130, 246, 0)"]
                }}
                transition={{
                    boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                    }
                }}
            >
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 z-50"
                    >
                        <GlassCard className="flex flex-col h-[500px] border-primary/30 shadow-2xl overflow-hidden p-0">
                            {/* Header */}
                            <div className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-primary/20">
                                        <Bot className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Aditya AI</h3>
                                        <p className="text-xs text-green-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                                                ? "bg-primary text-white rounded-br-none"
                                                : "bg-white/10 text-gray-200 rounded-bl-none border border-white/5"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-black/20">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about Aditya..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors disabled:opacity-50"
                                        disabled={!input.trim() || isTyping}
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
