"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, Suspense, useCallback, useState } from "react";
import dynamic from "next/dynamic";

const HeroOrb = dynamic(() => import("./HeroOrb"), { ssr: false });

const REVEAL_CONFIG = {
  duration: 0.85,
  ease: "power3.out",
  start: "top 86%",
} as const;

const SCROLL_SYNC = {
  scrub: 1.8,
  start: "top top",
} as const;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CinematicText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
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
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return <span ref={textRef} className={`text-reveal-cinematic ${className}`}>{children}</span>;
}

// Magnetic button — attracts toward cursor on hover, springs back
function MagneticButton({ children, className = "", disabled }: { children: React.ReactNode, className?: string, disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

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

// Tilt card — subtle rotateX/Y on hover based on cursor position
function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
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

// Precision Panel — flat glass slab with controlled drift and ultra-subtle rim light
function PrecisionPanel({
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
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 0 15px rgba(56,182,255,0.02)",
          backdropFilter: "blur(2px)",
        }}
        className="w-full h-full rounded-2xl"
      />
    </motion.div>
  );
}

// Workflow Graphic — Technical system visualization for 'Our Approach'
function WorkflowGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 bg-black/40">
      <svg viewBox="0 0 600 400" className="w-full h-full relative z-10 overflow-visible">
        {/* Logic Grid Background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#grid)" />

        {/* Primary Data Flow Paths */}
        <motion.path
          d="M 100 200 C 150 200 150 100 200 100 H 400 C 450 100 450 300 500 300"
          stroke="rgba(56,182,255,0.1)"
          strokeWidth="1.5"
          fill="none"
        />
        <motion.path
          d="M 100 200 C 150 200 150 100 200 100 H 400 C 450 100 450 300 500 300"
          stroke="#38B6FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M 100 200 C 150 200 150 300 200 300 H 400 C 450 300 450 100 500 100"
          stroke="rgba(123,92,255,0.1)"
          strokeWidth="1.5"
          fill="none"
        />
        <motion.path
          d="M 100 200 C 150 200 150 300 200 300 H 400 C 450 300 450 100 500 100"
          stroke="#7B5CFF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Definitive Step Nodes */}
        {[
          { x: 100, y: 200, label: "Assessment", color: "#38B6FF" },
          { x: 250, y: 100, label: "Strategy", color: "#7B5CFF" },
          { x: 350, y: 300, label: "Execution", color: "#38B6FF" },
          { x: 500, y: 200, label: "Support", color: "#7B5CFF" },
        ].map((node, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
            {/* Outer Glow Ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="none"
              stroke={node.color}
              strokeWidth="0.5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Core Node */}
            <circle cx={node.x} cy={node.y} r="4" fill={node.color} />
            <circle cx={node.x} cy={node.y} r="8" stroke={node.color} strokeWidth="1" fill="none" opacity="0.3" />

            {/* Node Label (Technical Style) */}
            <text
              x={node.x}
              y={node.y + 25}
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
              fontSize="8"
              fontWeight="bold"
              className="uppercase tracking-[0.2em]"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Floating Data Packets */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="2"
            fill="#fff"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              offsetPath: "path('M 100 200 C 150 200 150 100 200 100 H 400 C 450 100 450 300 500 300')",
            }}
          />
        ))}
      </svg>

      {/* Precision Frame Overlay */}
      <div className="absolute inset-4 border border-white/[0.03] pointer-events-none" />
      <div className="absolute top-4 left-4 w-4 h-[1px] bg-blue-500/40" />
      <div className="absolute top-4 left-4 w-[1px] h-4 bg-blue-500/40" />
      <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-purple-500/40" />
      <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-purple-500/40" />
    </div>
  );
}

function HardwareVisualPlaceholder({ index }: { index: number }) {
  return (
    <div className="relative mb-10 h-44 overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(123,92,255,0.14),rgba(56,182,255,0.08)_42%,rgba(255,255,255,0.02))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.16),transparent_36%),radial-gradient(circle_at_85%_85%,rgba(56,182,255,0.18),transparent_40%)]" />
      <div className="absolute -top-10 left-8 h-32 w-32 rounded-full border border-white/10 bg-white/[0.02] blur-[1px]" />
      <div className="absolute bottom-[-24px] right-8 h-24 w-40 rounded-[24px] border border-white/10 bg-black/20 backdrop-blur-md" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.04)_50%,transparent_70%)] opacity-70" />
      <div className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[0.32em] text-white/50">Surface {index + 1}</div>
      <div className="absolute bottom-6 left-6 h-[1px] w-20 bg-gradient-to-r from-blue-500/80 to-transparent" />
    </div>
  );
}

