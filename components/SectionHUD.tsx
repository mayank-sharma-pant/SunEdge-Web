"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HUDProps {
    sectionName: string;
    sectionCode: string;
}

export default function SectionHUD({ sectionName, sectionCode }: HUDProps) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [latency, setLatency] = useState(0.2);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCoords({ x: e.clientX, y: e.clientY });
        };

        const interval = setInterval(() => {
            setLatency(Number((0.15 + Math.random() * 0.1).toFixed(2)));
        }, 2000);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[50] hidden lg:block overflow-hidden">
            {/* Top Left: Section Metadata */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={sectionName}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-10 left-10 flex flex-col gap-1"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/80">
                            System Active
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-100/90 tracking-[0.1em]">{sectionName}</span>
                        <span className="text-[9px] font-mono text-blue-400/40 opacity-60">ID://{sectionCode}</span>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Top Right: System Status */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
                <div className="flex gap-4 text-[9px] font-mono text-blue-300/40 uppercase tracking-widest">
                    <div className="flex flex-col items-end">
                        <span>Latency</span>
                        <span className="text-blue-400/70">{latency}ms</span>
                    </div>
                    <div className="flex flex-col items-end border-l border-[var(--border-normal)] pl-4">
                        <span>Auth</span>
                        <span className="text-violet-400/70">Level_7</span>
                    </div>
                </div>
            </div>

            {/* Bottom Right: Coordinates */}
            <div className="absolute bottom-10 right-10">
                <div className="flex gap-3 text-[9px] font-mono text-blue-400/30 uppercase tracking-tighter">
                    <span>X: {coords.x}</span>
                    <span>Y: {coords.y}</span>
                </div>
            </div>

            {/* Technical Frame — electric blue accent lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent" />
        </div>
    );
}
