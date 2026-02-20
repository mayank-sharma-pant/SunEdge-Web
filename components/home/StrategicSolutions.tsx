"use client";

import { motion } from "framer-motion";
import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { TiltCard } from "../ui/TiltCard";
import { solutions } from "./constants";

const MOTION = {
    content: {
        duration: 0.4,
        framerEase: "easeOut",
    }
} as const;

export function StrategicSolutions() {
    return (
        <section id="solutions" className="py-24 px-6 md:px-8 relative z-10 overflow-hidden">
            <AtmosphericDepth color="cyan" position="left" opacity={0.45} />
            <div className="mx-auto w-full max-w-7xl relative z-10">
                <div className="section-header mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 tracking-[-0.02em]">Strategic Solutions</h2>
                        <p className="text-lg text-blue-200/50 max-w-[55ch] leading-relaxed">Custom-engineered packages for vertical-specific technology demands.</p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent hidden md:block mb-4 md:ml-12" />
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    {solutions.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: MOTION.content.duration,
                                delay: i * 0.04,
                                ease: MOTION.content.framerEase
                            }}
                        >
                            <TiltCard className="service-card relative overflow-hidden rounded-[var(--radius-md)] p-8 bg-[#0D1630]/70 border border-[var(--border-normal)] backdrop-blur-[var(--blur-lg)] transition-all duration-700 group hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-premium)]">
                                {/* Scanner sweep effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
                                </div>
                                <div className="absolute top-0 right-0 p-8 text-blue-500/[0.07] font-black text-7xl group-hover:text-blue-400/15 transition-all duration-700">0{i + 1}</div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-all duration-500 relative z-[2] leading-tight">{item.title}</h3>
                                <p className="text-blue-100/40 leading-relaxed text-base relative z-[2]">{item.desc}</p>
                                <div className="mt-12 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-blue-400/0 group-hover:w-full transition-all duration-1000 ease-out" />
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
