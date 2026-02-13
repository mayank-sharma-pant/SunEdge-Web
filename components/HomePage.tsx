"use client";

import { motion } from "framer-motion";
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
    </main>
  );
}
