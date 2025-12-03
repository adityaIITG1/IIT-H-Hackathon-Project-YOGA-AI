import React from "react";
import MudraIcon from "./MudraIcon";

interface RightSidebarProps {
    activeGesture: string | null;
}

const MUDRAS = [
    { name: "Gyan", desc: "Wisdom & Focus" },
    { name: "Prana", desc: "Vitality & Life" },
    { name: "Apana", desc: "Detox & Grounding" },
    { name: "Surya", desc: "Metabolism & Heat" },
    { name: "Varun", desc: "Hydration & Clarity" },
    { name: "Anjali", desc: "Balance & Prayer" },
];

export default function RightSidebar({ activeGesture }: RightSidebarProps) {
    return (
        <div className="absolute top-4 bottom-32 right-6 w-[320px] flex flex-col gap-3 z-20 pointer-events-none">

            {/* Touch Nose Indicator (Premium & Popping) */}
            <div className="relative group overflow-hidden rounded-xl p-0.5 animate-pulse-slow">
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-gradient-x"></div>

                <div className="relative bg-black/90 backdrop-blur-xl rounded-[10px] p-3 flex flex-col items-center text-center gap-1 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    <div className="absolute top-0 right-0 p-1">
                        <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                    </div>

                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-black text-xs uppercase tracking-widest drop-shadow-sm">
                        Touch Nose
                    </h3>
                    <div className="text-[10px] text-white font-bold tracking-wide">
                        To Enable Breathing
                    </div>
                    <div className="text-[8px] text-yellow-500/80 font-mono uppercase tracking-wider mt-0.5">
                        • Activate Sensor •
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <h2 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Mudra Guide
                </h2>
            </div>

            {/* Mudra List */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0 pr-1 scrollbar-hide pointer-events-auto">
                {MUDRAS.map((m) => {
                    const isActive = activeGesture && activeGesture.includes(m.name);

                    return (
                        <div
                            key={m.name}
                            className={`
                                relative flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-500
                                ${isActive
                                    ? "bg-green-900/80 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)] scale-105 z-10 translate-x-[-5px]"
                                    : "bg-gray-900/80 border-white/10 opacity-90 hover:bg-gray-800/90 hover:border-white/30"
                                }
                                backdrop-blur-md
                            `}
                        >
                            {/* Active Glow Line */}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-400 rounded-l-xl shadow-[0_0_10px_#4ade80]"></div>
                            )}

                            <div className="flex flex-col pl-2">
                                <span className={`text-lg font-bold tracking-wide ${isActive ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "text-gray-200"}`}>
                                    {m.name}
                                </span>
                                <span className={`text-xs uppercase tracking-wider font-medium ${isActive ? "text-green-200" : "text-gray-400"}`}>
                                    {m.desc}
                                </span>
                            </div>

                            <div className={`
                                p-2 rounded-lg transition-all duration-300
                                ${isActive ? "bg-green-400/20 shadow-inner" : "bg-white/5"}
                            `}>
                                <MudraIcon name={m.name} className={`w-9 h-9 ${isActive ? "text-green-300 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]" : "text-gray-400"}`} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info Panel (HUD Style) */}
            <div className="bg-black/90 backdrop-blur-2xl border-t-2 border-green-500 rounded-xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
                <h3 className="text-green-400 font-bold text-xs uppercase tracking-widest mb-4 flex justify-between items-center border-b border-white/10 pb-2">
                    AI Coach
                    <span className="text-[10px] bg-green-500/20 border border-green-500/50 px-2 py-0.5 rounded text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.2)]">ONLINE</span>
                </h3>
                <div className="text-sm text-gray-300 space-y-3 font-light">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1 text-xs">▶</span>
                        <span>Sit in <span className="text-white font-semibold">Lotus Pose</span> (Padmasana)</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1 text-xs">▶</span>
                        <span>Form <span className="text-white font-semibold">Mudras</span> clearly</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 mt-1 text-xs">▶</span>
                        <span>Close eyes for <span className="text-white font-semibold">Meditation</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