const solutions = [

  { title: "Software Solutions", desc: "Scalable cloud platforms and custom CRM systems." },
  { title: "Hardware", desc: "Enterprise-grade components with structured quality control." },
  { title: "IT Services", desc: "End-to-end consulting and managed technology services." }
];

const approachSteps = [
  { title: "Assessment", desc: "Thorough analysis of existing technical infrastructure and business requirements." },
  { title: "Strategy", desc: "Designing a practical, implementation-ready roadmap aligned with your objectives." },
  { title: "Execution", desc: "Precision-driven implementation with structured quality checkpoints at every stage." },
  { title: "Support", desc: "Reliable after-sales support and continuous optimization for long-term performance." }
];

const hardwareProducts = [
  { title: "RAM Modules (DDR4 / DDR5)", desc: "JEDEC-compliant memory modules with burn-in testing, batch-level traceability, and structured validation for enterprise reliability." },
  { title: "Storage Devices (SSD / HDD)", desc: "High-performance solid-state and hard disk drives engineered for enterprise workloads, data centers, and mission-critical storage." },
  { title: "Enterprise Server Hardware", desc: "DDR4 ECC UDIMM, Registered RDIMM, and Load-Reduced DIMM (LRDIMM) solutions for server-grade memory infrastructure." },
  { title: "Custom Hardware Setup", desc: "Tailored hardware configurations designed for specific industrial, enterprise, and organizational requirements." },
  { title: "Enterprise Hardware Solutions", desc: "Comprehensive hardware procurement and deployment services covering networking, compute, and peripheral systems." }
];

const trustMetrics = [
  { value: "DPIIT", label: "Recognized Startup" },
  { value: "MSME", label: "Registered Enterprise" },
  { value: "24/7", label: "Technical Support" }
];

const whyChooseUs = [
  {
    title: "DPIIT Recognized Startup",
    desc: "Officially recognized by the Department for Promotion of Industry and Internal Trade, Government of India."
  },
  {
    title: "MSME Registered",
    desc: "Registered under the Micro, Small & Medium Enterprises framework for structured business operations."
  },
  {
    title: "Enterprise-Focused Solutions",
    desc: "Technology systems designed specifically for organizational scale, reliability, and measurable business impact."
  },
  {
    title: "Structured Quality Control",
    desc: "Rigorous testing, batch-level traceability, and JEDEC compliance across all hardware product lines."
  },
  {
    title: "Reliable After-Sales Support",
    desc: "Dedicated support infrastructure ensuring consistent performance and timely issue resolution."
  },
  {
    title: "Transparent Business Practices",
    desc: "Clear documentation, honest communication, and accountable project delivery at every stage."
  }
];

