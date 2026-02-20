"use client";

import { motion } from "framer-motion";
import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { CinematicText } from "../ui/CinematicText";
import { PrecisionPanel } from "../ui/PrecisionPanel";

const MOTION = {
    content: {
        duration: 0.4,
        framerEase: "easeOut",
    },
    section: {
        framerEase: [0.19, 1, 0.22, 1],
    },
} as const;

export function MemorySolutions() {
    return (
        <section id="memory" className="py-24 px-6 md:px-8 relative overflow-hidden">
            <AtmosphericDepth color="purple" position="right" opacity={0.4} />
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* LEFT: Typography dominant */}
                    <div>
                        <div className="section-header mb-6">
                            <h2 className="text-3xl font-bold md:text-5xl tracking-tight tracking-[-0.02em] max-w-[12ch]">
                                <CinematicText>Memory Solutions</CinematicText>
                            </h2>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-[55ch]">
                            Enterprise-grade memory modules engineered for reliability, consistency, and mission-critical performance across server and workstation environments.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 shrink-0" />
                                <p className="text-blue-100/50 leading-relaxed">JEDEC-compliant modules with structured validation and burn-in testing for enterprise reliability.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0" />
                                <p className="text-blue-100/50 leading-relaxed">Batch-level traceability ensuring consistent quality across every production run.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0" />
                                <p className="text-blue-100/50 leading-relaxed">Rigorous multi-stage testing protocols before deployment to customer environments.</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Precision Panel Visual Anchor — enhanced with accent lighting */}
                    <motion.div
                        className="relative h-[480px] hidden lg:block memory-visual"
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
                        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-[var(--radius-md)]">
                            <motion.div
                                className="absolute inset-y-0 w-[30%] bg-gradient-to-r from-transparent via-purple-400/10 to-transparent transform skew-x-12"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 5, repeat: Infinity, repeatDelay: 10, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Panel composition — staggered assembly */}
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.framerEase } } }}>
                            <PrecisionPanel className="w-[220px] h-[300px] top-[10%] left-[5%]" driftX={5} driftY={8} delay={0} duration={14} rotate={-3} />
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.framerEase } } }}>
                            <PrecisionPanel className="w-[160px] h-[200px] top-[30%] left-[38%]" driftX={-4} driftY={6} delay={2} duration={16} rotate={4} />
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.framerEase } } }}>
                            <PrecisionPanel className="w-[120px] h-[140px] bottom-[8%] left-[15%]" driftX={3} driftY={-5} delay={4} duration={18} rotate={-1} />
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.framerEase } } }}>
                            <PrecisionPanel className="w-[180px] h-[110px] top-[5%] right-[5%]" driftX={-3} driftY={7} delay={1} duration={13} rotate={2} />
                        </motion.div>

                        {/* Purple/blue accent glow behind panels */}
                        <AtmosphericDepth color="purple" position="left" opacity={0.3} className="scale-75 translate-x-[-20%]" />

                        {/* Spec labels floating over panels — choreographed entrance */}
                        <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } } }} className="absolute top-[25%] left-[12%] z-30">
                            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400/60 mb-2">Validation</div>
                            <div className="text-sm font-bold text-white shadow-sm">100% RELIABILITY</div>
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } } }} className="absolute bottom-[22%] left-[42%] z-30">
                            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400/60 mb-2">Compliance</div>
                            <div className="text-sm font-bold text-white shadow-sm">JEDEC STANDARD</div>
                        </motion.div>

                        {/* Thin horizontal rule — precision line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
