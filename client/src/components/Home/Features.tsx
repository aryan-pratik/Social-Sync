import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, HashIcon, BarChart3Icon } from "lucide-react";

const features = [
    {
        icon: CalendarDaysIcon,
        title: "Smart Scheduling",
        description: "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
    },
    {
        icon: Wand2Icon,
        title: "AI Content Generator",
        description: "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
    },
    {
        icon: Share2Icon,
        title: "Multi-Platform",
        description: "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
    },
    {
        icon: ZapIcon,
        title: "Instant Publishing",
        description: "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
    },
    {
        icon: HashIcon,
        title: "Hashtag Suggestions",
        description: "Get AI-powered hashtag suggestions to reach a wider audience effortlessly.",
    },
    {
        icon: BarChart3Icon,
        title: "Analytics Insights",
        description: "Track your performance across all platforms in one dashboard. See what works and double down.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 leading-tight">
                        Automate your entire <br/>
                        <span className="text-violet-600 italic">social media workflow</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                {/* Decorative background shape matching user image */}
                                <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-50 rounded-full group-hover:scale-110 transition-transform duration-500 z-0"></div>
                                
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6 shadow-sm">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
