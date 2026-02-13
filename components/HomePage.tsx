"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "CRM Software",
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

const trustMetrics = [
  { value: "120+", label: "Enterprise Engagements" },
  { value: "99.98%", label: "Infrastructure Uptime" },
  { value: "24/7", label: "Mission-Critical Support" }
];

export function HomePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-blur",
        { opacity: 0, filter: "blur(12px)", y: 30 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-trigger",
            start: "top 82%"
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 26, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.08
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-hidden bg-base text-slate-100">
      <div className="ambient-bg pointer-events-none" aria-hidden />

      <section className="relative flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass neon-border max-w-3xl rounded-3xl p-10 md:p-14"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-blue/80">SunEdge IT Solution</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Powering the Future of Intelligent Technology
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
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
                key={service.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="service-card glass rounded-2xl p-8 transition duration-500 hover:border-purple/60 hover:shadow-glow"
              >
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{service.copy}</p>
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
              We help organizations move faster with stable systems, clear architecture, and practical digital
              strategy that teams can actually maintain.
            </p>
          </div>
          <div className="glass reveal-blur rounded-2xl p-8">
            <p className="text-sm leading-relaxed text-slate-300">
              From discovery and planning to deployment and long-term support, SunEdge works as a committed
              technology partner focused on measurable business outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Performance & Trust</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {trustMetrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
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
