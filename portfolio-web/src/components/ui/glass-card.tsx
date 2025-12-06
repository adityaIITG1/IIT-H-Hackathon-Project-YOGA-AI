import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" } : {}}
            className={cn(
                "glass rounded-2xl p-6 transition-all duration-300",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
