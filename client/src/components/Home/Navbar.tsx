import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2 ">
                    <img src="/logo.svg" alt="logo" className="size-7" />
                    <span className="text-xl lg:text-2xl font-medium font-serif text-slate-200">Social Sync</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
                    <a href="#features" className="hover:text-white">
                        Features
                    </a>
                    <a href="#how-it-works" className="hover:text-white">
                        How it works
                    </a>
                    <a href="#pricing" className="hover:text-white">
                        Pricing
                    </a>
                </div>

                {user ? (
                    <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-medium bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full shadow-md shadow-black/40 hover:shadow-red-200 hover:shadow-md">
                        Go to Dashboard <ArrowRightIcon className="size-3.5" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm text-slate-600 hover:text-white hidden sm:block">
                            Sign In
                        </Link>
                        <Link to="/login" className="flex items-center gap-1.5 text-sm bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full shadow-md shadow-black/40 hover:shadow-red-200 hover:shadow-md">
                            Get Started <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
