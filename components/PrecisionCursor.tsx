"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function PrecisionCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for the outer ring
    const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.interactive-target');

            setIsHovering(!!isInteractive);
        };

        const handleMouseDown = () => setIsActive(true);
        const handleMouseUp = () => setIsActive(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Outer Ring - Delayed Tracking */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    borderColor: isHovering ? "rgba(56, 182, 255, 0.4)" : "rgba(255, 255, 255, 0.2)",
                    borderWidth: isHovering ? "1px" : "1.5px",
                }}
                className="absolute w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"
            >
                {/* Technical HUD Crosshairs inside ring */}
                <AnimatePresence>
                    {isHovering && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-blue-500/60" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-blue-500/60" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-blue-500/60" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-blue-500/60" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Main Core Dot - Instant Tracking */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isActive ? 0.8 : 1,
                    backgroundColor: isHovering ? "#38B6FF" : "#fff",
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />

            {/* Trailing "Aura" - Extremely subtle */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="absolute w-12 h-12 rounded-full bg-blue-500/5 blur-xl pointer-events-none"
            />
        </div>
    );
}
