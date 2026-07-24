import { ArrowRightIcon } from "lucide-react";

const steps = [
    { step: "01", title: "Connect Your Accounts", description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram." },
    { step: "02", title: "Create or Generate", description: "Write your own post or let our AI craft a caption and image based on your prompt." },
    { step: "03", title: "Schedule & Publish", description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically." },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Side Borders */}
            <div className="absolute top-0 left-0 w-32 h-full opacity-50 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>
            <div className="absolute top-0 right-0 w-32 h-full opacity-50 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-200/50 blur-3xl rounded-[100%] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900 mb-6">
                        Up and running in <br/><span className="text-violet-600 italic">minutes</span>
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto text-lg leading-relaxed">No complicated onboarding, no steep learning curve. Just connect, create, and grow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-violet-100 via-violet-300 to-violet-100 z-0"></div>

                    {steps.map((s, i) => (
                        <div key={s.step} className="relative z-10 flex flex-col items-center text-center">
                            {/* Step Number */}
                            <div className="size-14 rounded-2xl bg-white border border-violet-100 shadow-[0_4px_20px_-4px_rgba(124,58,237,0.15)] flex items-center justify-center mb-6 group relative">
                                <div className="absolute inset-0 bg-violet-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-xl font-bold text-violet-600 group-hover:text-white transition-colors relative z-10">{s.step}</span>
                            </div>
                            
                            {/* Card Content */}
                            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white p-6 shadow-sm hover:shadow-md hover:bg-white transition-all w-full">
                                <h3 className="text-xl text-slate-900 mb-3 font-semibold">{s.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
                            </div>

                            {/* Arrow for mobile */}
                            {i < steps.length - 1 && (
                                <div className="md:hidden mt-8 text-violet-200">
                                    <ArrowRightIcon className="size-6 rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
