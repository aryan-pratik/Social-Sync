import { Link } from "react-router-dom";
import { SiX, SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-[#ede9fe] py-32 border-t border-violet-200">
            {/* Background Swoop (Inverted) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-white rounded-t-[100%] pointer-events-none opacity-40"></div>

            {/* Subtle grid/stripes to match */}
            <div className="absolute top-0 left-0 w-32 h-full opacity-40 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>
            <div className="absolute top-0 right-0 w-32 h-full opacity-40 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>

            <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center z-10">
                {/* Headline */}
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                    Ready to Automate Your <br /> Social Media?
                </h2>

                {/* Subheadline */}
                <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-10">
                    Plan smarter, create faster, and grow your brand all from one powerful platform.
                </p>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <Link to="/login" className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-violet-600 hover:to-indigo-700 shadow-xl shadow-violet-500/25 px-10 py-4 inline-flex items-center transition-all text-lg hover:scale-105">
                        Get Started Now
                    </Link>
                </div>

                {/* Floating Social Media Badges */}
                {/* 1. Twitter / X (Top Left) */}
                <div className="absolute left-0 lg:-left-36 -ml-4 top-4 transform -rotate-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-violet-500/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shrink-0">
                        <SiX className="size-4.5" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Twitter / X</div>
                        <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Auto-sync
                        </div>
                    </div>
                </div>

                {/* 2. Instagram (Top Right) */}
                <div className="absolute right-0 lg:-right-36 -mr-4 top-6 transform rotate-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-rose-500/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shrink-0">
                        <SiInstagram className="size-4.5" />
                    </div>
                    <div className="text-left pr-1">
                        <div className="text-xs font-bold text-slate-800">Instagram</div>
                        <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </div>
                    </div>
                </div>

                {/* 3. LinkedIn (Bottom Left) */}
                <div className="absolute left-6 lg:-left-24 top-36 transform rotate-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-500/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-9 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center shadow-md shrink-0">
                        <svg className="size-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9Z"/></svg>
                    </div>
                    <div className="text-left pr-1">
                        <div className="text-xs font-bold text-slate-800">LinkedIn</div>
                        <div className="text-[10px] text-violet-600 font-semibold flex items-center gap-1">
                            Scheduled
                        </div>
                    </div>
                </div>

                {/* 4. Facebook (Bottom Right) */}
                <div className="absolute right-6 lg:-right-24 top-36 transform -rotate-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-600/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-9 rounded-xl bg-[#1877f2] text-white flex items-center justify-center shadow-md shrink-0">
                        <SiFacebook className="size-4.5" />
                    </div>
                    <div className="text-left pr-1">
                        <div className="text-xs font-bold text-slate-800">Facebook</div>
                        <div className="text-[10px] text-violet-600 font-semibold flex items-center gap-1">
                            Connected
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
