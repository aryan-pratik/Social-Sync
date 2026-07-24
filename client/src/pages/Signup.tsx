import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, MailIcon, LockIcon, ArrowRightIcon } from "lucide-react";
import logoUrl from '../assets/logo.svg';
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login, user } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await api.post(`/api/auth/register`, {
				name,
				email,
				password,
			});
			login(data, data.token);
			navigate("/dashboard");
		} catch (error: any) {
			toast.error(error.response?.data?.message || error?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	return (
		<div className="min-h-screen bg-[#f5f3ff] relative overflow-hidden flex items-center justify-center p-4">
			{/* Page-wide left & right diagonal stripe side borders */}
			<div className="absolute top-0 left-0 w-28 sm:w-36 md:w-48 h-full pointer-events-none opacity-40 z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(124,58,237,0.06) 5px, rgba(124,58,237,0.06) 10px)' }}></div>
			<div className="absolute top-0 right-0 w-28 sm:w-36 md:w-48 h-full pointer-events-none opacity-40 z-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(124,58,237,0.06) 5px, rgba(124,58,237,0.06) 10px)' }}></div>

			{/* Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/50 rounded-full blur-3xl pointer-events-none" />

			<div className="relative w-full max-w-md z-10">
				<div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white shadow-[0_20px_50px_-12px_rgba(124,58,237,0.15)] p-8 sm:p-10">
					{/* Header */}
					<div className="flex flex-col items-center mb-8 text-center">
						<Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
							<img src={logoUrl} alt="SocialSync Logo" className="size-10 group-hover:scale-105 transition-transform drop-shadow-md" />
							<span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
								Social<span className="text-violet-600 italic font-normal">Sync</span>
							</span>
						</Link>
						<p className="text-slate-600 text-sm">
							Create your free account and start automating in seconds.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5 text-sm">
						<div>
							<label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
							<div className="relative">
								<UserIcon className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="text"
									required
									placeholder="Enter your name"
									className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
							<div className="relative">
								<MailIcon className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="email"
									required
									placeholder="you@company.com"
									className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Password</label>
							<div className="relative">
								<LockIcon className="size-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="password"
									required
									placeholder="••••••••"
									className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3.5 px-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-violet-500/25 disabled:opacity-60 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
						>
							{loading ? (
								"Creating account..."
							) : (
								<>
									Create Free Account <ArrowRightIcon className="size-4" />
								</>
							)}
						</button>
					</form>

					<div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => {
								navigate("/login");
							}}
							className="text-violet-600 font-semibold hover:text-violet-700 hover:underline cursor-pointer"
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
