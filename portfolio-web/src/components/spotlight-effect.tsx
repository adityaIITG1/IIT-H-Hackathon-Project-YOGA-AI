"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function SpotlightEffect() {
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-screen"
            style={{ background: "transparent" }}
        >
            <motion.div
                className="absolute w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-[100px] opacity-50"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </motion.div>
    );
}
