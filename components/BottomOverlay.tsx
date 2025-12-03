import React from "react";

interface BottomOverlayProps {
    feedback: string;
    gesture?: string | null;
    logs?: string[];
}

export default function BottomOverlay({ feedback, gesture, logs }: BottomOverlayProps) {
    return (
        <div className="absolute bottom-8 left-0 w-full flex flex-col items-center justify-end gap-3 z-30 pointer-events-none px-4">

            {/* Gesture Notification */}
            {gesture && (
                <div className="animate-bounce-short">
                    <div className="bg-green-500 text-black px-8 py-3 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center gap-2">
                        <span className="text-2xl">🕉️</span>
                        {gesture}
                    </div>
                </div>
            )}

            {/* Main Feedback Pill */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-2xl shadow-2xl max-w-3xl text-center">
                <p className="text-xl font-medium tracking-wide leading-relaxed text-gray-100">
                    {feedback}
                </p>
            </div>

            {/* Logs (Subtle) */}
            {logs && logs.length > 0 && (
                <div className="flex flex-col items-center gap-1 opacity-60">
                    {logs.slice(-2).map((log, i) => (
                        <div key={i} className="text-xs font-mono text-green-300 bg-black/40 px-3 py-1 rounded">
                            {log}
                        </div>
                    ))}
                </div>
            )}

            <div className="text-xs text-gray-500 mt-2 uppercase tracking-widest">
                Press &apos;Q&apos; to Quit Session
            </div>
        </div>
    );
}
