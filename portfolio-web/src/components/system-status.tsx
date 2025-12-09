"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Wifi } from "lucide-react";

export function SystemStatus() {
    const [cpuUsage, setCpuUsage] = useState(12);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(Math.floor(Math.random() * 30) + 10);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-24 right-6 z-[40] font-mono text-[10px] md:text-xs bg-black/80 border border-white/10 p-2 rounded-lg backdrop-blur text-green-400 select-none">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> SYSTEM</span>
                    <span className="text-white">OPTIMAL</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> NEURAL_ENG</span>
                    <span className="text-white">{cpuUsage}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> NET_UPLINK</span>
                    <span className="text-white animate-pulse">LIVE</span>
                </div>
            </div>
        </div>
    );
}
