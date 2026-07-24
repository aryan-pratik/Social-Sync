import { useState } from "react";
import { Wand2Icon, CalendarDaysIcon } from "lucide-react";
import logoUrl from "../../assets/logo.svg";

export default function PlatformDiagram() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background diagonal lines */}
            <div className="absolute top-0 left-0 w-32 h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.05) 5px, rgba(124,58,237,0.05) 10px)' }}></div>
            <div className="absolute top-0 right-0 w-32 h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.05) 5px, rgba(124,58,237,0.05) 10px)' }}></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-slate-900 mb-5">
                        Connect Your Favorite Platforms
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                        Seamlessly link your social accounts — from LinkedIn to X — and manage your entire content workflow in one unified dashboard.
                    </p>
                </div>

                {/* Node Diagram Container */}
                <div className="relative w-full h-[420px] md:h-[500px] max-w-4xl mx-auto flex items-center justify-center">
                    
                    {/* SVG Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" fill="none">
                        <defs>
                            <linearGradient id="line-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="line-gradient-right" x1="100%" y1="0%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
                            </linearGradient>
                        </defs>

                        {/* Base Curved Lines */}
                        <path d="M 200 125 Q 320 180 400 250" stroke={hoveredNode === "facebook" ? "#7c3aed" : "url(#line-gradient-left)"} strokeWidth={hoveredNode === "facebook" ? "4" : "2.5"} strokeLinecap="round" className="transition-all duration-300" />
                        <path d="M 120 250 L 400 250" stroke={hoveredNode === "ai" ? "#7c3aed" : "url(#line-gradient-left)"} strokeWidth={hoveredNode === "ai" ? "4" : "2.5"} strokeLinecap="round" className="transition-all duration-300" />
                        <path d="M 200 375 Q 320 320 400 250" stroke={hoveredNode === "instagram" ? "#7c3aed" : "url(#line-gradient-left)"} strokeWidth={hoveredNode === "instagram" ? "4" : "2.5"} strokeLinecap="round" className="transition-all duration-300" />

                        <path d="M 600 125 Q 480 180 400 250" stroke={hoveredNode === "x" ? "#7c3aed" : "url(#line-gradient-right)"} strokeWidth={hoveredNode === "x" ? "4" : "2.5"} strokeLinecap="round" className="transition-all duration-300" />
                        <path d="M 680 250 L 400 250" stroke={hoveredNode === "scheduler" ? "#10b981" : "url(#line-gradient-right)"} strokeWidth={hoveredNode === "scheduler" ? "4" : "2.5"} strokeLinecap="round" className="transition-all duration-300" />
                        <path d="M 600 375 Q 480 320 400 250" stroke={hoveredNode === "linkedin" ? "#7c3aed" : "url(#line-gradient-right)"} strokeWidth={hoveredNode === "linkedin" ? "4" : "2.5"} strokeLinecap="round" className="transition-all duration-300" />

                        {/* Animated Pulses along the lines */}
                        <path d="M 200 125 Q 320 180 400 250" stroke="#c084fc" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" values="60;0" dur={hoveredNode === "facebook" ? "0.8s" : "1.8s"} repeatCount="indefinite" />
                        </path>
                        <path d="M 120 250 L 400 250" stroke="#c084fc" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" values="60;0" dur={hoveredNode === "ai" ? "0.6s" : "1.4s"} repeatCount="indefinite" />
                        </path>
                        <path d="M 200 375 Q 320 320 400 250" stroke="#c084fc" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" values="60;0" dur={hoveredNode === "instagram" ? "0.8s" : "2s"} repeatCount="indefinite" />
                        </path>

                        <path d="M 600 125 Q 480 180 400 250" stroke="#c084fc" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" values="0;60" dur={hoveredNode === "x" ? "0.8s" : "1.8s"} repeatCount="indefinite" />
                        </path>
                        <path d="M 680 250 L 400 250" stroke="#34d399" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" values="0;60" dur={hoveredNode === "scheduler" ? "0.6s" : "1.4s"} repeatCount="indefinite" />
                        </path>
                        <path d="M 600 375 Q 480 320 400 250" stroke="#c084fc" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" values="0;60" dur={hoveredNode === "linkedin" ? "0.8s" : "2s"} repeatCount="indefinite" />
                        </path>
                    </svg>

                    {/* Central Node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                        {/* Glow rings - Multiple rings for a wave effect */}
                        {/* Static concentric circles for structure */}
                        <div className="absolute inset-0 bg-violet-200/20 rounded-full scale-[1.8]" />
                        <div className="absolute inset-0 bg-violet-200/10 rounded-full scale-[2.8]" />
                        <div className="absolute inset-0 bg-violet-100/10 rounded-full scale-[4.0]" />
                        
                        {/* Pulsating animated wave rings */}
                        <div className={`absolute inset-0 bg-violet-400/20 rounded-full transition-opacity duration-500 ${hoveredNode ? "opacity-0" : "animate-ripple"}`} />
                        <div className={`absolute inset-0 bg-violet-400/20 rounded-full transition-opacity duration-500 ${hoveredNode ? "opacity-0" : "animate-ripple ripple-delay-1"}`} />
                        <div className={`absolute inset-0 bg-violet-400/20 rounded-full transition-opacity duration-500 ${hoveredNode ? "opacity-0" : "animate-ripple ripple-delay-2"}`} />
                        
                        {/* Core Ball */}
                        <div className="relative w-24 h-24 bg-violet-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.6)] border-[4px] border-violet-300 backdrop-blur-md transition-transform hover:scale-105 z-10 overflow-hidden">
                            <img src={logoUrl} alt="SocialSync Logo" className="w-full h-full object-cover scale-[1.15]" />
                        </div>
                    </div>

                    {/* Outer Glassmorphic Nodes */}
                    <style>{`
                        @keyframes ripple {
                            0% { transform: scale(1); opacity: 0.8; }
                            100% { transform: scale(5.5); opacity: 0; }
                        }
                        .animate-ripple {
                            animation: ripple 3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
                        }
                        .ripple-delay-1 { animation-delay: 1s; }
                        .ripple-delay-2 { animation-delay: 2s; }
                        
                        .glass-node {
                            background: rgba(255, 255, 255, 0.9);
                            backdrop-filter: blur(8px);
                            border: 1px solid rgba(255, 255, 255, 1);
                            box-shadow: 0 4px 20px -2px rgba(124, 58, 237, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
                        }
                    `}</style>

                    {/* Top Left - Facebook */}
                    <div 
                        onMouseEnter={() => setHoveredNode("facebook")}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    >
                        {hoveredNode === "facebook" && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                                Facebook Auto-Sync
                            </div>
                        )}
                        <div className="w-14 h-14 glass-node rounded-full flex items-center justify-center text-[#1877F2] hover:scale-115 transition-all">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </div>
                    </div>

                    {/* Middle Left - AI Engine (was Twitter/X) */}
                    <div 
                        onMouseEnter={() => setHoveredNode("ai")}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute top-[50%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    >
                        {hoveredNode === "ai" && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-violet-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                                AI Content Engine
                            </div>
                        )}
                        <div className="w-14 h-14 glass-node rounded-full flex items-center justify-center text-violet-600 hover:scale-115 transition-all">
                            <Wand2Icon className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Bottom Left - Instagram */}
                    <div 
                        onMouseEnter={() => setHoveredNode("instagram")}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    >
                        {hoveredNode === "instagram" && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                                Instagram Publisher
                            </div>
                        )}
                        <div className="w-14 h-14 glass-node rounded-full flex items-center justify-center text-[#E4405F] hover:scale-115 transition-all">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </div>
                    </div>

                    {/* Top Right - Twitter/X (was AI Engine) */}
                    <div 
                        onMouseEnter={() => setHoveredNode("x")}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    >
                        {hoveredNode === "x" && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                                X / Twitter Direct
                            </div>
                        )}
                        <div className="w-14 h-14 glass-node rounded-full flex items-center justify-center text-slate-900 hover:scale-115 transition-all">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                        </div>
                    </div>

                    {/* Middle Right - Smart Scheduler */}
                    <div 
                        onMouseEnter={() => setHoveredNode("scheduler")}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute top-[50%] right-[15%] translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    >
                        {hoveredNode === "scheduler" && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-emerald-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                                Smart Scheduler
                            </div>
                        )}
                        <div className="w-14 h-14 glass-node rounded-full flex items-center justify-center text-emerald-600 hover:scale-115 transition-all">
                            <CalendarDaysIcon className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Bottom Right - LinkedIn */}
                    <div 
                        onMouseEnter={() => setHoveredNode("linkedin")}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="absolute top-[75%] right-[25%] translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                    >
                        {hoveredNode === "linkedin" && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                                LinkedIn Network
                            </div>
                        )}
                        <div className="w-14 h-14 glass-node rounded-full flex items-center justify-center text-[#0A66C2] hover:scale-115 transition-all">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
