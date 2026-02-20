"use client";

import { motion } from "framer-motion";
import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { PrecisionPanel } from "../ui/PrecisionPanel";
import { whyChooseUs } from "./constants";

const MOTION = {
    content: {
        duration: 0.4,
        framerEase: "easeOut",
    },
} as const;

export function AboutSunEdge() {
    return (
        <section id="about-authority" className="py-24 px-6 md:px-8 relative overflow-hidden">
            {/* Background precision panels — depth framing */}
            <PrecisionPanel
                className="w-[300px] h-[400px] -top-[5%] -right-[5%] opacity-40"
                driftX={3} driftY={5} delay={0} duration={20} rotate={8}
            />
            <PrecisionPanel
                className="w-[200px] h-[280px] bottom-[10%] -left-[3%] opacity-20"
                driftX={-4} driftY={6} delay={3} duration={18} rotate={-6}
            />
            <div className="mx-auto w-full max-w-7xl relative z-10">
                {/* Header */}
                <div className="section-header mb-12">
                    <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-6 tracking-[-0.02em]">About SunEdge</h2>
                    <div className="w-16 h-1 bg-blue-500 rounded-full" />
                </div>

                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* LEFT: Precision visual composition — choreographed assembly */}
                    <motion.div
                        className="relative h-[480px] hidden lg:flex items-center justify-center border-r border-blue-500/10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                    >
                        {/* Glass slab stack — assembled motion */}
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                            <PrecisionPanel className="w-[180px] h-[240px] top-[10%] left-[8%]" driftX={4} driftY={6} delay={0} duration={16} rotate={-4} />
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                            <PrecisionPanel className="w-[140px] h-[180px] top-[25%] left-[45%]" driftX={-3} driftY={5} delay={2} duration={18} rotate={3} />
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                            <PrecisionPanel className="w-[100px] h-[120px] bottom-[12%] left-[25%]" driftX={2} driftY={-4} delay={4} duration={14} rotate={-2} />
                        </motion.div>
                        {/* Authority labels */}
                        <motion.div className="absolute top-[22%] left-[12%] z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
                            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/50 mb-1">Recognized</div>
                            <div className="text-xs font-bold text-blue-300/70">DPIIT Startup</div>
                        </motion.div>
                        <motion.div className="absolute top-[42%] left-[40%] z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>
                            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-purple-400/50 mb-1">Registered</div>
                            <div className="text-xs font-bold text-violet-300/60">MSME India</div>
                        </motion.div>
                        <motion.div className="absolute bottom-[18%] left-[24%] z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }}>
                            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mb-1">HQ</div>
                            <div className="text-xs font-bold text-blue-200/50">New Delhi, India</div>
                        </motion.div>
                        {/* Ambient glow */}
                        <AtmosphericDepth color="blue" position="center" opacity={0.2} className="scale-50 opacity-40" />
                    </motion.div>

                    {/* RIGHT: Scan-friendly authority blocks */}
                    <div className="space-y-8">
                        {/* Statement block */}
                        <div className="border-l-2 border-blue-500/40 pl-8 py-2">
                            <p className="text-2xl md:text-3xl font-light text-blue-100/60 leading-snug max-w-[20ch]">
                                <span className="text-blue-400 font-bold tracking-tight">DPIIT Recognized.</span>{" "}
                                <span className="text-violet-400 font-bold tracking-tight">MSME Registered.</span>{" "}
                                Performance Driven.
                            </p>
                        </div>

                        {/* Compact authority items */}
                        <div className="grid grid-cols-1 gap-4 pt-4">
                            {whyChooseUs.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: MOTION.content.duration,
                                        delay: i * 0.05,
                                        ease: MOTION.content.framerEase
                                    }}
                                    className="flex gap-5 items-start group p-5 border border-[var(--border-normal)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] hover:bg-blue-500/5 transition-all duration-150 authority-item active:scale-[0.99]"
                                >
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1 tracking-wide">{item.title}</h4>
                                        <p className="text-blue-100/40 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
