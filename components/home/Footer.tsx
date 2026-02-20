"use client";

import { AtmosphericDepth } from "../ui/AtmosphericDepth";
import { MagneticButton } from "../ui/MagneticButton";

export function Footer() {
    return (
        <>
            {/* FINAL CTA SECTION */}
            <section className="py-32 px-6 md:px-8 text-center relative overflow-hidden">
                <AtmosphericDepth color="blue" position="center" opacity={0.5} className="scale-125" />
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
        </>
    );
}
