"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// Hardware icon shapes for each product category
const HARDWARE_ICONS = [
    // RAM — grid of memory chips
    (accent: string) => (
        <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-full aspect-square bg-[#38B6FF]/10 rounded-sm border border-[#38B6FF]/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                />
            ))}
        </div>
    ),
    // Server — stacked bars
    (accent: string) => (
        <div className="space-y-1.5 pt-1">
            {[1, 0.6, 0.8, 0.5].map((w, i) => (
                <motion.div
                    key={i}
                    className="h-1.5 bg-[#38B6FF]/20 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                >
                    <motion.div
                        className="h-full bg-[#38B6FF]/40"
                        animate={{ width: [`${w * 100}%`, "100%", `${w * 100}%`] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            ))}
        </div>
    ),
    // Enterprise — network nodes
    (accent: string) => (
        <div className="relative flex items-center justify-center h-full">
            <div className="w-8 h-8 rounded-lg border border-[#38B6FF]/30 relative flex items-center justify-center">
                <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: accent }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </div>
    ),
];

function HardwareIcon({ index, accent = "#38B6FF" }: { index: number; accent?: string }) {
    const iconRenderer = HARDWARE_ICONS[index % HARDWARE_ICONS.length];
    return (
        <div className="w-full h-full text-[#38B6FF]">
            {iconRenderer(accent)}
        </div>
    );
}

const FOCUS = {
    active: {
        bg: "rgba(10,22,50,0.97)",
        border: "rgba(56,182,255,0.4)", // Stronger border for definition
        shadow: "0 2px 4px rgba(0,0,0,0.4), 0 12px 32px rgba(2,6,18,0.7), 0 0 0 1px rgba(56,182,255,0.1)",
        y: -6,
        rimOpacity: 0.9, // Bright rim for active
        glowOpacity: 0.55, // Stronger, structured spotlight
        titleColor: "rgba(255,255,255,1)",
        bodyColor: "rgba(219,234,254,0.8)", // Highly readable body (blue-100/80)
        iconBorder: "rgba(56,182,255,0.2)", // Softer icon border
        statusColor: "rgba(52,211,153,0.9)",
        topHighlight: "inset 0 1px 0 0 rgba(255,255,255,0.25)", // Mechanical top edge
    },
    inactive: {
        bg: "rgba(7,14,28,0.94)",
        border: "rgba(56,182,255,0.08)",
        shadow: "0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(2,6,18,0.45)",
        y: 0,
        rimOpacity: 0.15, // Subtle but visible
        glowOpacity: 0.06, // Ambient atmosphere (never zero)
        titleColor: "rgba(255,255,255,0.5)", // Dimmer inactive title
        bodyColor: "rgba(191,219,255,0.3)", // Receded body
        iconBorder: "rgba(56,182,255,0.04)",
        statusColor: "rgba(56,182,255,0.2)",
        topHighlight: "inset 0 1px 0 0 rgba(255,255,255,0.03)",
    },
    // Physical settle for Y, smooth ease for colors
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 1 },
} as const;

const hardwareProducts = [
    { title: "RAM Modules (DDR4 / DDR5)", desc: "JEDEC-compliant memory modules with burn-in testing, batch-level traceability, and structured validation for enterprise reliability." },
    { title: "Storage Devices (SSD / HDD)", desc: "High-performance solid-state and hard disk drives engineered for enterprise workloads, data centers, and mission-critical storage." },
    { title: "Enterprise Server Hardware", desc: "DDR4 ECC UDIMM, Registered RDIMM, and Load-Reduced DIMM (LRDIMM) solutions for server-grade memory infrastructure." },
    { title: "Custom Hardware Setup", desc: "Tailored hardware configurations designed for specific industrial, enterprise, and organizational requirements." },
    { title: "Enterprise Hardware Solutions", desc: "Comprehensive hardware procurement and deployment services covering networking, compute, and peripheral systems." }
];

