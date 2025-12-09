"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, Hand, BrainCircuit } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
}

// 🧠 THE NEURAL KNOWLEDGE GRAPH
// This mimics an LLM's training data but structured for instant lookup.
const KNOWLEDGE_GRAPH = [
    {
        id: "intro",
        patterns: ["who is aditya", "about aditya", "tell me about yourself", "who are you", "profile", "bio", "introduction"],
        responses: [
            "Aditya is a **Prompt Engineer** and **Data Science & AI/ML Aspirant** who treats code like art! 🎨 He's currently pursuing a dual degree: BS in Data Science at IIT Guwahati and B.Tech in CSE at AKTU.",
            "I'm the digital avatar of Aditya Kumar Singh. He is a passionate **AI Developer** and **Prompt Engineering wizard** focused on Generative AI and Computer Vision.",
            "Aditya is a builder. 🛠️ From **Yoga AI** to this very chatbot, he combines deep technical skills in Python & AI with modern web tech like Next.js."
        ]
    },
    {
        id: "skills",
        patterns: ["skill", "stack", "technology", "tech", "coding", "language", "proficient", "what do you know"],
        responses: [
            "Aditya's tech stack is lethal! ⚡\n\n**AI/ML:** Python, TensorFlow, PyTorch, MediaPipe, OpenCV, LangChain.\n**Web:** Next.js 15, React 19, Tailwind CSS, Framer Motion.\n**Specialty:** Prompt Engineering & RAG Systems.",
            "He is a **Prompt Engineering Specialist** 🧠. He knows how to talk to LLMs to get the best results (Chain-of-Thought, Few-Shot). He also masters Python for the backend and React for the frontend."
        ]
    },
    {
        id: "yoga_ai",
        patterns: ["yoga", "posture", "asana", "correction", "computer vision", "exercise", "health", "cv project"],
        responses: [
            "**Yoga AI** is his flagship project! 🧘‍♂️\nIt's a real-time Computer Vision app that detects 33+ body landmarks to correct your yoga posture instantly. It uses **MediaPipe** and calculates landmark geometry to give audio-visual feedback.",
            "Ah, Yoga AI! It's currently detecting *Greatness* in this chat. 😉 But seriously, it's an advanced CV app that helps you perfect your Asanas using nothing but your webcam."
        ]
    },
    {
        id: "prompt_engineering",
        patterns: ["prompt", "engineer", "gpt", "llm", "generative", "gen ai"],
        responses: [
            "Aditya believes **Prompt Engineering** is the programming language of the future. 🔮 He designs complex agentic workflows (like me!) and builds systems that can reason and act, not just chat.",
            "He is an expert in **Generative AI**. He builds meaningful applications on top of LLMs, ensuring reliability and intelligence."
        ]
    },
    {
        id: "projects",
        patterns: ["project", "work", "portfolio", "built", "creation", "showcase"],
        responses: [
            "Check out these bangers: 🔥\n1. **Yoga AI** (Computer Vision Coach)\n2. **SustainifyAI** (Climate Analytics)\n3. **Cash Flowcrew** (Finance Intelligence)\n4. **Digital Kuthputhli** (Gesture Puppetry)\n\nWhich one sounds cool to you?",
            "He has built a wide range of AI tools. From **HealthTech** (Yoga AI) to **FinTech** (Cash Flowcrew). He loves solving real-world problems with code."
        ]
    },
    {
        id: "contact",
        patterns: ["contact", "email", "mail", "reach", "hire", "job", "message", "linkedin"],
        responses: [
            "You should definitely connect! 🤝\n📧 Email: **iitianadityakumarsingh@gmail.com**\n🔗 LinkedIn: Aditya Kumar Singh\nHe's always open to exciting collaborations!",
            "Want to build something together? Drop him an email at **iitianadityakumarsingh@gmail.com**. He replies fast! ⚡"
        ]
    },
    {
        id: "greeting",
        patterns: ["hi", "hello", "hey", "hola", "namaste", "greetings", "yo"],
        responses: [
            "Hello there! 👋 I'm Aditya's AI Assistant. Ready to explore?",
            "Hi! 🤖 Ask me anything about Aditya's work, skills, or projects.",
            "Namaste! 🙏 How can I help you today?"
        ]
    },
    {
        id: "sustainify",
        patterns: ["sustainify", "climate", "environment", "analytics"],
        responses: [
            "**SustainifyAI** is a platform for smarter governance. 🌍 It bridges raw climate data with actionable insights to help regions predict environmental challenges."
        ]
    },
    {
        id: "fun",
        patterns: ["hobby", "fun", "interest", "free time", "game", "painting", "art"],
        responses: [
            "When AFK (Away From Keyboard), Aditya loves **Generative Art**, teaching tech on YouTube, and actually doing the Yoga poses his AI corrects! 🎨🧘‍♂️"
        ]
    }
];

// 🧠 NEURAL LOGIC ENGINE
// Simulates LLM processing with fuzzy matching & context retention
class NeuralEngine {
    private lastTopic: string | null = null;

