"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Terminal, ExternalLink, RefreshCw } from "lucide-react";

export function AiContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = () => setVisible(false);

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const menuItems = [
        { icon: Terminal, label: "View Source", action: () => window.open("https://github.com/adityaIITG1/portifo-0001", "_blank") },
        { icon: Copy, label: "Copy Context", action: () => navigator.clipboard.writeText("Portfolio of Aditya Kumar Singh - AI Specialist") },
        { icon: RefreshCw, label: "Reboot System", action: () => window.location.reload() },
        { icon: ExternalLink, label: "Contact AI", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ top: position.y, left: position.x }}
                    className="fixed z-[10000] w-48 bg-black/90 border border-primary/50 backdrop-blur-md rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.2)] overflow-hidden"
                >
                    <div className="p-1 border-b border-white/10 text-xs font-mono text-gray-500 uppercase px-3 py-2">
                        System Command
                    </div>
                    <div className="p-1">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.action}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-primary/20 hover:text-white rounded transition-colors text-left"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
