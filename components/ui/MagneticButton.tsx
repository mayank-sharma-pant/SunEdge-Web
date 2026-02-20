"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";

export function MagneticButton({ children, className = "", disabled }: { children: React.ReactNode, className?: string, disabled?: boolean }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 400, damping: 25 });
    const springY = useSpring(y, { stiffness: 400, damping: 25 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current || disabled) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.15);
        y.set(dy * 0.15);
    }, [x, y, disabled]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            className={`glow-ripple ${className}`}
        >
            {children}
        </motion.button>
    );
}
