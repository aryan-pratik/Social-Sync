import { Link } from "react-router-dom";
import { Wand2Icon, Calendar1Icon, LayoutDashboardIcon, UserIcon, MoreVerticalIcon, ChevronDownIcon, MousePointer2Icon } from "lucide-react";
import { SiX, SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import logoUrl from "../../assets/logo.svg";

export default function Hero() {
    return (
        <section className="relative bg-white min-h-screen">
            {/* Background Swoop - extended upward to cover Navbar area */}
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[160%] h-[780px] bg-[#ede9fe] rounded-b-[100%] pointer-events-none overflow-hidden z-0">
                {/* Diagonal stripes on the left */}
                <div className="absolute top-0 left-[10%] w-[15%] h-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>
                {/* Diagonal stripes on the right */}
                <div className="absolute top-0 right-[10%] w-[15%] h-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-36 pb-12 text-center z-10">
                {/* Headline */}
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
                    Create &amp; Schedule Posts <br /> on <span className="relative inline-block text-violet-600 border-[1.5px] border-violet-600 px-3 py-0.5 bg-violet-600/5 mt-2 sm:mt-0">
                        Autopilot
                        {/* Drag handles */}
                        <span className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-white border-[1.5px] border-violet-600" />
                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-[1.5px] border-violet-900" />
                        <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-white border-[1.5px] border-violet-600" />
                        
                        <span className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2 h-2 bg-white border-[1.5px] border-violet-600" />
                        <span className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2 h-2 bg-white border-[1.5px] border-violet-600" />

                        <span className="absolute -bottom-1.5 -left-1.5 w-2 h-2 bg-white border-[1.5px] border-violet-600" />
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-[1.5px] border-violet-600" />
                        <span className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-white border-[1.5px] border-violet-600" />
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-10">SocialSync uses AI to generate on-brand captions, write viral hooks, and auto-publish across LinkedIn, X, Facebook &amp; Instagram in minutes.</p>

                {/* CTA Button */}
                <Link to="/login" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-500/25 px-8 py-3.5 inline-flex items-center transition-all">
                    Start a Free Trial
                </Link>

                {/* Floating Social Media App Badges - Organically Scatter & Float */}
                {/* 1. Twitter / X (Top Left - High & Tilted) */}
                <div className="absolute -left-4 lg:-left-12 top-32 transform -rotate-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-violet-500/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default">
                    <div className="size-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shrink-0">
                        <SiX className="size-5" />
                    </div>
                    <div className="text-left pr-2">
                        <div className="text-xs font-bold text-slate-800">Twitter / X</div>
                        <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Auto-sync
                        </div>
                    </div>
                </div>

                {/* 2. Instagram (Top Right - Floating High) */}
                <div className="absolute -right-4 lg:-right-10 top-36 transform rotate-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-rose-500/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shrink-0">
                        <SiInstagram className="size-5" />
                    </div>
                    <div className="text-left pr-2">
                        <div className="text-xs font-bold text-slate-800">Instagram</div>
                        <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </div>
                    </div>
                </div>

                {/* 3. LinkedIn (Mid-Lower Left - Offset Inward) */}
                <div className="absolute left-6 lg:-left-16 top-72 transform rotate-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-500/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-10 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center shadow-md shrink-0">
                        <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9Z"/></svg>
                    </div>
                    <div className="text-left pr-2">
                        <div className="text-xs font-bold text-slate-800">LinkedIn</div>
                        <div className="text-[10px] text-violet-600 font-semibold flex items-center gap-1">
                            Scheduled
                        </div>
                    </div>
                </div>

                {/* 4. Facebook (Mid-Lower Right - Offset Outward & Lower) */}
                <div className="absolute right-4 lg:-right-16 top-80 transform -rotate-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-600/10 p-3 flex items-center gap-3 border border-white/80 hidden md:flex z-10 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default group">
                    <div className="size-10 rounded-xl bg-[#1877f2] text-white flex items-center justify-center shadow-md shrink-0">
                        <SiFacebook className="size-5" />
                    </div>
                    <div className="text-left pr-2">
                        <div className="text-xs font-bold text-slate-800">Facebook</div>
                        <div className="text-[10px] text-violet-600 font-semibold flex items-center gap-1">
                            Connected
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-20 z-20 mt-12">
                <div className="bg-white rounded-2xl border-[4px] border-white shadow-2xl shadow-violet-200/50 overflow-hidden flex h-[550px] ring-1 ring-slate-100">
                    {/* Sidebar */}
                    <div className="w-64 border-r border-slate-100 bg-white p-5 flex flex-col gap-8 hidden sm:flex">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <img src={logoUrl} alt="logo" className="w-7 h-7 drop-shadow-xs" />
                            <span className="font-serif font-bold text-slate-900 text-lg tracking-tight">Social<span className="text-violet-600 italic font-normal">Sync</span></span>
                        </div>
                        
                        {/* Menu */}
                        <div className="space-y-1.5 cursor-default">
                            <div className="flex items-center gap-3 font-semibold px-3.5 py-2.5 rounded-xl text-sm text-slate-500">
                                <LayoutDashboardIcon className="w-4 h-4" />
                                Dashboard
                            </div>
                            <div className="flex items-center gap-3 font-semibold px-3.5 py-2.5 rounded-xl text-sm text-slate-500">
                                <UserIcon className="w-4 h-4" />
                                Accounts
                            </div>
                            <div className="flex items-center gap-3 font-semibold px-3.5 py-2.5 rounded-xl text-sm text-slate-500">
                                <Calendar1Icon className="w-4 h-4" />
                                Scheduler
                            </div>
                            <div className="flex items-center gap-3 font-semibold px-3.5 py-2.5 rounded-xl text-sm bg-violet-100 text-violet-700">
                                <Wand2Icon className="w-4 h-4" />
                                AI Composer
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content (wireframes) */}
                    <div className="flex-1 bg-[#fcfcfd] p-8 relative overflow-hidden flex flex-col">
                        {/* Toolbar wireframe */}
                        <div className="flex justify-between items-center mb-6 opacity-60 shrink-0">
                            <div className="flex gap-4">
                                <div className="w-32 h-8 bg-white border border-slate-200 rounded-lg" />
                                <div className="w-24 h-8 bg-white border border-slate-200 rounded-lg hidden md:block" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg" />
                                <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg" />
                            </div>
                        </div>

                        {/* Interactive Content based on Tab */}
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto w-full relative">
                            <div className="grid grid-cols-2 gap-6 opacity-60">
                                {/* Card wireframes */}
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 h-44 flex flex-col justify-between">
                                        <div className="w-1/2 h-4 bg-slate-100 rounded-md" />
                                        <div className="space-y-2">
                                            <div className="w-full h-3 bg-slate-50 rounded-md" />
                                            <div className="w-5/6 h-3 bg-slate-50 rounded-md" />
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="w-16 h-6 bg-slate-50 rounded-full" />
                                            <div className="w-6 h-6 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Floating Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 p-6 flex flex-col gap-6 z-10 animate-in zoom-in-95 duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 rounded-t-2xl" />
                            
                            <div className="flex justify-between items-center mt-1">
                                <h3 className="font-bold text-slate-900 text-lg">My Content</h3>
                                <MoreVerticalIcon className="w-5 h-5 text-slate-400" />
                            </div>
                            
                            <div>
                                <div className="text-sm font-semibold text-slate-700 mb-2">Describe your content</div>
                                <div className="w-full h-28 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-500 bg-white leading-relaxed">
                                    Transform this image into a cyberpunk aesthetic — neon lights, dark city backdrop, glowing signs, misty rain, and futuristic accessories.
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-semibold text-slate-700 mb-2">Select tone</div>
                                <div className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 bg-white flex justify-between items-center shadow-sm">
                                    <span className="flex items-center gap-2"> Friendly</span>
                                    <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 relative transition-transform hover:scale-[1.02]">
                                Generating...
                                
                                {/* Yellow Cursor overlay */}
                                <div className="absolute -bottom-7 right-4 z-20 pointer-events-none">
                                    <MousePointer2Icon className="w-6 h-6 text-amber-400 fill-amber-400 -rotate-12 drop-shadow-md" />
                                    <div className="bg-amber-400 text-amber-950 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md ml-5 -mt-2 whitespace-nowrap border border-amber-300">
                                        Social Media Manager
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
