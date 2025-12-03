import React from "react";
import { Activity, Brain, Zap, User, Sparkles } from "lucide-react";

interface TopBarProps {
    sessionTime: string;
    mood: string;
    posture?: string;
    alignmentMode?: string;
}

export default function TopBar({ sessionTime, mood, posture = "Good", alignmentMode = "Standard" }: TopBarProps) {
    return (
        <div className="absolute top-0 left-0 w-full z-30 flex justify-center pt-6 pointer-events-none">
            <div className="
                flex items-center gap-8 px-12 py-5 
                bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full 
                shadow-[0_0_30px_rgba(0,0,0,0.6)]
                text-white font-medium text-base tracking-wide
            ">
                {/* Brand / Live Indicator */}
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 shadow-lg">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>

                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent font-bold text-2xl tracking-wider drop-shadow-sm">
                        AI ChakraFlow
                    </span>
                </div>

                <div className="w-px h-6 bg-white/10"></div>

                {/* Session Time */}
                <div className="flex items-center gap-3 group">
                    <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Session</span>
                        <span className="font-mono text-cyan-300 text-lg shadow-cyan-500/20 drop-shadow-sm">{sessionTime}</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-white/10"></div>

                {/* Mood */}
                <div className="flex items-center gap-3 group">
                    <Brain className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Mood</span>
                        <span className="text-purple-300 text-lg shadow-purple-500/20 drop-shadow-sm">{mood}</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-white/10"></div>

                {/* Posture */}
                <div className="flex items-center gap-3 group">
                    <User className={`w-5 h-5 group-hover:scale-110 transition-transform ${posture === "Good" || posture === "Lotus" || posture === "Asana" ? "text-green-400" : "text-red-400"}`} />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Posture</span>
                        <span className={`text-lg shadow-green-500/20 drop-shadow-sm ${posture === "Good" || posture === "Lotus" || posture === "Asana" ? "text-green-300" : "text-red-300"}`}>
                            {posture}
                        </span>
                    </div>
                </div>

                {alignmentMode && (
                    <>
                        <div className="w-px h-6 bg-white/10"></div>
                        {/* Mode */}
                        <div className="flex items-center gap-3 group">
                            <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                            <div className="flex flex-col leading-none">
                                <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Mode</span>
                                <span className="text-amber-300 text-lg shadow-amber-500/20 drop-shadow-sm">{alignmentMode}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
