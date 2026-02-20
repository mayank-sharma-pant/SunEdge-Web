"use client";

import { useState } from "react";
import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { MagneticButton } from "../ui/MagneticButton";

export function Contact() {
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

    return (
        <section id="contact" className="py-24 px-6 md:px-8 relative bg-[#080E1C] overflow-hidden">
            <AtmosphericDepth color="cyan" position="right" opacity={0.4} />
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div className="space-y-12">
                        <div className="section-header">
                            <h2 className="text-3xl font-bold md:text-5xl tracking-tight mb-6 tracking-[-0.02em] max-w-[15ch]">Let&apos;s Talk About Your Requirements</h2>
                            <p className="text-lg text-blue-100/50 leading-relaxed max-w-[50ch] mb-12">
                                Share your current goals and technical constraints. Our team will respond with a practical, implementation-ready direction.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start group">
                                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-blue-500/10 border border-[var(--border-normal)] flex items-center justify-center group-hover:border-blue-400/40 transition-all shrink-0 mt-1">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Registered Office</h4>
                                    <p className="text-lg font-medium">Unitech Cyber Park, Sec-39, Gurugram, Haryana</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-blue-500/10 border border-[var(--border-normal)] flex items-center justify-center group-hover:border-blue-400/40 transition-all shrink-0 mt-1">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Corporate Office</h4>
                                    <p className="text-lg font-medium">601A, Hemkunt Chamber, Building No. 89,</p>
                                    <p className="text-lg font-medium">Nehru Place, New Delhi, Delhi – 110074</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-blue-500/10 border border-[var(--border-normal)] flex items-center justify-center group-hover:border-blue-400/40 transition-all shrink-0 mt-1">
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
                        <div className="surface-tint p-8 md:p-12 border border-[var(--border-normal)] relative overflow-hidden rounded-[var(--radius-md)]">
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
                                        className="w-full bg-[#0D1630] border border-[var(--border-normal)] text-blue-100 rounded-[var(--radius-sm)] px-6 py-3.5 outline-none focus:border-blue-400/50 focus:bg-[#101D40] transition-all duration-200 input-focus-glow"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-[#0D1630] border border-[var(--border-normal)] text-blue-100 rounded-[var(--radius-sm)] px-6 py-3.5 outline-none focus:border-blue-400/50 focus:bg-[#101D40] transition-all duration-200 input-focus-glow"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Message</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-[#0D1630] border border-[var(--border-normal)] text-blue-100 rounded-[var(--radius-sm)] px-6 py-3.5 outline-none focus:border-blue-400/50 focus:bg-[#101D40] transition-all duration-200 input-focus-glow"
                                    />
                                </div>
                                <MagneticButton disabled={status === "sending"} className="w-full rounded-full bg-blue-600 text-white py-4 font-bold tracking-wide transition-all duration-150 hover:bg-blue-700 hover:shadow-[0_4px_20px_rgba(29,110,230,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
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
    );
}
