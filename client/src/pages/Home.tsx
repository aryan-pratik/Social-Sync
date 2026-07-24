import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import PlatformDiagram from "../components/Home/PlatformDiagram";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import Pricing from "../components/Home/Pricing";
import FAQ from "../components/Home/FAQ";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";

export default function Landing() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden relative">
            {/* Page-wide left & right diagonal stripe side borders */}
            <div className="absolute top-0 left-0 w-28 sm:w-36 md:w-48 h-full pointer-events-none opacity-40 z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.06) 5px, rgba(124,58,237,0.06) 10px)' }}></div>
            <div className="absolute top-0 right-0 w-28 sm:w-36 md:w-48 h-full pointer-events-none opacity-40 z-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.06) 5px, rgba(124,58,237,0.06) 10px)' }}></div>

            <Navbar />
            <Hero />
            <PlatformDiagram />
            <HowItWorks />
            <Features />

            <Pricing />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
}
