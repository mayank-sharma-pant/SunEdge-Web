"use client";

import { motion } from "framer-motion";
import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { WorkflowGraphic } from "./WorkflowGraphic";
import { approachSteps } from "./constants";

const MOTION = {
    content: {
        duration: 0.4,
        framerEase: "easeOut",
    }
} as const;

export function Approach() {
    return (
        <section id="approach" className="py-24 px-6 md:px-8 relative overflow-hidden">
            <AtmosphericDepth color="purple" position="right" opacity={0.35} />
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="glass aspect-[16/9] lg:aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden relative group">
                            <WorkflowGraphic />
                        </div>
                    </div>

                    <div>
                        <div className="section-header">
                            <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-12 tracking-[-0.02em] max-w-[15ch]">Our Approach</h2>
                        </div>
                        <div className="space-y-12">
                            {approachSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    className="flex gap-8 group approach-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: MOTION.content.duration,
                                        delay: i * 0.04,
                                        ease: MOTION.content.framerEase
                                    }}
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-blue-500/10 border border-[var(--border-strong)] text-blue-400 font-bold group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 transition-all duration-150">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-all duration-150 tracking-tight">{step.title}</h3>
                                        <p className="text-blue-100/40 leading-relaxed text-base max-w-[45ch]">{step.desc}</p>
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
