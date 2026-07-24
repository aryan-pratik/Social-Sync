import { CheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
    {
        name: "Early Access",
        price: "$0",
        period: "forever",
        description: "We just launched! Get lifetime access to all premium features completely free during our beta.",
        features: ["Unlimited social accounts", "Unlimited scheduled posts", "Unlimited AI content generation", "Priority community support"],
        cta: "Claim Free Access",
        highlight: true,
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Side Borders */}
            <div className="absolute top-0 left-0 w-32 h-full opacity-50 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>
            <div className="absolute top-0 right-0 w-32 h-full opacity-50 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.08) 5px, rgba(124,58,237,0.08) 10px)' }}></div>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-300/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900 mb-6">
                        Simple, transparent
                        <br />
                        <span className="text-violet-600 italic">pricing</span>
                    </h2>
                    <p className="text-slate-600 max-w-lg mx-auto text-lg leading-relaxed">We're in early access. Enjoy the full power of SocialSync completely free for early adopters.</p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:gap-6 items-start relative z-10 max-w-md mx-auto">
                    {pricingPlans.map((plan) => (
                        <div key={plan.name} className={`rounded-3xl p-8 flex flex-col gap-6 relative bg-white transition-all duration-300 hover:-translate-y-2 border-[1.5px] border-violet-500 shadow-[0_20px_40px_-15px_rgba(124,58,237,0.2)] z-20`}>
                            
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-violet-500/30 tracking-wide uppercase">
                                    Launch Special
                                </div>
                            )}

                            <div>
                                <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${plan.highlight ? "text-violet-600" : "text-slate-500"}`}>{plan.name}</div>
                                <div className="flex items-end gap-1 text-slate-900 mb-3">
                                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                                    {plan.period && <span className="text-base font-medium text-slate-500 mb-1.5">{plan.period}</span>}
                                </div>
                                <p className="text-[15px] leading-relaxed text-slate-600 border-b border-slate-100 pb-6">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-4">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-[15px]">
                                        <div className={`size-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-violet-600 text-white shadow-sm" : "bg-violet-100 text-violet-600"}`}>
                                            <CheckIcon className="size-3" strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-700">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/login" className={`mt-auto text-center font-semibold text-[15px] px-6 py-4 rounded-xl transition-all ${plan.highlight ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-600/30 hover:scale-[1.02]" : "bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"}`}>
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
