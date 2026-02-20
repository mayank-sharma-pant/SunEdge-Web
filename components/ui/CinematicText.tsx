"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const MOTION = {
    section: {
        duration: 0.6,
        y: 12,
        ease: "expo.out",
        framerEase: [0.19, 1, 0.22, 1],
        trigger: "top 95%"
    }
} as const;

export function CinematicText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: MOTION.section.duration,
                    ease: MOTION.section.ease,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: MOTION.section.trigger,
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return <span ref={textRef} className={`text-reveal-cinematic ${className}`}>{children}</span>;
}
