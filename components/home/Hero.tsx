"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { CinematicText } from "../ui/CinematicText";
import { MagneticButton } from "../ui/MagneticButton";

const HeroOrb = dynamic(() => import("../HeroOrb"), { ssr: false });

export function Hero() {
    return (
        <section id="hero" className="hero-section relative flex min-h-screen items-center px-6 md:px-8 overflow-hidden pt-32 pb-24">
            <AtmosphericDepth color="blue" position="top" opacity={0.6} />
            {/* Cinematic ambient light streaks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] -left-[10%] w-[70%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform rotate-[15deg]" />
                <div className="absolute bottom-[30%] -right-[10%] w-[50%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -rotate-[12deg]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_30%,rgba(123,92,255,0.06),transparent_60%)]" />
            </div>

            <div className="mx-auto w-full max-w-7xl relative z-10 grid lg:grid-cols-2 items-center gap-12 hero-parallax-layer">
                <div className="hero-content">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-blue-400/80">
                        SunEdge IT Solution Private Limited
                    </p>
                    <h1 className="hero-headline text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl tracking-[-0.04em] max-w-[12ch]">
                        <div className="overflow-hidden">
                            <CinematicText>Powering</CinematicText>
                        </div>
                        <div className="overflow-hidden">
                            <CinematicText>Performance.</CinematicText>
                        </div>
                        <div className="overflow-hidden text-blue-500">
                            <CinematicText>Enabling Innovation.</CinematicText>
                        </div>
                    </h1>
                    <div className="mt-8 max-w-[50ch]">
                        <p className="text-lg text-blue-100/50 md:text-xl leading-relaxed font-medium">
                            Powering enterprises with next-generation software and mission-critical hardware infrastructure.
                        </p>
                    </div>
                    <div className="mt-12 flex flex-wrap gap-8">
                        <MagneticButton className="rounded-full bg-blue-500 px-12 py-4 text-white font-bold tracking-wide transition-all duration-150 hover:bg-blue-400 hover:shadow-[var(--shadow-glow)] active:scale-[0.97]">
                            Explore Our Solutions
                        </MagneticButton>
                        <MagneticButton className="rounded-full border border-[var(--border-strong)] bg-blue-950/40 backdrop-blur-[var(--blur-md)] px-12 py-4 font-bold text-blue-100 tracking-wide transition-all duration-150 hover:bg-blue-900/60 hover:border-blue-400/40 hover:shadow-[var(--shadow-glow)] active:scale-[0.97]">
                            Contact Us
                        </MagneticButton>
                    </div>
                </div>

                <div className="relative flex justify-center items-center h-[500px] md:h-[700px]">
                    <div className="parallax-layer absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <div className="w-[600px] h-[600px] border border-blue-500/10 rounded-full" />
                        <div className="absolute w-[400px] h-[400px] border border-blue-400/10 rounded-full" />
                    </div>
                    <div className="relative z-20 w-full h-full">
                        <Suspense fallback={<div className="w-10 h-10 rounded-full border border-white/10 animate-spin mx-auto mt-72" />}>
                            <HeroOrb />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}
