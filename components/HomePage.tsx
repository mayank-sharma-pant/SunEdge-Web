"use client";

import { motion, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function CinematicText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
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

const solutions = [
  { title: "Enterprise CRM", desc: "Custom-engineered systems for high-volume customer operations." },
  { title: "Cloud Scale IT", desc: "Resilient infrastructure migrations for modern digital ecosystems." },
  { title: "Infrastructure Security", desc: "Advanced perimeter hardening and threat detection protocols." }
];

const approachSteps = [
  { title: "Assessment", desc: "Rigorous analysis of existing technical architecture and goals." },
  { title: "Strategy", desc: "Engineering a scalable roadmap for long-term operational impact." },
  { title: "Execution", desc: "Precision-driven implementation with real-time performance tracking." },
  { title: "Optimization", desc: "Continuous refinement for maximum stability and speed." }
];

const services = [
  {
    title: "CRM Software",
    copy: "Streamlined customer management systems designed for operational efficiency."
  },
  {
    title: "IT Projects",
    copy: "End-to-end technology implementation tailored to business requirements."
  },
  {
    title: "Hardware Solutions",
    copy: "Professional hardware infrastructure and deployment services."
  }
];

const hardwareProducts = [
  { title: "Networking Equipment", desc: "Next-gen routing and high-performance switching architectures." },
  { title: "IT Infrastructure", desc: "Enterprise-grade server stacks and resilient storage clusters." },
  { title: "Security Devices", desc: "Advanced physical and digital perimeter protection systems." },
  { title: "Custom Hardware", desc: "Specialized engineering for unique industrial requirements." },
  { title: "Monitoring Hubs", desc: "Real-time system telemetry and infrastructure control centers." }
];

const trustMetrics = [
  { value: "120+", label: "Enterprise Engagements" },
  { value: "99.98%", label: "Infrastructure Uptime" },
  { value: "24/7", label: "Mission-Critical Support" }
];

const whyChooseUs = [
  {
    title: "Precision-Driven Execution",
    desc: "Engineering workflows built for accuracy and long-term operational resilience."
  },
  {
    title: "Modern Technology Approach",
    desc: "Leveraging adaptive cloud architectures and secure, scalable technical stacks."
  },
  {
    title: "Business-Centric Solutions",
    desc: "Aligning technical milestones with actual business outcomes and project goals."
  },
  {
    title: "Reliable Technical Support",
    desc: "Dedicated mission-critical support maintaining 99.9% uptime for enterprise clients."
  }
];

export function HomePage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1) Hero Reveal (Enhanced Cinematic)
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 60, filter: "blur(25px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "expo.out",
          onStart: () => {
            gsap.fromTo(".hero-headline",
              { letterSpacing: "0.2em", opacity: 0 },
              { letterSpacing: "normal", opacity: 1, duration: 2, ease: "power4.out" }
            );
          }
        }
      );

      // Hero Glass Orb Motion
      gsap.to(".glass-orb-container", {
        y: -15,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Continuous Rotation for Stripe Mesh
      gsap.to(".sphere-stripe-mesh", {
        rotateX: 360,
        rotateY: 360,
        duration: 30,
        ease: "none",
        repeat: -1
      });

      // Hover Tracking with Micro-Tilt
      const hero = document.querySelector(".hero-section");
      const orb = document.querySelector(".glass-orb-container");
      const orbInner = document.querySelector(".glass-orb-inner");

      if (hero && orb && orbInner) {
        hero.addEventListener("mousemove", (e: any) => {
          const { clientX, clientY } = e;
          const rect = orb.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const x = (clientX - centerX) * 0.03;
          const y = (clientY - centerY) * 0.03;

          const rotateX = (clientY - centerY) * -0.05;
          const rotateY = (clientX - centerX) * 0.05;

          gsap.to(orb, { x, y, duration: 1.2, ease: "power2.out" });
          gsap.to(orbInner, { rotateX, rotateY, duration: 1.2, ease: "power2.out" });
        });

        // Click Interaction (Pulse + Shimmer)
        orb.addEventListener("click", () => {
          const tl = gsap.timeline();
          tl.to(orb, { scale: 1.08, duration: 0.4, ease: "back.out(2)" })
            .to(orb, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.1");

          gsap.fromTo(".shimmer-light",
            { opacity: 0, x: "-100%", y: "-100%" },
            { opacity: 0.8, x: "100%", y: "100%", duration: 0.8, ease: "power4.inOut" }
          );

          gsap.to(".glass-orb", {
            boxShadow: "0 0 140px rgba(123, 92, 255, 0.3)",
            duration: 0.3,
            yoyo: true,
            repeat: 1
          });
        });
      }

      // Hero Parallax Scroll
      gsap.to(".hero-parallax-layer", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 2) Services Reveal (Richer)
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover Micro-Tilt Logic for Cards
        card.addEventListener("mousemove", (e: any) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 10,
            rotateX: -y * 10,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out"
          });
          const shimmer = card.querySelector(".card-shimmer");
          if (shimmer) {
            gsap.to(shimmer, {
              opacity: 0.4,
              x: x * 100 + "%",
              y: y * 100 + "%",
              duration: 0.5
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" });
          const shimmer = card.querySelector(".card-shimmer");
          if (shimmer) gsap.to(shimmer, { opacity: 0, duration: 0.5 });
        });
      });

      // Section Transitions (Glow Wipe)
      const sections = gsap.utils.toArray<HTMLElement>("section");
      sections.forEach((section, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 90%",
          onEnter: () => {
            if (transitionRef.current) {
              transitionRef.current.classList.add("glow-wipe-active");
              setTimeout(() => transitionRef.current?.classList.remove("glow-wipe-active"), 1500);
            }
          }
        });
      });

      // 3) Horizontal Scroll (Dramatic Cinematic)
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const scrollWidth = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.15);

        const horizontalTween = gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1.5,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            anticipatePin: 1,
          }
        });

        // Cinematic Center Focus Logic
        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.9, filter: "blur(4px)", opacity: 0.6 },
            {
              scale: 1.05,
              filter: "blur(0px)",
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 60%",
                end: "left 40%",
                scrub: true,
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // 4) About Reveal (Calm Elegant)
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, filter: "blur(15px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".about-trigger",
            start: "top 85%"
          }
        }
      );

      // 5) Why us Reveal (Cinematic Blur-to-Sharp)
      gsap.fromTo(
        ".why-us-card",
        { opacity: 0, scale: 0.95, y: 30, filter: "blur(15px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-us-trigger",
            start: "top 80%"
          }
        }
      );

      // 6) Contact Reveal (Smooth Refined)
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-trigger",
            start: "top 85%"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#07070a] text-slate-100 selection:bg-purple/40 selection:text-white">
      <div ref={transitionRef} className="glow-wipe-transition" />
      <div className="ambient-bg" />

      {/* 1) HERO SECTION */}
      <section className="hero-section relative flex min-h-screen items-center px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl relative z-10 grid lg:grid-cols-2 items-center gap-20">
          <div className="hero-content hero-parallax-layer">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-xs font-bold uppercase tracking-[0.6em] text-blue/90"
            >
              Enterprise Engineering
            </motion.p>
            <h1 className="hero-headline text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              <CinematicText>Advanced Technology</CinematicText> <br />
              <span className="bg-gradient-to-r from-purple via-blue to-purple bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                <CinematicText>Solutions for Modern Businesses</CinematicText>
              </span>
            </h1>
            <p className="hero-subtext mt-8 max-w-xl text-lg text-slate-400 md:text-xl leading-relaxed">
              CRM Software • IT Projects • Hardware Infrastructure
            </p>
            <p className="text-slate-500 mt-4 text-sm font-medium tracking-wide">
              Designed for performance, stability, and scalability.
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <button className="group relative overflow-hidden rounded-full border border-purple/60 bg-purple/10 px-10 py-4 text-sm font-bold tracking-widest uppercase text-white transition-all hover:bg-purple/20 hover:shadow-glow animate-pulse-neon">
                Explore Solutions
              </button>
              <button className="glass group rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase transition-all hover:bg-white/5 hover:border-white/20">
                Contact Us
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center lg:justify-end">
            <div className="glass-orb-container relative w-64 h-64 md:w-96 md:h-96" style={{ perspective: "1000px" }}>
              <div className="glass-orb glass-orb-inner w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Stripe Mesh Layer */}
                <div className="sphere-stripe-mesh absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                  <div className="sphere-stripe" style={{ transform: "translate(-50%, -50%) rotateX(0deg)" }} />
                  <div className="sphere-stripe" style={{ transform: "translate(-50%, -50%) rotateX(45deg)" }} />
                  <div className="sphere-stripe" style={{ transform: "translate(-50%, -50%) rotateX(90deg)" }} />
                  <div className="sphere-stripe" style={{ transform: "translate(-50%, -50%) rotateY(45deg)" }} />
                  <div className="sphere-stripe" style={{ transform: "translate(-50%, -50%) rotateY(-45deg)" }} />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-blue/20 opacity-30" />
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />

                {/* Interactive Shimmer Light */}
                <div className="shimmer-light" />
              </div>
              <div className="haze-bg absolute -inset-20 opacity-40" />
            </div>
          </div>
        </div>
        <div className="absolute right-[-15%] top-[15%] w-[70%] h-[70%] rounded-full bg-purple/10 blur-[150px] pointer-events-none opacity-20" />
      </section>

      {/* 2) SERVICES SECTION */}
      <section className="relative py-40 px-6 md:px-12 lg:px-20 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 flex items-center gap-10">
            <h2 className="text-4xl font-semibold md:text-6xl tracking-tight">
              <CinematicText>Core Services</CinematicText>
            </h2>
            <div className="flex-grow h-px bg-gradient-to-r from-purple/40 to-transparent" />
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                className="service-card glass group relative rounded-[40px] p-12 transition-all hover:bg-white/[0.04] hover:border-purple/40 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="card-shimmer absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 pointer-events-none" />
                <div className="absolute -inset-0.5 rounded-[40px] bg-gradient-to-b from-purple/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-10 inline-flex rounded-3xl bg-purple/10 p-5 text-purple shadow-glow">
                    {i === 0 && (
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-3xl font-medium tracking-tight mb-5">{service.title}</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple to-transparent mb-6 opacity-40" />
                  <p className="text-slate-400 leading-relaxed text-lg">{service.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: SOLUTIONS OVERVIEW SECTION */}
      <section className="relative py-40 px-6 md:px-12 lg:px-20 z-10 bg-[#0a0a0f]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-semibold md:text-6xl tracking-tight mb-6">
              <CinematicText>Strategic Solutions</CinematicText>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Vertical-specific technology packages designed for scalable business growth.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {solutions.map((sol, i) => (
              <div key={i} className="glass rounded-[40px] p-10 border-white/5 hover:border-blue/30 transition-all duration-700 group">
                <div className="text-blue/40 text-xs font-bold uppercase tracking-widest mb-6">Package 0{i + 1}</div>
                <h3 className="text-2xl font-semibold mb-4">{sol.title}</h3>
                <p className="text-slate-400 font-light italic">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) HARDWARE PRODUCTS SECTION (HORIZONTAL) */}
      <section ref={horizontalSectionRef} className="relative bg-[#09090c] overflow-hidden py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-20 text-center">
          <h2 className="text-4xl font-semibold md:text-7xl tracking-tighter">
            <CinematicText>Hardware Solutions & Infrastructure</CinematicText>
          </h2>
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-xl italic font-light">Reliable hardware solutions for modern business environments.</p>
        </div>

        <div className="relative">
          <div ref={horizontalTrackRef} className="horizontal-track px-6 md:px-12 lg:px-20 pb-20">
            {hardwareProducts.map((product, i) => (
              <div key={i} className="product-card group">
                <div className="glass h-[550px] w-full rounded-[60px] p-16 flex flex-col justify-end transition-all hover:bg-white/[0.05] hover:border-blue/40 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="relative z-10">
                    <span className="text-blue/80 text-sm font-black uppercase tracking-[0.3em] mb-6 block">Module 0{i + 1}</span>
                    <h3 className="text-4xl font-semibold mb-8 tracking-tight">{product.title}</h3>
                    <p className="text-slate-400 text-xl leading-relaxed max-w-sm">{product.desc}</p>

                    <button className="mt-12 flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-blue transition-colors duration-500">
                      View Protocol
                      <svg className="h-5 w-5 transform group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-[15vw] flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* NEW: OPERATIONAL FOCUS / PHILOSOPHY SECTION */}
      <section className="relative py-60 px-6 md:px-12 lg:px-20 overflow-hidden text-center bg-base">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white/5 select-none absolute -top-20 left-1/2 -translate-x-1/2 w-full">Precision</h2>
          <div className="space-y-12">
            <h3 className="text-4xl md:text-7xl font-semibold tracking-tight">
              <CinematicText>Architecting for Reliability.</CinematicText>
            </h3>
            <p className="text-2xl md:text-4xl text-slate-500 font-light max-w-4xl mx-auto leading-tight italic">
              "We believe technical excellence is the foundation of institutional trust."
            </p>
          </div>
        </div>
      </section>

      {/* 4) ABOUT SECTION */}
      <section className="about-trigger py-48 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="about-reveal grid gap-24 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-5xl font-semibold md:text-7xl tracking-tighter mb-10">
                Precision Engineering. <br />
                <span className="text-slate-600">Absolute Trust.</span>
              </h2>
              <p className="text-2xl text-slate-400 leading-relaxed font-light">
                SunEdge delivers high-performance technology architectures that empower organizations to operate with precision, reliability, and measurable impact.
              </p>

              <div className="mt-20 grid grid-cols-3 gap-12">
                {trustMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-4xl font-bold text-white mb-3 tracking-tighter">{metric.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="glass rounded-[50px] p-1 aspect-square relative z-10 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-blue/20 opacity-50" />
                <div className="h-full w-full rounded-[48px] bg-base/90 flex items-center justify-center border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(123,92,255,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="hero-logo text-center relative z-10">
                    <div className="h-24 w-24 mx-auto mb-8 rounded-3xl bg-blue/10 flex items-center justify-center text-blue shadow-glowBlue transition-transform duration-500 group-hover:rotate-[360deg]">
                      <svg fill="none" stroke="currentColor" className="h-10 w-10" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                      </svg>
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">Core Engine</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-[120%] h-[120%] bg-purple/10 rounded-full blur-[140px] pointer-events-none opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* NEW: OUR APPROACH / PROCESS SECTION */}
      <section className="relative py-40 px-6 md:px-12 lg:px-20 z-10 bg-[#07070a]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-semibold md:text-6xl tracking-tight mb-10">
                <CinematicText>The Protocol Approach</CinematicText>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed font-light mb-16">
                Our methodology ensures rigorous quality control and technical accountability at every milestone.
              </p>
              <div className="space-y-12">
                {approachSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-3xl font-bold text-purple/20 transition-colors group-hover:text-purple">0{i + 1}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-slate-500 font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass aspect-video rounded-[60px] overflow-hidden border-purple/20 relative group bg-base/40">
                {/* Visual Pattern for ProtocolPathway */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(123,92,255,0.1),transparent)]" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-blue/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full border border-purple/10 flex items-center justify-center animate-pulse-neon" />
                    <div className="absolute inset-0 w-48 h-48 rounded-full border border-blue/10 rotate-45" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-16 w-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M11 4a2 2 0 114 0v1a2 2 0 002 2h1a2 2 0 110 4h-1a2 2 0 00-2 2v1a2 2 0 01-4 0v-1a2 2 0 00-2-2H7a2 2 0 110-4h1a2 2 0 002-2V4z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating "Data Dots" */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
                    className="absolute w-1 h-1 bg-blue rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      filter: "blur(1px)"
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue/10 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* 5) WHY CHOOSE US SECTION */}
      <section className="why-us-trigger py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-20">
            <h2 className="text-4xl font-semibold md:text-6xl tracking-tight mb-8">
              Why Businesses Choose SunEdge
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -10, scale: 1.02 }}
                className="why-us-card glass group p-10 rounded-[40px] flex flex-col justify-between border-white/5 hover:border-purple/30 transition-all duration-500"
              >
                <div>
                  <div className="mb-8 text-blue/40 text-xs font-bold uppercase tracking-[0.3em]">Module 0{i + 1}</div>
                  <h3 className="text-2xl font-semibold mb-6 tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light italic">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-10 h-0.5 w-0 bg-purple group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
        {/* Subtle background flair */}
        <div className="absolute left-[30%] top-[40%] w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* 6) CONTACT SECTION */}
      <section className="contact-trigger py-40 px-6 md:px-12 lg:px-20 bg-base/30">
        <div className="mx-auto max-w-7xl">
          <div className="contact-reveal grid gap-20 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold md:text-6xl tracking-tight mb-8">Let’s Talk About <br /> Your Requirements</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-12">
                Tell us about your project or infrastructure needs.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-slate-300 font-medium">contact@sunedgeit.com</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span className="text-slate-300 font-medium">Global Operations Center</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-[40px] p-10 md:p-14 border-purple/20">
              <form className="space-y-8" action="#" method="POST">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 ml-1">Identity</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all focus-glow-purple placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 ml-1">Secure Channel</label>
                  <input
                    type="email"
                    placeholder="Corporate Email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all focus-glow-blue placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 ml-1">Payload</label>
                  <textarea
                    rows={4}
                    placeholder="Project Brief / Requirements"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all focus-glow-pink placeholder:text-slate-600 resize-none"
                  />
                </div>
                <button className="w-full rounded-2xl bg-white py-5 text-black font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.02] hover:shadow-glow">
                  Transmit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6) CTA SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 text-center">
        <div className="mx-auto max-w-6xl">
          <div className="glass relative rounded-[60px] p-20 md:p-32 text-center overflow-hidden border-purple/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple/10 via-transparent to-blue/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-semibold md:text-7xl tracking-tighter mb-10">
                Let’s Build Your <br />
                Technology Infrastructure
              </h2>
              <button className="group relative rounded-full bg-white px-16 py-6 text-black font-black uppercase tracking-[0.4em] text-xs transition-all hover:scale-105 hover:shadow-glow animate-pulse-neon">
                Get Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7) FOOTER */}
      <footer className="border-t border-white/5 py-24 px-6 md:px-12 lg:px-20 bg-base">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="text-3xl font-bold tracking-tighter mb-6 underline decoration-purple decoration-4 underline-offset-8">SunEdge</div>
              <p className="text-slate-500 max-w-xs text-sm font-light italic">
                Pioneering high-availability technology infrastructure for global enterprises.
              </p>
            </div>

            <div className="flex gap-16 text-xs uppercase tracking-[0.4em] font-black text-slate-500">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Case Studies</a>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[9px] uppercase tracking-[0.5em] font-black text-slate-700">
            <p>© {new Date().getFullYear()} SunEdge IT Solution</p>
            <p className="text-blue/40">Secure Engineering. Optimized Performance.</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP QUICK CHAT (FLOATING) */}
      <a
        href="https://wa.me/916239060064?text=Hello%20SunEdge%20IT%20Solution"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[100] group flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 backdrop-blur-xl px-6 py-4 rounded-full transition-all hover:bg-[#25D366]/20 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
      >
        <svg className="h-6 w-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        <span className="text-white font-bold tracking-widest uppercase text-[10px] sm:block hidden">Chat on WhatsApp</span>
      </a>

      {/* Progress Line */}
      <motion.div
        style={{ scaleX: useScroll().scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple via-blue to-purple origin-left z-[110]"
      />
    </main>
  );
}
