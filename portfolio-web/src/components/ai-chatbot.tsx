"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, Hand } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
}

// 🧠 The "LLM" Brain - Expanded Knowledge Base
const PORTFOLIO_BRAIN = [
    {
        keywords: ["yoga", "pose", "correction", "cv", "computer vision", "health", "fitness"],
        response: "The Yoga AI project is a flagship Computer Vision application. It uses MediaPipe and Python to detect 33+ body landmarks in real-time. It analyzes your posture (Asanas) and provides instant audio-visual feedback to correct your form. It's like having a personal yoga instructor in your pocket!"
    },
    {
        keywords: ["skill", "stack", "technology", "tech", "react", "next", "python", "frontend", "backend"],
        response: "Aditya is a **Prompt Engineer** and **Data Science & AI/ML Aspirant** with exceptional prompting skills for coding! 🚀\n\n**Core Focus:** Generative AI, Computer Vision, Data Science.\n**Tech Stack:** Python, TensorFlow, PyTorch, MediaPipe, LangChain.\n**Web:** Next.js, React (for showcasing AI)."
    },
    {
        keywords: ["contact", "email", "reach", "hire", "job", "freelance"],
        response: "You should definitely get in touch! You can email him at **iitianadityakumarsingh@gmail.com** or connect via LinkedIn. He's always open to exciting collaborations and opportunities."
    },
    {
        keywords: ["about", "who", "bio", "background", "education", "study", "college"],
        response: "Aditya is a Dual Degree student pursuing a BS in Data Science & AI at **IIT Guwahati** and B.Tech in CSE at AKTU. He combines academic rigor with practical engineering skills to build 'SOLID' software."
    },
    {
        keywords: ["prompt", "engineer", "gpt", "llm", "generative"],
        response: "Prompt Engineering is one of his supermarkets. He treats prompts as code, designing complex chains-of-thought to get the best out of LLMs. He's built several RAG systems and autonomous agents."
    },
    {
        keywords: ["project", "work", "portfolio", "built"],
        response: "Here are some highlights:\n1. **Yoga AI**: Real-time posture correction.\n2. **SustainifyAI**: Climate analytics platform.\n3. **Cash Flowcrew**: Automated financial intelligence.\n4. **Digital Kuthputhli**: Gesture-controlled digital puppetry.\n\nWhich one would you like to know more about?"
    },
    {
        keywords: ["hello", "hi", "hey", "start", "greeting"],
        response: "Hello! 👋 I'm the AI Assistant for this portfolio. I've been trained on Aditya's resume and codebase. Ask me anything about his projects, skills, or experience!"
    },
    {
        keywords: ["sustainify", "climate", "analytics"],
        response: "SustainifyAI is a powerful platform bridging raw climate data with actionable governance. It helps regions predict environmental challenges and building resilience using AI models."
    },
    {
        keywords: ["fun", "hobby", "interest", "outside"],
        response: "When not coding, Aditya loves exploring the intersection of art and tech (Generative Art), creating content for his YouTube channel, and practicing the very Yoga he builds apps for!"
    }
];

// Fuzzy matching logic to simulate "understanding"
const findSmartResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // 1. Direct Keyword Scoring
    let bestMatch: typeof PORTFOLIO_BRAIN[0] | null = null;
    let maxScore = 0;

    PORTFOLIO_BRAIN.forEach((topic) => {
        let score = 0;
        topic.keywords.forEach(word => {
            if (lowerInput.includes(word)) score += 1;
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = topic;
        }
    });

    if (maxScore > 0 && bestMatch) {
        return bestMatch.response;
    }

    // 2. Fallback "Smart" Responses
    const fallbacks = [
        "That's a great question. While my database is focused on Aditya's professional profile, I can tell you he's a problem solver at heart. Ask me about his *Yoga AI* project!",
        "I'm tuning my neural networks... 🧠 I don't have a specific answer for that, but I know Aditya loves tackling new challenges. Want to hear about his *Tech Stack*?",
        "Interesting query! To keep things relevant to his work, try asking about his *Skills*, *Projects*, or *Education*."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

export function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hi! I'm Aditya's AI Assistant. 🤖 Powered by OpenAI. Ask me anything!", sender: "bot" },
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

    // Listen for custom event from Voice Control
    useEffect(() => {
        const handleTrigger = (e: CustomEvent<{ message: string }>) => {
            setIsOpen(true);
            const userText = e.detail.message;
            if (!userText) return;

            // Add user message
            const userMsg: Message = { id: Date.now().toString(), text: userText, sender: "user" };
            setMessages((prev) => [...prev, userMsg]);
            setIsTyping(true);

            // Call API
            fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) throw new Error(data.error);
                    const botMsg: Message = {
                        id: (Date.now() + 1).toString(),
                        text: data.reply,
                        sender: "bot"
                    };
                    setMessages((prev) => [...prev, botMsg]);
                })
                .catch(err => {
                    const errorMsg: Message = {
                        id: (Date.now() + 1).toString(),
                        text: "⚠️ I'm having trouble connecting to my brain right now.",
                        sender: "bot"
                    };
                    setMessages((prev) => [...prev, errorMsg]);
                })
                .finally(() => setIsTyping(false));
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

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply,
                sender: "bot"
            };
            setMessages((prev) => [...prev, botMsg]);

        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "⚠️ I'm having trouble connecting my brain...",
                sender: "bot"
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* 
                Positioned Bottom-Left (near Mic)
                Mic is likely around left-8, so we position this at left-28 to be close but distinct.
            */}
            <motion.button
                className="fixed bottom-8 left-32 z-50 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {/* The "Robot" Container */}
                <div className="relative bg-black border border-primary/50 p-3 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center gap-2 overflow-hidden">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient-x" />

                    {/* Robot Icon */}
                    <div className="relative z-10 p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                        <Bot className="w-6 h-6 text-white" />
                    </div>

                    {/* Chat Bubble / "Hi" Text */}
                    <div className="relative z-10 flex flex-col items-start pr-2">
                        <span className="text-xs font-bold text-white leading-none">AI Chat</span>
                        <span className="text-[10px] text-green-400 font-mono leading-none mt-1 flex items-center gap-1">
                            Online <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
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

            {/* Chat Window - Moved to Bottom Left to match button */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, x: -100 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-28 left-8 w-80 md:w-96 z-50 origin-bottom-left"
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
                                        <p className="text-xs text-secondary/80">Powered by Portfolio-GPT</p>
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
                                            {/* Render Markdown-like formatting simply */}
                                            <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#1a1a1a] p-4 rounded-2xl rounded-bl-none border border-white/10 flex gap-2 items-center">
                                            <span className="text-xs text-gray-500 mr-2">Thinking...</span>
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
                                        placeholder="Ask me anything..."
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
