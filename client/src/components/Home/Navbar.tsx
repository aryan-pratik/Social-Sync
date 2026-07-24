import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import logoUrl from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 pt-3 pb-1 pointer-events-none">
            <nav className="pointer-events-auto max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-5 py-2.5 flex items-center justify-between transition-all">
                {/* Brand Logo */}
                <Link to="/" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group">
                    <img src={logoUrl} alt="SocialSync Logo" className="size-9 drop-shadow-sm group-hover:scale-105 transition-transform" />
                    <span className="text-lg font-serif font-bold text-slate-900 tracking-tight">
                        Social<span className="text-violet-600 italic font-normal">Sync</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 bg-slate-100/60 p-1 rounded-full border border-slate-200/50">
                    <a href="#features" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-violet-700 hover:shadow-xs transition-all">
                        Features
                    </a>
                    <a href="#how-it-works" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-violet-700 hover:shadow-xs transition-all">
                        How it works
                    </a>
                    <a href="#pricing" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-violet-700 hover:shadow-xs transition-all">
                        Pricing
                    </a>
                    <a href="#faq" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-violet-700 hover:shadow-xs transition-all">
                        FAQ
                    </a>
                </div>

                {/* Right Action */}
                {user ? (
                    <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all hover:scale-[1.02]">
                        Dashboard <ArrowRightIcon className="size-4" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link to="/login" className="text-sm text-slate-600 hover:text-violet-700 font-semibold px-3 py-1.5 transition-colors hidden sm:block">
                            Sign In
                        </Link>
                        <Link to="/login" className="flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all hover:scale-[1.02]">
                            Get Started <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