export function HomePage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1) Hero Reveal (Enhanced Cinematic)
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: REVEAL_CONFIG.ease,
          onStart: () => {
            gsap.fromTo(".hero-headline",
              { letterSpacing: "0.15em", opacity: 0 },
              { letterSpacing: "normal", opacity: 1, duration: 1, ease: REVEAL_CONFIG.ease }
            );
          }
        }
      );

      // Hero Parallax Scroll
      gsap.to(".hero-parallax-layer", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: SCROLL_SYNC.start,
          end: "bottom top",
          scrub: true
        }
      });

      // 2) Services Reveal (Richer)
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.97, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: REVEAL_CONFIG.duration,
            delay: i * 0.06,
            ease: REVEAL_CONFIG.ease,
            scrollTrigger: {
              trigger: card,
              start: REVEAL_CONFIG.start,
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax Drift for Depth
      gsap.to(".parallax-layer", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: SCROLL_SYNC.start,
          end: "bottom bottom",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#07070a] text-[#f6f7fb]">
      <div className="ambient-bg" />

      {/* HERO SECTION - SPLIT SCREEN */}
      <section className="hero-section relative flex min-h-screen items-center px-8 md:px-24 lg:px-40 overflow-hidden">
        {/* Cinematic ambient light streaks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] -left-[10%] w-[70%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform rotate-[15deg]" />
          <div className="absolute bottom-[30%] -right-[10%] w-[50%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -rotate-[12deg]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_30%,rgba(123,92,255,0.06),transparent_60%)]" />
        </div>

        <div className="mx-auto w-full max-w-[1360px] relative z-10 grid lg:grid-cols-2 items-center gap-10 hero-parallax-layer">
          <div className="hero-content">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.4em] text-blue-400/70">
              SunEdge IT Solution Private Limited
            </p>
            <h1 className="hero-headline text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl tracking-tight">
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
            <div className="mt-8 max-w-xl">
              <p className="text-base text-slate-400 md:text-lg leading-relaxed">
                Powering enterprises with next-generation software and mission-critical hardware infrastructure.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-6">
              <MagneticButton className="rounded-full bg-blue-600 px-10 py-5 font-bold tracking-wide transition-all duration-500 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] active:scale-[0.97]">
                Explore Our Solutions
              </MagneticButton>
              <MagneticButton className="rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-10 py-5 font-bold tracking-wide transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] active:scale-[0.97]">
                Contact Us
              </MagneticButton>
            </div>
          </div>

          <div className="relative flex justify-center items-center h-[500px] md:h-[700px]">
            <div className="parallax-layer absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[600px] h-[600px] border border-white/5 rounded-full" />
              <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />
            </div>
            <div className="relative z-20 w-full h-full">
              <Suspense fallback={<div className="w-10 h-10 rounded-full border border-white/10 animate-spin mx-auto mt-72" />}>
                <HeroOrb />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider opacity-50" />

      {/* STRATEGIC SOLUTIONS GRID */}
      <section className="py-40 px-8 md:px-24 lg:px-40 relative z-10">
        {/* Section ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6">Strategic Solutions</h2>
              <p className="text-lg text-slate-400">Custom-engineered packages for vertical-specific technology demands.</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent hidden md:block mb-6 md:ml-12" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {solutions.map((item, i) => (
              <TiltCard key={i} className="service-card relative overflow-hidden rounded-[32px] p-12 bg-black/80 border border-white/[0.06] backdrop-blur-2xl transition-all duration-700 group hover:border-blue-500/30 hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]">
                {/* Scanner sweep effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
                </div>
                <div className="absolute top-0 right-0 p-8 text-white/[0.03] font-black text-7xl group-hover:text-blue-500/10 transition-all duration-700">0{i + 1}</div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight group-hover:text-blue-400 transition-all duration-500 relative z-[2]">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg relative z-[2]">{item.desc}</p>
                <div className="mt-12 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-blue-400/0 group-hover:w-full transition-all duration-1000 ease-out" />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PROTOCOL APPROACH */}
      <section className="py-40 px-8 md:px-24 lg:px-40 relative overflow-hidden">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="glass aspect-[16/9] lg:aspect-[4/3] rounded-[32px] overflow-hidden border-white/5 relative group bg-[#07070a]/60">
                <WorkflowGraphic />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-12">Our Approach</h2>
              <div className="space-y-12">
                {approachSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-blue-500 font-bold group-hover:border-blue-500/30 transition-all duration-500">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-all duration-300">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* HARDWARE INFRASTRUCTURE */}
      <section className="relative overflow-hidden bg-black/60 py-32 px-6 md:px-10 xl:px-16">
        {/* Dramatic depth lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-600/6 blur-[100px] rounded-full" />
        </div>
        <div className="mx-auto w-full max-w-[1360px] relative z-10">
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight">Hardware Infrastructure</h2>
          <p className="mt-6 text-lg text-slate-400 max-w-[70ch]">Reliable hardware for mission-critical business environments.</p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {hardwareProducts.map((product, i) => (
              <article key={i} className="relative overflow-hidden rounded-[36px] p-10 xl:p-12 bg-black/90 border border-white/[0.06] backdrop-blur-2xl group hover:border-blue-500/30 transition-all duration-700 hover:shadow-[0_0_90px_rgba(59,130,246,0.16)]">
                {/* Depth glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-blue-600/5 to-transparent" />
                </div>
                <HardwareVisualPlaceholder index={i} />
                <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-6 opacity-60">Module 0{i + 1}</p>
                <h3 className="text-2xl xl:text-3xl font-bold mb-6 tracking-tight">{product.title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg relative z-[2] max-w-[56ch]">{product.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="section-divider opacity-50 mt-20" />
      </section>

      {/* MEMORY SOLUTIONS - ENTERPRISE RAM */}
      <section className="py-40 px-8 md:px-24 lg:px-40 relative overflow-hidden">
        {/* Enhanced ambient depth — purple/blue accent lighting */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/6 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute left-1/4 top-0 w-[400px] h-[400px] bg-blue-600/4 blur-[150px] rounded-full pointer-events-none" />
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            {/* LEFT: Typography dominant */}
            <div>
              <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-8">
                <CinematicText>Memory Solutions</CinematicText>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Enterprise-grade memory modules engineered for reliability, consistency, and mission-critical performance across server and workstation environments.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 shrink-0" />
                  <p className="text-slate-300 leading-relaxed">JEDEC-compliant modules with structured validation and burn-in testing for enterprise reliability.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 shrink-0" />
                  <p className="text-slate-300 leading-relaxed">Batch-level traceability ensuring consistent quality across every production run.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 shrink-0" />
                  <p className="text-slate-300 leading-relaxed">Rigorous multi-stage testing protocols before deployment to customer environments.</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Precision Panel Visual Anchor — enhanced with accent lighting */}
            <motion.div
              className="relative h-[480px] hidden lg:block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
                <motion.div
                  className="absolute inset-y-0 w-[30%] bg-gradient-to-r from-transparent via-purple-400/10 to-transparent transform skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 10, ease: "easeInOut" }}
                />
              </div>

              {/* Panel composition — staggered assembly */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                <PrecisionPanel className="w-[220px] h-[300px] top-[10%] left-[5%]" driftX={5} driftY={8} delay={0} duration={14} rotate={-3} />
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                <PrecisionPanel className="w-[160px] h-[200px] top-[30%] left-[38%]" driftX={-4} driftY={6} delay={2} duration={16} rotate={4} />
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                <PrecisionPanel className="w-[120px] h-[140px] bottom-[8%] left-[15%]" driftX={3} driftY={-5} delay={4} duration={18} rotate={-1} />
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }}>
                <PrecisionPanel className="w-[180px] h-[110px] top-[5%] right-[5%]" driftX={-3} driftY={7} delay={1} duration={13} rotate={2} />
              </motion.div>

              {/* Purple/blue accent glow behind panels */}
              <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-purple-500/8 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[20%] right-[10%] w-[150px] h-[150px] bg-blue-500/8 blur-[50px] rounded-full pointer-events-none" />

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
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider opacity-50" />

      {/* ABOUT SUNEDGE — restructured for visual authority */}
      <section className="py-40 px-8 md:px-24 lg:px-40 relative overflow-hidden">
        {/* Background precision panels — depth framing */}
        <PrecisionPanel
          className="w-[300px] h-[400px] -top-[5%] -right-[5%] opacity-40"
          driftX={3} driftY={5} delay={0} duration={20} rotate={8}
        />
        <PrecisionPanel
          className="w-[200px] h-[280px] bottom-[10%] -left-[3%] opacity-20"
          driftX={-4} driftY={6} delay={3} duration={18} rotate={-6}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="mx-auto w-full max-w-[1360px] relative z-10">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-8">About SunEdge</h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-start">
            {/* LEFT: Precision visual composition — choreographed assembly */}
            <motion.div
              className="relative h-[480px] hidden lg:flex items-center justify-center border-r border-white/5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
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
                <div className="text-xs font-bold text-white/60">DPIIT Startup</div>
              </motion.div>
              <motion.div className="absolute top-[42%] left-[40%] z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>
                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-purple-400/50 mb-1">Registered</div>
                <div className="text-xs font-bold text-white/60">MSME India</div>
              </motion.div>
              <motion.div className="absolute bottom-[18%] left-[24%] z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }}>
                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mb-1">HQ</div>
                <div className="text-xs font-bold text-white/50">New Delhi, India</div>
              </motion.div>
              {/* Ambient glow */}
              <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
            </motion.div>

            {/* RIGHT: Scan-friendly authority blocks */}
            <div className="space-y-8">
              {/* Statement block */}
              <div className="border-l-2 border-blue-500/40 pl-8 py-2">
                <p className="text-2xl md:text-3xl font-light text-slate-200 leading-snug">
                  <span className="text-blue-400 font-bold">DPIIT Recognized.</span>{" "}
                  <span className="text-purple-400 font-bold">MSME Registered.</span>{" "}
                  Performance Driven.
                </p>
              </div>

              {/* Compact authority items */}
              <div className="grid grid-cols-1 gap-4 pt-4">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group p-5 border border-white/[0.04] rounded-2xl hover:border-blue-500/20 hover:bg-white/[0.02] transition-all duration-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 tracking-wide">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - PREMIUM CORPORATE */}
      <section className="py-52 px-8 md:px-24 lg:px-40 relative bg-[#07070a]">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="grid lg:grid-cols-2 gap-32">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-8">Let&apos;s Talk About Your Requirements</h2>
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  Share your current goals and technical constraints. Our team will respond with a practical, implementation-ready direction.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Registered Office</h4>
                    <p className="text-lg font-medium">Unitech Cyber Park, Sec-39, Gurugram, Haryana</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Corporate Office</h4>
                    <p className="text-lg font-medium">601A, Hemkunt Chamber, Building No. 89,</p>
                    <p className="text-lg font-medium">Nehru Place, New Delhi, Delhi – 110074</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Direct Communication</h4>
                    <p className="text-lg font-medium">sales@sunedgesolution.com</p>
                    <p className="text-lg font-medium">011-40107046</p>
                    <p className="text-lg font-medium">+91 8882436208</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="surface-tint p-12 md:p-16 border border-white/5 relative overflow-hidden">
                {status === "success" ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#07070a]/95 backdrop-blur-md p-8 text-center animate-in fade-in duration-500">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thank you for contacting us. We will get back to you shortly.</p>
                    <button onClick={() => setStatus("idle")} className="mt-8 text-sm text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest">Send Another</button>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3.5 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all input-focus-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3.5 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all input-focus-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3.5 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all input-focus-glow"
                    />
                  </div>
                  <MagneticButton disabled={status === "sending"} className="w-full rounded-full bg-blue-600 py-4 font-bold tracking-wide transition-colors hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] disabled:opacity-50 disabled:cursor-not-allowed">
                    {status === "sending" ? "Sending..." : "Submit Inquiry"}
                  </MagneticButton>
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center mt-4">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-40 px-8 md:px-24 lg:px-40 text-center relative overflow-hidden">
        <div className="mx-auto w-full max-w-[1360px] relative z-10">
          <h2 className="text-4xl font-bold md:text-7xl tracking-tight mb-16">
            Let’s Build Your <br />
            <span className="text-blue-500 italic font-light">Technology Infrastructure</span>
          </h2>
          <MagneticButton className="rounded-full bg-white text-black px-16 py-6 text-lg font-black transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            GET CONSULTATION
          </MagneticButton>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-blue-600/8 to-transparent pointer-events-none" />
      </section>

      {/* WHATSAPP QUICK CHAT */}
      <a
        href="https://wa.me/918882436208?text=Hello%20SunEdge%20IT%20Solution"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[100] flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-5 font-bold text-white shadow-[0_10px_40px_rgba(37,211,102,0.3)] transition-all hover:scale-110 active:scale-95 group"
      >
        <div className="relative overflow-hidden w-0 group-hover:w-32 transition-all duration-500 whitespace-nowrap">
          <span className="text-sm">Chat on WhatsApp</span>
        </div>
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.044c0 2.123.555 4.195 1.613 6.007L0 24l6.149-1.613a11.782 11.782 0 005.895 1.589h.005c6.635 0 12.045-5.409 12.049-12.046a11.801 11.801 0 00-3.528-8.431z" />
        </svg>
      </a>


      <footer className="py-20 px-6 border-t border-white/5 text-slate-500 text-sm bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="text-white font-bold tracking-widest uppercase mb-6 text-lg">SunEdge IT Solution Pvt. Ltd.</div>
              <p className="max-w-xs text-slate-400 mb-8 leading-relaxed">
                Empowering enterprises with next-generation technology infrastructure and strategic software solutions.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders could go here */}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Software Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">IT Consulting</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud Migration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Hardware</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Enterprise Servers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Storage Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Networking Gear</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p>© 2026 SunEdge IT Solution Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main >
  );
}
