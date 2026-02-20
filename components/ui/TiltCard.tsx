"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";

export function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springRX = useSpring(rotateX, { stiffness: 200, damping: 25 });
    const springRY = useSpring(rotateY, { stiffness: 200, damping: 25 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 6);
        rotateX.set(-py * 6);
    }, [rotateX, rotateY]);

    const handleMouseLeave = useCallback(() => {
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return (
        <motion.div
            ref={ref}
            style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}
