"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function CinematicPreloader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 5));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0F1E] px-8"
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
            </div>

            <div className="w-full max-w-md relative">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400/80 mb-1">System Boot</span>
                        <span className="text-xl font-black text-white tracking-tighter uppercase italic">SunEdge_Core_v2.0</span>
                    </div>
                    <span className="text-xs font-mono text-blue-400">{Math.floor(progress)}%</span>
                </div>

                <div className="h-[2px] w-full bg-white/10 relative overflow-hidden flex items-center">
                    <motion.div
                        className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>

                <div className="mt-6 flex justify-between text-[9px] font-mono text-blue-400/50 uppercase tracking-widest">
                    <span>Loading_Modules...</span>
                    <span>Encrypted_Link_Active</span>
                </div>
            </div>
        </motion.div>
    );
}
