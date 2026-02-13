"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = ["CRM Software", "IT Projects", "Hardware Solutions"];

const trustMetrics = [
  { value: "120+", label: "Enterprise Engagements" },
  { value: "99.98%", label: "Infrastructure Uptime" },
  { value: "24/7", label: "Mission-Critical Support" }
];

const projects = [
  "Autonomous CRM Intelligence Suite",
  "Cloud Migration & Cybersecurity Program",
  "Smart Infrastructure Monitoring Hub",
  "Enterprise Hardware Lifecycle Platform"
];

export function HomePage() {
  const projectGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-blur",
        { opacity: 0, filter: "blur(14px)", y: 40 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-trigger",
            start: "top 80%"
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -45 : 45, opacity: 0.2, filter: "blur(8px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "bottom 45%",
              scrub: true
            }
          }
        );
      });

      if (projectGridRef.current) {
        gsap.to(projectGridRef.current, {
          yPercent: -4,
          scrollTrigger: {
            trigger: projectGridRef.current,
            scrub: 1,
            start: "top bottom",
            end: "bottom top"
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-hidden bg-base text-slate-100">
      <div className="ambient-bg pointer-events-none" aria-hidden />

      <section className="relative flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="glass neon-border max-w-3xl rounded-3xl p-10 md:p-14"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-blue/80">SunEdge IT Solution</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Powering the Future of Intelligent Technology
            </h1>
            <p className="mt-6 text-base text-slate-300 md:text-lg">
              CRM Software • IT Projects • Hardware Infrastructure
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-full border border-purple/60 bg-purple/25 px-8 py-3 text-sm font-medium shadow-glow transition hover:-translate-y-1 hover:bg-purple/35">
                Explore Solutions
              </button>
              <button className="glass rounded-full px-8 py-3 text-sm font-medium transition hover:-translate-y-1 hover:border-blue/60 hover:shadow-glowBlue">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-semibold md:text-4xl">Core Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <motion.article
                key={service}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="glass rounded-2xl p-8 transition duration-500 hover:border-purple/60 hover:shadow-glow"
              >
                <h3 className="text-xl font-medium">{service}</h3>
                <p className="mt-4 text-sm text-slate-300">
                  Enterprise-grade strategy, implementation, and optimization designed for scale.
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-trigger px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="reveal-blur">
            <h2 className="text-3xl font-semibold md:text-4xl">Trusted by Visionary Enterprises</h2>
            <p className="mt-5 text-slate-300">
              SunEdge IT Solution delivers secure, adaptive, and performance-driven solutions that empower
              organizations to innovate with confidence.
            </p>
          </div>
          <div className="glass reveal-blur rounded-2xl p-8">
            <p className="text-sm text-slate-300">
              From architecture design to deployment and long-term support, our experts align technology
              operations with measurable business growth.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Cred-inspired Trust Layer</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {trustMetrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="glass rounded-2xl border border-white/10 p-6"
                >
                  <p className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-semibold md:text-4xl">Project Showcase</h2>
          <div ref={projectGridRef} className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project}
                className={`project-card glass rounded-2xl p-8 ${
                  index === 0 || index === 3 ? "md:col-span-2" : ""
                }`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-blue/80">Case Study {index + 1}</p>
                <h3 className="mt-3 text-2xl font-medium">{project}</h3>
                <p className="mt-4 max-w-2xl text-sm text-slate-300">
                  A premium transformation initiative delivering measurable reliability, speed, and strategic
                  impact.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue/25 bg-gradient-to-r from-purple/20 via-transparent to-blue/20 p-12 text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">Let’s Build the Future Together</h2>
          <button className="mt-8 rounded-full border border-pink/60 bg-pink/20 px-9 py-3 text-sm font-semibold shadow-glowPink transition hover:-translate-y-1 hover:bg-pink/35">
            Start a Project
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} SunEdge IT Solution</p>
          <p className="text-blue/70">Premium Technology. Measurable Impact.</p>
        </div>
      </footer>
    </main>
  );
}
