"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";

const HeroOrb = dynamic(() => import("./HeroOrb"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const scrollWidth = horizontalTrackRef.current.scrollWidth - window.innerWidth + 200;

        const horizontalTween = gsap.to(horizontalTrackRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 2.5,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            anticipatePin: 1,
          }
        });

        // Cinematic Center Focus Logic
        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.85, filter: "blur(8px)", opacity: 0.4 },
            {
              scale: 1.1,
              filter: "blur(0px)",
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 70%",
                end: "left 30%",
                scrub: true,
              }
            }
          );
        });
      }

      // Parallax Drift for Depth
      gsap.to(".parallax-layer", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
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
      <section className="hero-section relative flex min-h-screen items-center px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl relative z-10 grid lg:grid-cols-2 items-center gap-10">
          <div className="hero-content-anchor">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.4em] text-blue/80 opacity-80">
              SunEdge IT Solution
            </p>
            <h1 className="text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl tracking-tight">
              <div className="overflow-hidden">
                <CinematicText>Advanced</CinematicText>
              </div>
              <div className="overflow-hidden">
                <CinematicText>Technology</CinematicText>
              </div>
              <div className="overflow-hidden text-blue-500">
                <CinematicText>Solutions</CinematicText>
              </div>
            </h1>
            <div className="mt-8 max-w-xl">
              <p className="text-lg text-slate-400 md:text-xl leading-relaxed">
                Engineering high-performance technology architectures designed for performance, stability, and scalability.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-6">
              <button className="rounded-full bg-blue-600 px-10 py-5 font-bold tracking-wide transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95">
                Explore Services
              </button>
              <button className="rounded-full border border-white/10 glass px-10 py-5 font-bold tracking-wide transition-all hover:bg-white/5 hover:border-white/30 active:scale-95">
                Contact Us
              </button>
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

      {/* STRATEGIC SOLUTIONS GRID */}
      <section className="py-40 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl mb-6">Strategic Solutions</h2>
              <p className="text-xl text-slate-400">Custom-engineered packages for vertical-specific technology demands.</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent hidden md:block mb-6 md:ml-12" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {solutions.map((item, i) => (
              <div key={i} className="glass rounded-[40px] p-12 border-white/5 hover:border-purple/30 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl group-hover:text-purple/10 transition-all">0{i + 1}</div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-blue-400 transition-all">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                <div className="mt-12 h-px w-0 bg-blue/30 group-hover:w-full transition-all duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL PHILOSOPHY */}
      <section className="py-40 px-6 md:px-12 lg:px-20 bg-[#07070a]/80 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <h2 className="text-6xl font-bold tracking-tighter md:text-9xl mb-12 opacity-90">
            <div className="overflow-hidden"><CinematicText>PRECISION</CinematicText></div>
            <div className="overflow-hidden text-blue-500"><CinematicText>& RELIABILITY</CinematicText></div>
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
              Engineering is not just about code or hardware. It is about building systems that withstand the pressure of massive scale and mission-critical demands.
            </p>
          </div>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {trustMetrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{m.value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOL APPROACH */}
      <section className="py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="glass aspect-[4/3] rounded-[60px] overflow-hidden border-purple/20 relative group bg-[#07070a]/60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,92,255,0.05),transparent_70%)]" />
                <div className="absolute inset-0 p-12 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Abstract Protocol Animation Placeholder */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[1px] border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[1px] border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(56,182,255,0.8)]" />
                      <div className="absolute w-12 h-[1px] bg-gradient-to-r from-blue-500 to-transparent origin-left rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl mb-12">Our Approach</h2>
              <div className="space-y-12">
                {approachSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-blue-500 font-bold group-hover:border-blue-500/40 transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-all">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HARDWARE SOLUTIONS (HORIZONTAL) */}
      <section ref={horizontalSectionRef} className="relative overflow-hidden bg-black/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20 relative z-10">
          <h2 className="text-4xl font-bold md:text-6xl tracking-tight">Hardware Infrastructure</h2>
          <p className="mt-6 text-xl text-slate-400">Reliable hardware for mission-critical business environments.</p>
        </div>

        <div ref={horizontalTrackRef} className="horizontal-track flex px-6 md:px-12 lg:px-20 pb-40">
          {hardwareProducts.map((product, i) => (
            <div key={i} className="product-card glass rounded-[50px] p-16 border-white/5 bg-[#07070a]/40 backdrop-blur-xl group hover:border-blue-500/20 transition-all duration-1000">
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-8 opacity-60">Module 0{i + 1}</div>
              <h3 className="text-3xl font-bold mb-8">{product.title}</h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-12">{product.desc}</p>
              <div className="flex items-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0">
                <span>VIEW SPECIFICATIONS</span>
                <div className="h-px w-10 bg-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION - REFINED CORPORATE */}
      <section className="py-60 px-6 md:px-12 lg:px-20 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-12 space-y-12 mb-20">
              <h2 className="text-5xl font-bold md:text-8xl tracking-tight leading-[0.95]">
                <div className="overflow-hidden"><CinematicText>Precision Engineering.</CinematicText></div>
                <div className="overflow-hidden text-blue-500"><CinematicText>Absolute Trust.</CinematicText></div>
              </h2>
            </div>

            <div className="lg:col-span-8 lg:col-start-1">
              <div className="surface-tint p-12 md:p-20 border border-white/5">
                <p className="text-2xl md:text-3xl text-slate-100 leading-relaxed font-light italic">
                  "SunEdge delivers high-performance technology architectures that empower organizations to operate with precision, reliability, and measurable impact."
                </p>
                <div className="mt-16 flex items-center gap-6">
                  <div className="h-[2px] w-20 bg-blue-600" />
                  <span className="text-sm font-bold uppercase tracking-[0.4em] opacity-60">The SunEdge Standard</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              {whyChooseUs.map((item, i) => (
                <div key={i} className="p-8 border-l-[1px] border-white/5 hover:border-blue-500/40 transition-all">
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - PREMIUM CORPORATE */}
      <section className="py-40 px-6 md:px-12 lg:px-20 relative bg-[#07070a]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold md:text-6xl tracking-tight mb-8">Let’s Talk About Your Requirements</h2>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                  Share your current goals and technical constraints. Our team will respond with a practical, implementation-ready direction.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/40 transition-all">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Office Headquarters</h4>
                    <p className="text-xl font-medium">Global Business Center, Tech Park, India</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/40 transition-all">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Direct Communication</h4>
                    <p className="text-xl font-medium">info@sunedgeit.com</p>
                    <p className="text-xl font-medium">+91 62390 60064</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="surface-tint p-12 md:p-16 border border-white/5">
                <form className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Message</label>
                    <textarea rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all" />
                  </div>
                  <button className="w-full rounded-full bg-blue-600 py-5 font-bold tracking-wide transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="mx-auto max-w-5xl relative z-10">
          <h2 className="text-5xl font-bold md:text-8xl tracking-tight mb-16">
            Let’s Build Your <br />
            <span className="text-blue-500 italic font-light">Technology Infrastructure</span>
          </h2>
          <button className="rounded-full bg-white text-black px-16 py-6 text-lg font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            GET CONSULTATION
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
      </section>

      {/* WHATSAPP QUICK CHAT */}
      <a
        href="https://wa.me/916239060064?text=Hello%20SunEdge%20IT%20Solution"
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

      <footer className="py-20 px-6 border-t border-white/5 text-slate-500 text-sm">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-white font-bold tracking-widest uppercase mb-2">SunEdge IT Solution</div>
            <p>© 2026 Engineering High-Performance Technical Architectures.</p>
          </div>
          <div className="flex gap-12 uppercase tracking-widest text-[10px] font-bold">
            <span className="hover:text-blue-500 transition-all cursor-pointer">Protocol</span>
            <span className="hover:text-blue-500 transition-all cursor-pointer">Infrastructure</span>
            <span className="hover:text-blue-500 transition-all cursor-pointer">Governance</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
