"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";

const libraries = [
    { name: "NumPy", desc: "Numerical Computing", color: "from-blue-400 to-blue-600" },
    { name: "Pandas", desc: "Data Manipulation", color: "from-purple-400 to-purple-600" },
    { name: "Matplotlib", desc: "Data Visualization", color: "from-orange-400 to-red-600" },
    { name: "Scikit-learn", desc: "Machine Learning", color: "from-yellow-400 to-orange-500" },
    { name: "PyTorch", desc: "Deep Learning", color: "from-red-500 to-pink-600" },
    { name: "TensorFlow", desc: "Neural Networks", color: "from-orange-500 to-red-500" },
    { name: "OpenCV", desc: "Computer Vision", color: "from-green-400 to-emerald-600" },
    { name: "MediaPipe", desc: "Face/Pose Detection", color: "from-teal-400 to-cyan-500" },
    { name: "FastAPI", desc: "High-Performance API", color: "from-emerald-400 to-teal-600" },
    { name: "Streamlit", desc: "Data Apps", color: "from-red-400 to-orange-500" }
];

export function PythonLibraries() {
    return (
        <section id="python-libraries" className="py-16 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Ecosystem</span>
                    </h2>
                    <p className="text-gray-400">Powering intelligent solutions with robust libraries.</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {libraries.map((lib, index) => (
                        <motion.div
                            key={lib.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <GlassCard className="h-full flex flex-col items-center justify-center p-6 text-center group cursor-default hover:bg-white/5 bg-black/20 border-white/5">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${lib.color} opacity-80 group-hover:opacity-100 blur-[2px] group-hover:blur-0 transition-all mb-4`} />
                                <h3 className="font-bold text-lg text-white mb-1">{lib.name}</h3>
                                <p className="text-xs text-gray-500">{lib.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
