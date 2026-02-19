"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, Suspense, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import SectionHUD from "./SectionHUD";

const HeroOrb = dynamic(() => import("./HeroOrb"), { ssr: false });

const MOTION = {
  section: {
    duration: 0.8,
    y: 32,
    ease: "expo.out",
    trigger: "top 87%" // Triggers earlier as it enters the viewport
  },
  content: {
    duration: 0.5,
    y: 16,
    ease: "power2.out",
    stagger: 0.08,
    delay: 0.12 // Coordinated delay after heading starts
  },
  hover: {
    duration: 0.2,
    ease: "easeOut"
  }
} as const;

const SCROLL_SYNC = {
  scrub: 1.8,
  start: "top top",
} as const;

const REVEAL_CONFIG = {
  ease: "expo.out",
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

// Magnetic button — attracts toward cursor on hover, springs back
function MagneticButton({ children, className = "", disabled }: { children: React.ReactNode, className?: string, disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 }); // Higher stiffness for faster feedback
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
          background: "rgba(13, 20, 40, 0.55)",
          border: "1px solid rgba(59, 130, 246, 0.18)",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
        }}
        className="w-full h-full rounded-2xl"
      />
    </motion.div>
  );
}

// Workflow Graphic — Technical system visualization for 'Our Approach'
function WorkflowGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 bg-[#060D1E]/80">
      <svg viewBox="0 0 600 400" className="w-full h-full relative z-10 overflow-visible">
        {/* Logic Grid Background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,130,246,0.07)" strokeWidth="0.5" />
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
              fill="rgba(200,215,255,0.45)"
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
      <div className="absolute inset-4 border border-blue-500/10 pointer-events-none" />
      <div className="absolute top-4 left-4 w-4 h-[1px] bg-blue-500/40" />
      <div className="absolute top-4 left-4 w-[1px] h-4 bg-blue-500/40" />
      <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-purple-500/40" />
      <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-purple-500/40" />
    </div>
  );
}

// Cinematic Preloader — Premium boot sequence
function CinematicPreloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0F1E] px-8"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400/80 mb-1">System Boot</span>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic">SunEdge_Core_v2.0</span>
          </div>
          <span className="text-xs font-mono text-blue-400">{Math.floor(progress)}%</span>
        </div>

        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden flex items-center">
          <motion.div
            className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="mt-6 flex justify-between text-[9px] font-mono text-blue-400/50 uppercase tracking-widest">
          <span>Loading_Modules...</span>
          <span>Encrypted_Link_Active</span>
        </div>
      </div>
    </motion.div>
  );
}

function HardwareVisualPlaceholder({ index }: { index: number }) {
  const hardwareImages = [
    { src: "/hardware/ram-modules.svg", alt: "RAM modules arranged on an enterprise memory board" },
    { src: "/hardware/storage-devices.svg", alt: "Enterprise SSD and HDD storage device visualization" },
    { src: "/hardware/server-hardware.svg", alt: "Rack server hardware with status indicators" },
    { src: "/hardware/custom-setup.svg", alt: "Custom hardware system architecture diagram" },
    { src: "/hardware/enterprise-solutions.svg", alt: "Connected enterprise hardware infrastructure nodes" },
  ];

  const image = hardwareImages[index] || hardwareImages[0];

  return (
    <div className="relative mb-10 h-52 overflow-hidden rounded-[26px] border border-blue-300/20 bg-[#0a142c]">
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#4ea0ff]/10 via-transparent to-[#020713]/58" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-100/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/35 to-transparent" />
      <div className="pointer-events-none absolute bottom-4 right-5 rounded-full border border-blue-200/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-blue-100/75">
        {`Visual_Module_${index + 1}`}
      </div>
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
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState({ name: "Core_System", code: "S_01" });
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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

      // 1) Strategic Solutions Sequence
      const solutionsTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#solutions",
          start: MOTION.section.trigger,
          toggleActions: "play none none reverse"
        }
      });
      solutionsTL.fromTo("#solutions .section-header", { opacity: 0, y: 32, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: MOTION.section.duration, ease: MOTION.section.ease })
        .fromTo("#solutions .service-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: MOTION.content.duration, stagger: MOTION.content.stagger, ease: MOTION.content.ease }, "-=0.6");

      // 2) Approach Sequence
      const approachTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#approach",
          start: MOTION.section.trigger,
          toggleActions: "play none none reverse"
        }
      });
      approachTL.fromTo("#approach .section-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: MOTION.section.duration, ease: MOTION.section.ease })
        .fromTo("#approach .approach-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: MOTION.content.duration, stagger: MOTION.content.stagger, ease: MOTION.content.ease }, "-=0.5");

      // 3) Hardware Sequence
      const hardwareTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#hardware",
          start: MOTION.section.trigger,
          toggleActions: "play none none reverse"
        }
      });
      hardwareTL.fromTo("#hardware .section-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: MOTION.section.duration, ease: MOTION.section.ease })
        .fromTo("#hardware .product-card", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: MOTION.content.duration, stagger: MOTION.content.stagger, ease: MOTION.content.ease }, "-=0.5");

      // 4) Memory Sequence
      const memoryTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#memory",
          start: MOTION.section.trigger,
          toggleActions: "play none none reverse"
        }
      });
      memoryTL.fromTo("#memory .section-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: MOTION.section.duration, ease: MOTION.section.ease })
        .fromTo("#memory .memory-visual", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: MOTION.content.duration, ease: MOTION.content.ease }, "-=0.4");

      // 5) About Authority Sequence
      const authorityTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-authority",
          start: MOTION.section.trigger,
          toggleActions: "play none none reverse"
        }
      });
      authorityTL.fromTo("#about-authority .section-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: MOTION.section.duration, ease: MOTION.section.ease })
        .fromTo("#about-authority .authority-item", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: MOTION.content.duration, stagger: 0.05, ease: MOTION.content.ease }, "-=0.4");

      // 6) Contact Sequence
      const contactTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: MOTION.section.trigger,
          toggleActions: "play none none reverse"
        }
      });
      contactTL.fromTo("#contact .section-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: MOTION.section.duration, ease: MOTION.section.ease })
        .fromTo("#contact .contact-form", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: MOTION.content.duration, ease: MOTION.content.ease }, "-=0.4");

      // 3) Horizontal Scroll — Sliding Showcase
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const scrollWidth = track.scrollWidth - window.innerWidth + 200;

        const horizontalTween = gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: SCROLL_SYNC.scrub,
            start: SCROLL_SYNC.start,
            end: () => `+=${scrollWidth}`,
            anticipatePin: 1,
          }
        });

        // Cinematic Center Focus Logic
        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.96, filter: "saturate(0.9) brightness(0.82)", opacity: 0.78 },
            {
              scale: 1.02,
              filter: "saturate(1.08) brightness(1.1)",
              opacity: 1,
              ease: REVEAL_CONFIG.ease,
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 72%",
                end: "left 38%",
                scrub: true,
              }
            }
          );

          ScrollTrigger.create({
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 60%",
            end: "right 40%",
            onToggle: (self) => card.classList.toggle("is-active", self.isActive),
          });
        });
      }

      // Section HUD Logic
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top center",
        end: "bottom center",
        onToggle: self => self.isActive && setActiveSection({ name: "Core_System", code: "S_01" })
      });
      ScrollTrigger.create({
        trigger: "#services",
        start: "top center",
        end: "bottom center",
        onToggle: self => self.isActive && setActiveSection({ name: "Strategic_Services", code: "S_02" })
      });

      const hardwareTrigger = horizontalSectionRef.current;
      if (hardwareTrigger) {
        ScrollTrigger.create({
          trigger: hardwareTrigger,
          start: "top center",
          end: () => `+=${horizontalTrackRef.current?.scrollWidth || 2000}`,
          onToggle: self => self.isActive && setActiveSection({ name: "Hardware_Showcase", code: "H_01" })
        });
      }

      const memoryTrigger = document.getElementById("memory");
      if (memoryTrigger) {
        ScrollTrigger.create({
          trigger: memoryTrigger,
          start: "top center",
          end: "bottom center",
          onToggle: self => self.isActive && setActiveSection({ name: "Memory_Systems", code: "M_01" })
        });
      }
      ScrollTrigger.create({
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        onToggle: self => self.isActive && setActiveSection({ name: "Brand_Authority", code: "S_06" })
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
    <main className="min-h-screen bg-[#0A0F1E] text-[#E8EEFF]">
      <AnimatePresence>
        {isLoading && <CinematicPreloader />}
      </AnimatePresence>
      <SectionHUD sectionName={activeSection.name} sectionCode={activeSection.code} />
      <div className="ambient-bg" />

      {/* HERO SECTION - SPLIT SCREEN */}
      <section id="hero" className="hero-section relative flex min-h-screen items-center px-6 md:px-8 overflow-hidden pt-32 pb-24">
        {/* Cinematic ambient light streaks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] -left-[10%] w-[70%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform rotate-[15deg]" />
          <div className="absolute bottom-[30%] -right-[10%] w-[50%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -rotate-[12deg]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.08),transparent_60%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_30%,rgba(123,92,255,0.06),transparent_60%)]" />
        </div>

        <div className="mx-auto w-full max-w-7xl relative z-10 grid lg:grid-cols-2 items-center gap-12 hero-parallax-layer">
          <div className="hero-content">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-blue-400/80">
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
            <div className="mt-6 max-w-xl">
              <p className="text-base text-blue-100/50 md:text-lg leading-relaxed">
                Powering enterprises with next-generation software and mission-critical hardware infrastructure.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              <MagneticButton className="rounded-full bg-blue-500 px-12 py-4 text-white font-bold tracking-wide transition-all duration-200 hover:bg-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] active:scale-[0.97]">
                Explore Our Solutions
              </MagneticButton>
              <MagneticButton className="rounded-full border border-blue-500/25 bg-blue-950/40 backdrop-blur-md px-12 py-4 font-bold text-blue-100 tracking-wide transition-all duration-200 hover:bg-blue-900/60 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] active:scale-[0.97]">
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

      <div className="section-divider opacity-50" />

      {/* STRATEGIC SOLUTIONS GRID */}
      <section id="solutions" className="py-24 px-6 md:px-8 relative z-10">
        {/* Section ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl">
          <div className="section-header mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6">Strategic Solutions</h2>
              <p className="text-lg text-blue-200/50">Custom-engineered packages for vertical-specific technology demands.</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent hidden md:block mb-4 md:ml-12" />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {solutions.map((item, i) => (
              <TiltCard key={i} className="service-card relative overflow-hidden rounded-[32px] p-8 bg-[#0D1630]/70 border border-blue-500/10 backdrop-blur-2xl transition-all duration-700 group hover:border-blue-400/30 hover:shadow-[0_0_60px_rgba(59,130,246,0.18)]">
                {/* Scanner sweep effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
                </div>
                <div className="absolute top-0 right-0 p-8 text-blue-500/[0.07] font-black text-7xl group-hover:text-blue-400/15 transition-all duration-700">0{i + 1}</div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-all duration-500 relative z-[2]">{item.title}</h3>
                <p className="text-blue-100/40 leading-relaxed text-lg relative z-[2]">{item.desc}</p>
                <div className="mt-12 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-blue-400/0 group-hover:w-full transition-all duration-1000 ease-out" />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PROTOCOL APPROACH */}
      <section id="approach" className="py-24 px-6 md:px-8 relative overflow-hidden">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="glass aspect-[16/9] lg:aspect-[4/3] rounded-[32px] overflow-hidden relative group">
                <WorkflowGraphic />
              </div>
            </div>

            <div>
              <div className="section-header">
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-12">Our Approach</h2>
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
                      delay: i * MOTION.content.stagger,
                      ease: "easeOut"
                    }}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 transition-all duration-200">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-all duration-200">{step.title}</h3>
                      <p className="text-blue-100/40 leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* HARDWARE INFRASTRUCTURE — HORIZONTAL SLIDING SHOWCASE */}
      <section ref={horizontalSectionRef} id="hardware" className="relative bg-[#081022] py-24 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(42,98,210,0.2),transparent_58%)]" />
          <div className="absolute inset-x-0 top-0 h-[68%] bg-[linear-gradient(180deg,rgba(20,39,79,0.4)_0%,rgba(9,16,33,0)_100%)]" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 mb-12 section-header">
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-6">Hardware Infrastructure</h2>
          <p className="text-lg text-slate-400 max-w-[70ch]">Reliable hardware for mission-critical business environments.</p>
        </div>

        {/* Viewport Mask — allows vertical overflow for shadows but clips horizontal */}
        <div className="slider-mask relative overflow-x-hidden overflow-y-visible py-12">
          <div ref={horizontalTrackRef} className="horizontal-track flex px-6 md:px-8">
            {hardwareProducts.map((product, i) => (
              <article
                key={i}
                className="product-card flex-shrink-0 w-[440px] mr-16 relative overflow-hidden rounded-[34px] p-8 bg-[#132448]/96 border border-blue-300/24 shadow-[0_20px_60px_rgba(2,8,22,0.78),inset_0_1px_0_rgba(174,214,255,0.17),inset_0_-1px_0_rgba(24,53,114,0.72)] transition-all duration-500 group hover:border-blue-200/42 hover:bg-[#1a3160]/96 hover:shadow-[0_28px_90px_rgba(5,13,33,0.9),0_0_30px_rgba(84,164,255,0.24),inset_0_1px_0_rgba(199,229,255,0.25)] transform-gpu will-change-transform"
              >
                <div className="active-card-glow pointer-events-none absolute -inset-x-8 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(98,179,255,0.24)_0%,rgba(45,103,203,0.12)_44%,transparent_76%)] opacity-0 blur-3xl transition-opacity duration-500" />
                {/* Depth lighting */}
                <div className="absolute inset-0 opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-100/65 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-200/[0.12] via-transparent to-[#070d1d]/46" />
                  <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-blue-200/40 via-blue-300/10 to-transparent" />
                </div>

                <HardwareVisualPlaceholder index={i} />
                <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.4em] mb-8 opacity-60">System_Module 0{i + 1}</p>
                <h3 className="text-3xl font-bold mb-8 tracking-tighter text-white">{product.title}</h3>
                <p className="text-blue-100/40 leading-relaxed text-lg relative z-[2]">{product.desc}</p>

                <div className="mt-12 flex items-center gap-4 text-[10px] font-mono text-blue-400/50 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-blue-500/40 animate-pulse" />
                  <span>Verification_Active</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MEMORY SOLUTIONS - ENTERPRISE RAM */}
      <section id="memory" className="py-24 px-6 md:px-8 relative overflow-hidden">
        {/* Enhanced ambient depth — purple/blue accent lighting */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/6 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute left-1/4 top-0 w-[400px] h-[400px] bg-blue-600/4 blur-[150px] rounded-full pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* LEFT: Typography dominant */}
            <div>
              <div className="section-header mb-6">
                <h2 className="text-3xl font-bold md:text-5xl tracking-tight">
                  <CinematicText>Memory Solutions</CinematicText>
                </h2>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed mb-12">
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
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.ease } } }}>
                <PrecisionPanel className="w-[220px] h-[300px] top-[10%] left-[5%]" driftX={5} driftY={8} delay={0} duration={14} rotate={-3} />
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.ease } } }}>
                <PrecisionPanel className="w-[160px] h-[200px] top-[30%] left-[38%]" driftX={-4} driftY={6} delay={2} duration={16} rotate={4} />
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.ease } } }}>
                <PrecisionPanel className="w-[120px] h-[140px] bottom-[8%] left-[15%]" driftX={3} driftY={-5} delay={4} duration={18} rotate={-1} />
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: MOTION.content.duration, ease: MOTION.section.ease } } }}>
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
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider opacity-50" />

      {/* ABOUT SUNEDGE — restructured for visual authority */}
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
            <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-6">About SunEdge</h2>
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
              <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
            </motion.div>

            {/* RIGHT: Scan-friendly authority blocks */}
            <div className="space-y-8">
              {/* Statement block */}
              <div className="border-l-2 border-blue-500/40 pl-8 py-2">
                <p className="text-2xl md:text-3xl font-light text-blue-100/60 leading-snug">
                  <span className="text-blue-400 font-bold">DPIIT Recognized.</span>{" "}
                  <span className="text-violet-400 font-bold">MSME Registered.</span>{" "}
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
                      ease: MOTION.content.ease
                    }}
                    className="flex gap-5 items-start group p-5 border border-blue-500/10 rounded-2xl hover:border-blue-500/25 hover:bg-blue-500/5 transition-all duration-200 authority-item"
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

      {/* CONTACT SECTION - PREMIUM CORPORATE */}
      <section id="contact" className="py-24 px-6 md:px-8 relative bg-[#080E1C]">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="section-header">
                <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-6">Let&apos;s Talk About Your Requirements</h2>
                <p className="text-lg text-blue-100/50 leading-relaxed max-w-xl mb-12">
                  Share your current goals and technical constraints. Our team will respond with a practical, implementation-ready direction.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-400/40 transition-all shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Registered Office</h4>
                    <p className="text-lg font-medium">Unitech Cyber Park, Sec-39, Gurugram, Haryana</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-400/40 transition-all shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Corporate Office</h4>
                    <p className="text-lg font-medium">601A, Hemkunt Chamber, Building No. 89,</p>
                    <p className="text-lg font-medium">Nehru Place, New Delhi, Delhi – 110074</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-400/40 transition-all shrink-0 mt-1">
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

            <div className="relative contact-form">
              <div className="surface-tint p-8 md:p-12 border border-blue-500/15 relative overflow-hidden">
                {status === "success" ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0F1E]/95 backdrop-blur-md p-8 text-center animate-in fade-in duration-500">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-blue-100/50">Thank you for contacting us. We will get back to you shortly.</p>
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
                      className="w-full bg-[#0D1630] border border-blue-500/20 text-blue-100 rounded-xl px-6 py-3.5 outline-none focus:border-blue-400/50 focus:bg-[#101D40] transition-all duration-200 input-focus-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#0D1630] border border-blue-500/20 text-blue-100 rounded-xl px-6 py-3.5 outline-none focus:border-blue-400/50 focus:bg-[#101D40] transition-all duration-200 input-focus-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#0D1630] border border-blue-500/20 text-blue-100 rounded-xl px-6 py-3.5 outline-none focus:border-blue-400/50 focus:bg-[#101D40] transition-all duration-200 input-focus-glow"
                    />
                  </div>
                  <MagneticButton disabled={status === "sending"} className="w-full rounded-full bg-blue-600 text-white py-4 font-bold tracking-wide transition-colors hover:bg-blue-700 hover:shadow-[0_4px_20px_rgba(29,110,230,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
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
      <section className="py-24 px-6 md:px-8 text-center relative overflow-hidden">
        <div className="mx-auto w-full max-w-7xl relative z-10">
          <h2 className="text-4xl font-bold md:text-6xl tracking-tight mb-12">
            Let’s Build Your <br />
            <span className="text-blue-500 italic font-light">Technology Infrastructure</span>
          </h2>
          <MagneticButton className="rounded-full bg-blue-500 text-white px-12 py-4 text-lg font-black transition-all hover:scale-[1.03] hover:bg-blue-400 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] active:scale-95">
            GET CONSULTATION
          </MagneticButton>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
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


      <footer className="py-24 px-6 md:px-8 border-t border-blue-500/10 text-blue-200/40 text-sm bg-[#060B18]">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-white font-bold tracking-widest uppercase mb-6 text-lg">SunEdge IT Solution Pvt. Ltd.</div>
              <p className="max-w-xs text-blue-200/40 mb-8 leading-relaxed">
                Empowering enterprises with next-generation technology infrastructure and strategic software solutions.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders could go here */}
              </div>
            </div>
            <div>
              <h4 className="text-blue-300/60 font-bold uppercase tracking-widest mb-6 text-xs">Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Software Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">IT Consulting</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud Migration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-300/60 font-bold uppercase tracking-widest mb-6 text-xs">Hardware</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Enterprise Servers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Storage Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Networking Gear</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-6">
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