export function HardwareSlider() {
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-centering Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute("data-index") || "0");
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: trackRef.current,
                threshold: 0.6,
                rootMargin: "0px -20% 0px -20%",
            }
        );

        cardRefs.current.forEach((ref) => ref && observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    const scrollToCard = useCallback((i: number) => {
        const card = cardRefs.current[i];
        if (card && trackRef.current) {
            trackRef.current.scrollTo({
                left: card.offsetLeft - trackRef.current.offsetWidth / 2 + card.offsetWidth / 2,
                behavior: "smooth",
            });
        }
    }, []);

    return (
        <section className="relative py-32 overflow-hidden bg-[#050A18]">
            <div className="container mx-auto px-8 md:px-16 mb-20 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase italic">
                            Hardware Infrastructure
                        </h2>
                        <div className="h-1 w-24 bg-blue-500 mb-8" />
                        <p className="text-lg text-blue-200/60 leading-relaxed max-w-xl">
                            Precision-engineered hardware components for mission-critical enterprise environments.
                            Built for stability, optimized for performance.
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                            className="w-14 h-14 rounded-full border border-blue-500/20 bg-[#0a1530]/95 flex items-center justify-center text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => scrollToCard(Math.min(hardwareProducts.length - 1, activeIndex + 1))}
                            className="w-14 h-14 rounded-full border border-blue-500/20 bg-[#0a1530]/95 flex items-center justify-center text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider Track — overflow-x-auto for scroll, generous vertical padding for shadow clearance */}
            <div
                ref={trackRef}
                className="flex gap-8 overflow-x-auto px-8 md:px-16 py-12 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <style>{`div[class*="snap-x"]::-webkit-scrollbar { display: none; }`}</style>

                {hardwareProducts.map((product, i) => {
                    const isActive = i === activeIndex;
                    const f = isActive ? FOCUS.active : FOCUS.inactive;

                    return (
                        /* Layer 1: Static scroll target — no transforms, provides snap anchor */
                        <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el as HTMLElement; }}
                            data-index={i}
                            className="relative flex-shrink-0 w-[85vw] md:w-[420px] snap-center cursor-pointer"
                            onClick={() => scrollToCard(i)}
                        >
                            {/* Glow — sits OUTSIDE the plate so it can't be clipped. Top-down spotlight with arrival stabilization. */}
                            <motion.div
                                className="absolute -inset-12 bg-[radial-gradient(circle_at_50%_-20%,rgba(56,182,255,0.32),transparent_70%)] pointer-events-none"
                                animate={{
                                    opacity: isActive ? [0.4, 0.55] : 0.06,
                                    scale: isActive ? [1.02, 1] : 0.9
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{ filter: "blur(20px)" }} // Controlled blur on the background glow only (not card)
                            />

                            {/* Layer 2: Visual plate — ONLY handles elevation + shadow, no filter */}
                            <motion.div
                                className="relative rounded-[20px] p-10 flex flex-col justify-between min-h-[440px] overflow-hidden"
                                animate={{
                                    y: f.y,
                                    backgroundColor: f.bg,
                                    borderColor: f.border,
                                    boxShadow: `${f.shadow}, ${f.topHighlight}`, // Compose shadow + highlight
                                }}
                                transition={FOCUS.transition}
                                style={{
                                    border: "1px solid transparent",
                                    backgroundImage: "linear-gradient(165deg, rgba(20,36,72,0.3) 0%, transparent 40%, rgba(6,12,24,0.2) 100%)",
                                }}
                            >
                                {/* Edge Lighting — Strong top chamfer with arrival flash */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent pointer-events-none"
                                    animate={{ opacity: isActive ? [0.6, 1, 0.9] : 0.15 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />

                                {/* Side highlight — Balanced vertical rim with arrival flash */}
                                <motion.div
                                    className="absolute top-[2px] right-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-300/50 via-blue-400/20 to-transparent pointer-events-none"
                                    animate={{ opacity: isActive ? [0.5, 0.8, 0.6] : 0.1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute top-[2px] left-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-300/30 via-blue-400/10 to-transparent pointer-events-none"
                                    animate={{ opacity: isActive ? [0.3, 0.5, 0.4] : 0.05 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />

                                {/* Layer 3: Static content — no transforms, text renders crisply */}
                                <div className="relative z-10">
                                    {/* Module label — moved to top for metadata grouping */}
                                    <p className="text-[10px] font-mono text-blue-400/60 uppercase tracking-[0.2em] mb-4">
                                        System_Module 0{i + 1}
                                    </p>

                                    {/* Title — Primary Anchor */}
                                    <motion.h3
                                        className="text-3xl font-semibold mb-6 tracking-tight leading-none"
                                        animate={{ color: f.titleColor }}
                                        transition={FOCUS.transition}
                                    >
                                        {product.title}
                                    </motion.h3>

                                    {/* Icon — Visual Support (Diagrammatic) */}
                                    <motion.div
                                        className="w-12 h-12 p-2.5 rounded-xl bg-blue-500/[0.04] flex items-center justify-center mb-6 relative overflow-hidden"
                                        animate={{ borderColor: f.iconBorder }}
                                        transition={FOCUS.transition}
                                        style={{ border: "1px solid transparent" }}
                                    >
                                        <div className="w-full h-full opacity-90">
                                            <HardwareIcon index={i} />
                                        </div>
                                    </motion.div>

                                    {/* Body — High Readability */}
                                    <motion.p
                                        className="leading-relaxed text-[15px] font-medium max-w-[36ch]"
                                        animate={{ color: f.bodyColor }}
                                        transition={FOCUS.transition}
                                    >
                                        {product.desc}
                                    </motion.p>
                                </div>

                                {/* Status indicator */}
                                <div className="relative z-10 flex items-center gap-3 mt-auto pt-10">
                                    <motion.span
                                        className="w-2 h-2 rounded-full"
                                        animate={{ backgroundColor: f.statusColor }}
                                        transition={FOCUS.transition}
                                    />
                                    <span className="text-[10px] font-mono text-blue-400/40 uppercase tracking-widest">
                                        {isActive ? "Focused" : "Standby"}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mt-8">
                {hardwareProducts.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToCard(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 bg-blue-500" : "w-1.5 bg-blue-500/20"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
