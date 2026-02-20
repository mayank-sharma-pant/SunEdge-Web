"use client";

import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import SectionHUD from "./SectionHUD";

// UI Components
import { CinematicPreloader } from "./ui/CinematicPreloader";

// Page Sections
import { Hero } from "./home/Hero";
import { StrategicSolutions } from "./home/StrategicSolutions";
import { Approach } from "./home/Approach";
import { HardwareSlider } from "./home/HardwareSlider";
import { MemorySolutions } from "./home/MemorySolutions";
import { AboutSunEdge } from "./home/AboutSunEdge";
import { Contact } from "./home/Contact";
import { Footer } from "./home/Footer";

// Configurations
const MOTION = {
  section: {
    duration: 0.6,
    ease: "expo.out",
    trigger: "top 95%"
  }
} as const;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomePage() {
  const [activeSection, setActiveSection] = useState({ name: "Core_System", code: "S_01" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Reveal
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" }
      );

      // Section Trackers for HUD
      const sections = [
        { id: "#hero", name: "Core_System", code: "S_01" },
        { id: "#solutions", name: "Strategic_Services", code: "S_02" },
        { id: "#approach", name: "Protocol_Approach", code: "S_03" },
        { id: "#hardware", name: "Hardware_Showcase", code: "H_01" },
        { id: "#memory", name: "Memory_Systems", code: "M_01" },
        { id: "#about-authority", name: "Brand_Authority", code: "S_06" },
        { id: "#contact", name: "Contact_Inquiry", code: "C_01" },
      ];

      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section.id,
          start: "top center",
          end: "bottom center",
          onToggle: self => self.isActive && setActiveSection({ name: section.name, code: section.code })
        });
      });

      // General Section Reveal
      gsap.utils.toArray<HTMLElement>(".section-header").forEach(header => {
        gsap.fromTo(header,
          { opacity: 0, y: 32, filter: "blur(4px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: MOTION.section.duration,
            ease: MOTION.section.ease,
            scrollTrigger: {
              trigger: header,
              start: MOTION.section.trigger,
              toggleActions: "play none none reverse"
            }
          }
        );
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

      <Hero />

      <div className="section-divider opacity-50" />

      <StrategicSolutions />

      <div className="section-divider" />

      <Approach />

      <div className="section-divider" />

      <HardwareSlider />

      <MemorySolutions />

      <div className="section-divider opacity-50" />

      <AboutSunEdge />

      <Contact />

      <Footer />
    </main>
  );
}

export default HomePage;
