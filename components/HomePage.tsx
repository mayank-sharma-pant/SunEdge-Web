"use client";

import { motion } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "CRM Software",
    copy: "Built for sales and support teams that need reliable workflows, clean reporting, and predictable delivery."
  },
  {
    title: "IT Projects",
    copy: "From migration to modernization, we execute structured IT programs with strong governance and security."
  },
  {
    title: "Hardware Solutions",
    copy: "Design, procurement, deployment, and lifecycle support for enterprise-grade hardware environments."
  }
];

const hardwareItems = [
  "Networking Equipment",
  "IT Infrastructure Devices",
  "Enterprise Hardware Solutions",
  "Custom Hardware Setup"
];

export function HomePage() {
  const hardwareSectionRef = useRef<HTMLElement>(null);
  const hardwareTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-ambient", {
        backgroundPosition: "60% 45%, 30% 55%, 50% 65%",
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 36, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-trigger",
            start: "top 78%"
          }
        }
      );

      if (hardwareSectionRef.current && hardwareTrackRef.current) {
        const hardwareTween = gsap.to(hardwareTrackRef.current, {
          xPercent: -52,
          ease: "none",
          scrollTrigger: {
            id: "hardware-scroll",
            trigger: hardwareSectionRef.current,
            start: "top top",
            end: "+=1600",
            pin: true,
            scrub: 1.4
          }
        });

        gsap.utils.toArray<HTMLElement>(".hardware-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.35, scale: 0.96, filter: "blur(6px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: hardwareTween,
                start: "left 70%",
                end: "center center",
                scrub: true
              }
            }
          );
        });
      }

      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 24, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
    copy: "Custom CRM systems focused on team productivity, automation, and customer lifecycle visibility."
  },
  {
    title: "IT Projects",
    copy: "End-to-end IT execution for modernization, cloud transformation, and secure enterprise operations."
  },
  {
    title: "Hardware Solutions",
    copy: "Reliable infrastructure design, deployment, and support for high-availability business environments."
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

export function HomePage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50, filter: "blur(15px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power4.out" }
      );

      // Hero Parallax
      gsap.to(".hero-headline", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-content",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-subtext", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-content",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Services scroll trigger
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.95, filter: "blur(10px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Horizontal Scroll for Hardware
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const scrollWidth = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);

        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1.5, // Increased scrub for smoother glide
            start: "top top",
            end: () => `+=${scrollWidth}`,
            anticipatePin: 1,
          }
        });
      }

      // About reveal
      gsap.fromTo(
        ".about-text",
        { opacity: 0, x: -20, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: ".about-trigger",
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-trigger",
            start: "top 82%"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-hidden bg-base text-slate-100">
      <div className="hero-ambient ambient-bg pointer-events-none" aria-hidden />

      <section className="relative flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass neon-border max-w-4xl rounded-3xl p-10 md:p-14"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-blue/80">SunEdge IT Solution</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Advanced Technology Solutions for Modern Businesses
            </h1>
            <p className="mt-6 text-base text-slate-300 md:text-lg">
              CRM Software • IT Projects • Hardware Infrastructure
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-full border border-purple/60 bg-purple/20 px-8 py-3 text-sm font-medium shadow-glow transition duration-300 hover:scale-[1.02] hover:bg-purple/30 hover:shadow-[0_0_34px_rgba(123,92,255,0.45)]">
                Explore Solutions
              </button>
              <button className="glass rounded-full border border-white/10 px-8 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-blue/60 hover:shadow-glowBlue">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="services-trigger px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-semibold md:text-4xl">Core Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <motion.article
                key={service.title}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="service-card glass rounded-2xl p-8 transition duration-300 hover:border-purple/60 hover:shadow-glow"
              >
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{service.copy}</p>
    <main className="relative bg-base text-slate-100 selection:bg-purple/30 selection:text-white">
      <div className="ambient-bg pointer-events-none fixed opacity-50" />

      {/* 1) HERO SECTION */}
      <section className="relative flex min-h-screen items-center px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl relative z-10">
          <div className="hero-content max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-blue/90"
            >
              Enterprise Intelligence
            </motion.p>
            <h1 className="hero-headline text-5xl font-semibold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
              Advanced Technology <br />
              <span className="bg-gradient-to-r from-purple via-blue to-purple bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                Solutions for Modern Businesses
              </span>
            </h1>
            <p className="hero-subtext mt-8 max-w-2xl text-lg text-slate-400 md:text-xl leading-relaxed">
              CRM Software • IT Projects • Hardware Infrastructure
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <button className="group relative overflow-hidden rounded-full border border-purple/50 bg-purple/10 px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:border-purple hover:bg-purple/20 hover:shadow-glow animate-pulse-neon">
                Explore Solutions
              </button>
              <button className="glass group rounded-full px-10 py-4 text-sm font-semibold tracking-wide transition-all hover:bg-white/5 hover:border-white/20">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Hero Visual Background Element */}
        <div className="absolute right-[-10%] top-[20%] w-[60%] h-[60%] rounded-full bg-purple/5 blur-[120px] pointer-events-none" />
        <div className="absolute left-[10%] bottom-[10%] w-[40%] h-[40%] rounded-full bg-blue/5 blur-[100px] pointer-events-none" />
      </section>

      {/* 2) SERVICES SECTION */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-3xl font-semibold md:text-5xl tracking-tight">Core Services</h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple to-blue" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                whileHover={{ y: -10 }}
                className="service-card glass group relative rounded-3xl p-10 transition-all hover:bg-white/[0.03] hover:border-purple/30"
              >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-purple/20 to-transparent opacity-0 transition-all group-hover:opacity-100" />
                <div className="relative z-10">
                  <span className="inline-block mb-8 rounded-2xl bg-white/5 p-4 text-purple">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h10M7 12h10M7 17h10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight mb-5">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-base">{service.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={hardwareSectionRef} className="relative px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto mb-10 max-w-6xl">
          <h2 className="text-3xl font-semibold md:text-4xl">Hardware Products</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Engineered hardware ecosystems for performance, reliability, and long-term operational stability.
          </p>
        </div>

        <div className="overflow-hidden">
          <div ref={hardwareTrackRef} className="flex w-[210%] gap-6 pr-20 md:gap-8">
            {hardwareItems.map((item) => (
              <article
                key={item}
                className="hardware-card glass neon-border min-h-[300px] w-[78vw] rounded-3xl p-8 md:w-[36vw]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-blue/80">Hardware Division</p>
                <h3 className="mt-4 text-2xl font-medium md:text-3xl">{item}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Precision-configured hardware architecture tailored for business-critical workloads.
                </p>
              </article>
            ))}
      {/* 3) HARDWARE PRODUCTS SECTION (HORIZONTAL CINEMATIC SCROLL) */}
      <section ref={horizontalSectionRef} className="relative bg-base/50 overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-16">
          <h2 className="text-3xl font-semibold md:text-5xl tracking-tight">Hardware Infrastructure</h2>
          <p className="mt-4 text-slate-400 max-w-xl">Cinematic showcase of our enterprise hardware capabilities and deployments.</p>
        </div>

        <div className="relative">
          <div ref={horizontalTrackRef} className="horizontal-track px-6 md:px-12 lg:px-20 pb-12">
            {hardwareProducts.map((product, i) => (
              <div key={i} className="product-card group">
                <div className="glass h-[500px] w-full rounded-[40px] p-12 flex flex-col justify-end transition-all hover:bg-white/[0.04] hover:border-blue/30 overflow-hidden relative">
                  {/* Decorative background circle */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-blue/10" />

                  <div className="relative z-10">
                    <span className="text-blue/60 text-xs font-bold uppercase tracking-widest mb-4 block">0{i + 1} / Performance Layer</span>
                    <h3 className="text-3xl font-semibold mb-6">{product.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{product.desc}</p>

                    <div className="mt-10 flex items-center gap-4 text-sm font-bold text-white/50 group-hover:text-blue transition-colors">
                      View Specs
                      <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Last Spacer for Padding */}
            <div className="w-[10vw] flex-shrink-0" />
          </div>
        </div>
      </section>

      <section className="about-trigger px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="about-reveal">
            <h2 className="text-3xl font-semibold md:text-4xl">Built on Reliability and Technical Discipline</h2>
            <p className="mt-5 text-slate-300">
              SunEdge IT Solution works with structured delivery methods, practical architecture decisions, and
              transparent execution.
            </p>
          </div>
          <div className="glass about-reveal rounded-2xl p-8">
            <p className="text-sm leading-relaxed text-slate-300">
              We support organizations with technology planning, deployment, and long-term system operations,
              ensuring teams can scale without compromising stability.
            </p>
      {/* 4) ABOUT / TRUST BUILDER SECTION */}
      <section className="about-trigger py-40 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <div className="about-text">
              <h2 className="text-4xl font-semibold md:text-6xl tracking-tight mb-8">
                Trusted by Visionary <br />
                <span className="text-slate-500">Enterprises Worldwide</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                SunEdge IT Solution delivers secure, adaptive, and performance-driven solutions that empower
                organizations to innovate with absolute confidence.
              </p>

              <div className="mt-16 grid grid-cols-3 gap-10">
                {trustMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass rounded-[40px] p-2 aspect-square relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-blue/10" />
                <div className="h-full w-full rounded-[38px] bg-base/80 flex items-center justify-center border border-white/5">
                  <div className="text-center">
                    <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-blue/20 flex items-center justify-center text-blue shadow-glowBlue">
                      <svg fill="currentColor" className="h-8 w-8" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Infrastructure Core</p>
                  </div>
                </div>
              </div>
              {/* Backglow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple/10 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-trigger px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="contact-reveal">
            <h2 className="text-3xl font-semibold md:text-5xl">Let’s Talk About Your Requirements</h2>
            <p className="mt-5 max-w-xl text-slate-300">
              Share your current goals and technical constraints. Our team will respond with a practical,
              implementation-ready direction.
            </p>
          </div>
          <form className="glass contact-reveal space-y-4 rounded-2xl p-8">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-purple/60 focus:shadow-glow"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue/60 focus:shadow-glowBlue"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-pink/60 focus:shadow-glowPink"
            />
            <button
              type="submit"
              className="rounded-full border border-purple/60 bg-purple/20 px-7 py-3 text-sm font-semibold transition hover:bg-purple/30 hover:shadow-glow"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 pb-24 pt-4 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue/25 bg-gradient-to-r from-purple/20 via-transparent to-blue/20 p-12 text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">Let’s Build Your Technology Infrastructure</h2>
          <button className="mt-8 rounded-full border border-pink/60 bg-pink/15 px-9 py-3 text-sm font-semibold shadow-glowPink transition hover:-translate-y-0.5 hover:bg-pink/30">
            Get Consultation
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-8 text-sm text-slate-400 md:grid-cols-3">
          <div>
            <p className="font-medium text-slate-200">SunEdge IT Solution</p>
            <p className="mt-3">Premium technology systems for modern enterprises.</p>
          </div>
          <div>
            <p className="font-medium text-slate-200">Navigation</p>
            <ul className="mt-3 space-y-2">
              <li>Services</li>
              <li>Hardware</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-200">Contact</p>
            <p className="mt-3">hello@sunedgeit.com</p>
            <p>+91 62390 60064</p>
      {/* 5) CTA SECTION */}
      <section className="py-32 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="glass relative rounded-[50px] p-16 md:p-24 text-center overflow-hidden border-purple/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple/5 via-transparent to-blue/5" />

            <div className="relative z-10">
              <h2 className="text-4xl font-semibold md:text-6xl tracking-tight mb-8">
                Let’s Build Your <br />
                Technology Infrastructure
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                Discuss your project requirements with our enterprise specialists and accelerate your digital journey.
              </p>
              <button className="group relative rounded-full bg-white px-12 py-5 text-black font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-pulse-neon">
                Get Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6) FOOTER */}
      <footer className="border-t border-white/5 py-20 px-6 md:px-12 lg:px-20 bg-base">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <div className="text-2xl font-bold tracking-tight mb-4">SunEdge<span className="text-purple">.</span></div>
              <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                Premium technology infrastructure and CRM solutions for modern enterprise scale.
              </p>
            </div>

            <div className="flex gap-12 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Case Studies</a>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-600">
            <p>© {new Date().getFullYear()} SunEdge IT Solution. All rights reserved.</p>
            <p className="text-blue/50">Premium Technology. Measurable Impact.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/916239060064?text=Hello%20SunEdge%20IT%20Solution"
        target="_blank"
        rel="noreferrer"
        className="glass fixed bottom-6 right-6 z-50 rounded-full border border-blue/50 px-5 py-3 text-sm font-medium text-slate-100 shadow-glowBlue transition hover:-translate-y-1 hover:border-blue/70"
      >
        Chat on WhatsApp
      </a>
      {/* Scroll Indicator */}
      <motion.div
        style={{ scaleX: useScroll().scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple to-blue origin-left z-50"
      />
    </main>
  );
}
