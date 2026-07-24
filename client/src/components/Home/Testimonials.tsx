import { StarIcon } from "lucide-react";

const testimonials = [
    {
        name: "Sarah K.",
        role: "Marketing Manager",
        avatar: "https://ui-avatars.com/api/?name=Sarah+K&background=random",
        text: "Social Sync has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds exactly like our brand voice.",
    },
    {
        name: "Marcus L.",
        role: "Indie Creator",
        avatar: "https://ui-avatars.com/api/?name=Marcus+L&background=random",
        text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.",
    },
    {
        name: "Priya D.",
        role: "Startup Founder",
        avatar: "https://ui-avatars.com/api/?name=Priya+D&background=random",
        text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle radial gradient background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-violet-100/50 border border-violet-200/50 text-violet-700 text-[11px] font-semibold tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                        <StarIcon className="size-3.5 fill-violet-500 text-violet-500" />
                        Testimonials
                    </div>
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900 mb-6">
                        Loved by <span className="text-violet-600 italic">creators &amp; teams</span>
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto text-lg">Join thousands of people who automate their social media with Social Sync.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Floating decorative star */}
                    <div className="absolute -top-10 -left-10 text-violet-100 rotate-12 opacity-50 pointer-events-none">
                        <StarIcon className="w-32 h-32 fill-current" />
                    </div>

                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.1)] group flex flex-col justify-between">
                            <div>
                                {/* 5 Stars */}
                                <div className="flex gap-1 mb-5">
                                    {[...Array(5)].map((_, idx) => (
                                        <StarIcon key={idx} className="size-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-slate-700 leading-relaxed text-[15px]">"{t.text}"</p>
                            </div>
                            
                            <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-50">
                                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100" />
                                <div>
                                    <div className="text-[15px] font-bold text-slate-900">{t.name}</div>
                                    <div className="text-xs font-medium text-violet-600">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
