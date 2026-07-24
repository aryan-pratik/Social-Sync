export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-8">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-serif font-bold text-lg text-white tracking-tight">
                    Social<span className="text-violet-400 italic font-normal">Sync</span>
                </span>
                <p className="text-sm text-slate-400">© {new Date().getFullYear()} SocialSync. All rights reserved.</p>
            </div>
        </footer>
    );
}
