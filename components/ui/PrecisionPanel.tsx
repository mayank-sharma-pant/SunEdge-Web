"use client";

import { motion } from "framer-motion";

export function PrecisionPanel({
    className = "",
    driftX = 4,
    driftY = 6,
    delay = 0,
    duration = 12,
    rotate = 0,
}: {
    className?: string;
    driftX?: number;
    driftY?: number;
    delay?: number;
    duration?: number;
    rotate?: number;
}) {
    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            initial={{ x: 0, y: 0, rotate }}
            animate={{
                x: [0, driftX, 0, -driftX * 0.5, 0],
                y: [0, -driftY * 0.5, driftY, 0, 0],
                rotate: [rotate, rotate + 0.4, rotate - 0.3, rotate],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.6, 0.85, 1],
            }}
        >
            <div
                style={{
                    background: "rgba(13, 20, 40, 0.55)",
                    border: "1px solid rgba(59, 130, 246, 0.18)",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                }}
                className="w-full h-full rounded-2xl"
            />
        </motion.div>
    );
}
