import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Do I need technical skills to use SocialSync",
        answer: "Not at all. SocialSync is designed for marketers, not developers. You can plan, publish, and analyze content easily with our drag-and-drop calendar and AI assistant.",
    },
    {
        question: "What social platforms can I publish to?",
        answer: "SocialSync supports all major platforms including LinkedIn, X (Twitter), Facebook and Instagram with seamless cross-platform scheduling.",
    },
    {
        question: "How does the AI content assistant work?",
        answer: "Our built-in AI analyzes your brand voice and prompt to generate engaging captions, suggest trending hashtags, and even create matching visual assets in seconds.",
    },
    {
        question: "Can I cancel or upgrade my plan anytime?",
        answer: "Yes, absolutely! You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with no hidden fees or contracts.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-white relative overflow-hidden">
            {/* Side Borders */}
            <div className="absolute top-0 left-0 w-32 h-full opacity-30 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.05) 5px, rgba(124,58,237,0.05) 10px)' }}></div>
            <div className="absolute top-0 right-0 w-32 h-full opacity-30 pointer-events-none z-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.05) 5px, rgba(124,58,237,0.05) 10px)' }}></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Heading & Subtitle */}
                    <div className="lg:col-span-5 pt-2">
                        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.15] mb-5 tracking-tight">
                            Frequently Asked <br /> Questions
                        </h2>
                        
                        <p className="text-slate-600 text-base leading-relaxed max-w-md">
                            Everything you need to know before getting started with SocialSync.
                        </p>
                    </div>

                    {/* Right Column: Accordion Container */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm">
                            <div className="space-y-3">
                                {faqData.map((item, idx) => {
                                    const isOpen = openIndex === idx;
                                    return (
                                        <div
                                            key={idx}
                                            className={`transition-all duration-200 rounded-2xl ${
                                                isOpen
                                                    ? "bg-[#f7f3ff] p-5 sm:p-6 border border-purple-100"
                                                    : "bg-white p-5 sm:p-6 border-b border-slate-100 hover:bg-slate-50/50 cursor-pointer"
                                            }`}
                                            onClick={() => toggleIndex(idx)}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <h3 className={`text-base sm:text-lg font-semibold transition-colors ${isOpen ? "text-slate-900" : "text-slate-800"}`}>
                                                    {item.question}
                                                </h3>
                                                <button
                                                    type="button"
                                                    className={`shrink-0 size-8 sm:size-9 rounded-full flex items-center justify-center transition-all ${
                                                        isOpen
                                                            ? "bg-white text-slate-700 shadow-sm"
                                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                                    aria-label="Toggle answer"
                                                >
                                                    {isOpen ? (
                                                        <ChevronUpIcon className="size-4 stroke-[2.5]" />
                                                    ) : (
                                                        <ChevronDownIcon className="size-4 stroke-[2.5]" />
                                                    )}
                                                </button>
                                            </div>

                                            {isOpen && (
                                                <div className="mt-4 pt-1 text-slate-600 text-sm sm:text-[15px] leading-relaxed pr-6">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