    process(input: string): string {
        const lowerInput = input.toLowerCase();

        // 1. Scoring System
        // 1. Scoring System
        let bestMatch: typeof KNOWLEDGE_GRAPH[0] | null = null;
        let maxScore = 0;

        KNOWLEDGE_GRAPH.forEach(topic => {
            let score = 0;
            topic.patterns.forEach(pattern => {
                if (lowerInput.includes(pattern)) score += 3; // Strong Match

                // Fuzzy Word Match (Simulated)
                const words = pattern.split(" ");
                words.forEach(word => {
                    if (word.length > 3 && lowerInput.includes(word)) score += 1; // Weak Match
                });
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = topic;
            }
        });

        // 2. Context Handling
        if (maxScore < 2 && this.lastTopic) {
            // If the user says "tell me more" or "details", assume last topic
            if (lowerInput.includes("more") || lowerInput.includes("detail") || lowerInput.includes("it")) {
                const topic = KNOWLEDGE_GRAPH.find(t => t.id === this.lastTopic);
                if (topic) return this.getRandomResponse(topic.responses) + " (Continuing from previous topic...)";
            }
        }

        // 3. Response Generation
        if (bestMatch && maxScore >= 2) {
            this.lastTopic = bestMatch.id;
            return this.getRandomResponse(bestMatch.responses);
        }

        // 4. Smart Fallback (Generative Illusion)
        return this.generateFallback(lowerInput);
    }

    private getRandomResponse(responses: string[]): string {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    private generateFallback(input: string): string {
        const confusables = [
            "That's outside my current training data, but I'm fascinated! 😲 Ask me about **Yoga AI** or **Prompt Engineering** instead.",
            "I'm processing... 🧠 My neural pathways suggest asking about Aditya's **Skills** or **Projects** would yield better results!",
            "Interesting query! While I can't generate code right now, I can tell you Aditya is a **Python & AI** expert. Want to know more about that?"
        ];
        return confusables[Math.floor(Math.random() * confusables.length)];
    }
}

const brain = new NeuralEngine();

export function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hi! I'm Aditya's AI Assistant. 🤖 Fully autonomous and ready to chat!", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Listen for Voice Commands
    useEffect(() => {
        const handleTrigger = (e: CustomEvent<{ message: string }>) => {
            setIsOpen(true);
            const userText = e.detail.message;
            if (!userText) return;
            processMessage(userText);
        };

        window.addEventListener("trigger-ai-chat" as any, handleTrigger as any);
        return () => window.removeEventListener("trigger-ai-chat" as any, handleTrigger as any);
    }, []);

    const processMessage = async (text: string) => {
        // Add User Message
        const userMsg: Message = { id: Date.now().toString(), text: text, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate Neural Processing Time
        const processingTime = Math.random() * 500 + 800; // 0.8s - 1.3s for realism

        setTimeout(() => {
            const responseText = brain.process(text);
            const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: "bot" };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, processingTime);
    };

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;
        processMessage(input);
    };

    return (
        <>
            {/* Positioned Responsive: Bottom-Right on Mobile (Stack above Tour), Bottom-Left on Desktop */}
            <motion.button
                className="fixed bottom-24 right-8 md:bottom-8 md:left-32 z-50 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {/* The "Robot" Container */}
                <div className="relative bg-black border border-primary/50 p-3 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center gap-2 overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-shadow">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient-x" />

                    {/* Robot Icon */}
                    <div className="relative z-10 p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                        <BrainCircuit className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    {/* Chat Bubble / "Hi" Text */}
                    <div className="relative z-10 flex flex-col items-start pr-2">
                        <span className="text-xs font-bold text-white leading-none">AI Chat</span>
                        <span className="text-[10px] text-green-400 font-mono leading-none mt-1 flex items-center gap-1">
                            Ready <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        </span>
                    </div>

                    {/* Waving Hand Badge */}
                    <motion.div
                        className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 py-0.5 rounded-full border border-black z-20 shadow-lg flex items-center gap-1 font-bold"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                    >
                        Hi! 👋
                    </motion.div>
                </div>
            </motion.button>

            {/* Chat Window - Responsive Positioning */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, x: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-40 right-4 w-[90vw] md:w-96 md:bottom-28 md:left-8 md:right-auto z-50 origin-bottom-right md:origin-bottom-left"
                    >
                        <GlassCard className="flex flex-col h-[500px] border-primary/30 shadow-2xl overflow-hidden p-0 bg-black/90 backdrop-blur-xl">
                            {/* Header */}
                            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
                                        <Bot className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            Aditya AI <Sparkles className="w-3 h-3 text-yellow-400" />
                                        </h3>
                                        <p className="text-xs text-secondary/80">Neural Logic Engine v2.0</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
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
                                            className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                                ? "bg-gradient-to-br from-primary to-primary/80 text-white rounded-br-none shadow-lg shadow-primary/20"
                                                : "bg-[#1a1a1a] text-gray-200 rounded-bl-none border border-white/10 shadow-md"
                                                }`}
                                        >
                                            {msg.sender === "bot" && (
                                                <div className="mb-1 text-[10px] font-bold text-primary/80 uppercase tracking-wider flex items-center gap-1">
                                                    <Bot className="w-3 h-3" /> AI Assistant
                                                </div>
                                            )}
                                            {/* Simulate Typing Effect for long text could be added here, but simple render for now */}
                                            <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#1a1a1a] p-4 rounded-2xl rounded-bl-none border border-white/10 flex gap-2 items-center">
                                            <span className="text-xs text-gray-500 mr-2">Computing...</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-100" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-black/40">
                                <form onSubmit={handleSend} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about Aditya..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                    />
                                    <button
                                        type="submit"
                                        className="p-3 rounded-xl bg-primary text-white hover:bg-primary/80 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20"
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
