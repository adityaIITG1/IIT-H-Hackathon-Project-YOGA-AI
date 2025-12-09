"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "./ui/glass-card";
import { useEffect, useRef } from "react";

const certificates = [
    { id: 1, src: "/certificates/cert1.jpg", alt: "Certificate 1" },
    { id: 2, src: "/certificates/cert2.jpg", alt: "Certificate 2" },
    { id: 3, src: "/certificates/cert3.jpg", alt: "Certificate 3" },
    { id: 4, src: "/certificates/cert4.jpg", alt: "Certificate 4" },
    { id: 5, src: "/certificates/cert5.jpg", alt: "Certificate 5" },
    { id: 6, src: "/certificates/cert6.jpg", alt: "Certificate 6" },
    { id: 7, src: "/certificates/cert7.jpg", alt: "Certificate 7" },
    { id: 8, src: "/certificates/cert8.jpg", alt: "Certificate 8" },
    { id: 9, src: "/certificates/cert9.jpg", alt: "Certificate 9" },
    { id: 10, src: "/certificates/cert10.jpg", alt: "Certificate 10" },
];

export function Certificates() {
    // Refs to store DOM elements of cards
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;

        const handleScrollEffect = () => {
            const centerX = window.innerWidth / 2;
            const threshold = 200; // Distance from center where effect starts

            cardRefs.current.forEach((card) => {
                if (!card) return;

                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const distance = Math.abs(centerX - cardCenterX);

                // Calculate scale and opacity based on distance from center
                // Scale: 1 at edge, 1.2 at center
                // Opacity/Glow: Standard at edge, High at center

                let scale = 1;
                let opacity = 0;
                let zIndex = 0;
                let rotateX = 0;

                if (distance < threshold) {
                    // Normalize distance (0 at center, 1 at threshold)
                    const normalized = 1 - distance / threshold;
                    scale = 1 + (0.2 * normalized); // Scale up to 1.2
                    opacity = normalized; // 0 to 1
                    zIndex = 10;
                    rotateX = 0;
                } else {
                    // Default state logic for non-centered items (optional: add slight perspective tilt)
                    // rotateX = 2; 
                }

                // Apply styles directly for performance
                const innerCard = card.querySelector('.glass-card-inner') as HTMLElement;
                const glowOverlay = card.querySelector('.glow-overlay') as HTMLElement;

                if (innerCard) {
                    innerCard.style.transform = `scale(${scale}) translateY(${distance < threshold ? -10 * (1 - distance / threshold) : 0}px)`;
                    innerCard.style.zIndex = zIndex.toString();
                    innerCard.style.borderColor = `rgba(var(--primary-rgb), ${0.3 + opacity * 0.7})`;
                    innerCard.style.boxShadow = `0 0 ${15 + opacity * 30}px rgba(var(--primary-rgb), ${0.2 + opacity * 0.6})`;
                }

                if (glowOverlay) {
                    glowOverlay.style.opacity = (0.3 + opacity * 0.7).toString();
                }
            });

            animationFrameId = requestAnimationFrame(handleScrollEffect);
        };

        // Start loop
        handleScrollEffect();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="certificates" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        My <span className="text-gradient">Certifications</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Recognitions and achievements from various organizations and workshops.
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full flex overflow-hidden mask-linear-gradient py-10">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full z-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full z-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-8 px-4 items-center"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "max-content" }}
                >
                    {/* Double the list to create seamless loop */}
                    {[...certificates, ...certificates].map((cert, index) => (
                        <div
                            key={`${cert.id}-${index}`}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="relative group shrink-0 w-[300px] md:w-[400px] aspect-[4/3] perspective-1000 z-0 transition-all duration-75 ease-linear"
                        >
                            <GlassCard className="glass-card-inner h-full w-full p-2 transition-transform duration-75 ease-linear border-primary/30 origin-center bg-black/40">
                                <div className="relative h-full w-full rounded-lg overflow-hidden">
                                    <Image
                                        src={cert.src}
                                        alt={cert.alt}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay Glow */}
                                    <div className="glow-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 transition-opacity duration-300" />
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

