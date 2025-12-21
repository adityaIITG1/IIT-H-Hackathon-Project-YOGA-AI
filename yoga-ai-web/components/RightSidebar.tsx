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
        <div className="w-[250px] flex flex-col gap-2 z-20 h-full py-4 pl-2 pointer-events-none">

            {/* Touch Nose Indicator (Premium & Popping) - ULTRA COMPACT */}
            <div className="relative group overflow-hidden rounded-lg p-0.5 animate-pulse-slow flex-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-gradient-x"></div>
                <div className="relative bg-black/80 backdrop-blur-md rounded-md p-1 flex flex-col items-center text-center leading-none shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-yellow-400 font-black text-[8px] uppercase tracking-widest mb-0.5">
                        NOSE ASSIST
                    </h3>
                    <div className="text-[7px] text-white/80 font-bold uppercase tracking-tighter">
                        BREATH SYNC
                    </div>
                </div>
            </div>

            {/* Header - Minimal */}
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1 shadow-sm flex-none">
                <h2 className="text-white font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                    </span>
                    GESTURE INDEX
                </h2>
            </div>

            {/* Mudra List - MAX DENSITY */}
            <div className="flex-1 flex flex-col gap-1 overflow-y-auto min-h-0 pr-0.5 scrollbar-hide pointer-events-auto">
                {MUDRAS.map((m) => {
                    const isActive = activeGesture && activeGesture.includes(m.name);

                    return (
                        <div
                            key={m.name}
                            className={`
                                relative flex items-center justify-between px-2 py-1 rounded-md border transition-all duration-300
                                ${isActive
                                    ? "bg-green-600/50 border-green-300 shadow-[0_0_15px_rgba(74,222,128,0.3)] scale-[1.02] z-10"
                                    : "bg-black/40 border-white/5 opacity-80 hover:opacity-100 hover:bg-black/60 hover:border-white/20"
                                }
                                backdrop-blur-sm
                            `}
                        >
                            <div className="flex flex-col min-w-0">
                                <span className={`text-[10px] font-black tracking-wide leading-none truncate ${isActive ? "text-white" : "text-white/80"}`}>
                                    {m.name}
                                </span>
                                <span className={`text-[7px] uppercase tracking-tighter font-bold leading-none mt-0.5 ${isActive ? "text-green-300" : "text-white/40"}`}>
                                    {m.desc}
                                </span>
                            </div>

                            <div className={`
                                p-0.5 rounded transition-all duration-300
                                ${isActive ? "bg-green-400/20" : "bg-white/5"}
                            `}>
                                <MudraIcon name={m.name} className={`w-4 h-4 ${isActive ? "text-green-300" : "text-white/60"}`} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sensei Footer - Minimalized */}
            <div className="bg-black/90 backdrop-blur-md border border-green-500/30 rounded-lg p-1.5 shadow-xl flex-none pointer-events-auto">
                <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1">
                    <span className="text-green-400 font-black text-[8px] uppercase tracking-widest">SENSEI AI</span>
                    <span className="text-[6px] bg-green-900/60 text-green-300 px-1 rounded font-black border border-green-500/20">READY</span>
                </div>
                <div className="text-[9px] text-white/80 space-y-0.5 font-bold leading-tight uppercase tracking-tight">
                    <div className="flex items-center gap-1">
                        <span className="text-cyan-400 text-[7px]">●</span>
                        <span>POSE: <span className="text-white">LOTUS</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-green-400 text-[7px]">●</span>
                        <span>FLOW: <span className="text-white text-[8px]">ACTIVE</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
