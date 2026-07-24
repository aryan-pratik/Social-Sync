import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Signup() {
	// const [loginState, setLoginState] = useState(true);
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
		<div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
			<div className="relative w-full max-w-md">
				<div className="bg-slate-900 rounded-2xl shadow-md shadow-black/40 p-8">
					<div className="flex flex-col items-center mb-8">
						<Link to="/" className="flex items-center gap-2">
							<img src="/logo.svg" alt="Logo" className="size-6.5" />
							<h1 className="text-2xl">Social Sync</h1>
						</Link>
						<p className="text-slate-400 text-sm mt-1">
							SignUp to your Dashboard
						</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-5 text-sm">
						<div>
							<label className="block mb-1.5">Name</label>
							<div className="relative">
								<User2Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="text"
									required
									placeholder="Enter your name"
									className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 outline-slate-300 border border-white/10 rounded-full"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<label className="block mb-1.5">Email</label>
							<div className="relative">
								<MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="email"
									required
									placeholder="you@company.com"
									className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 outline-slate-300 border border-white/10 rounded-full"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<label className="block mb-1.5">Password</label>
							<div className="relative">
								<LockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input
									type="password"
									required
									placeholder="********"
									className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 outline-slate-300 border border-white/10 rounded-full"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-2.5 px-4 bg-linear-to-r from-red-600 to-red-500 text-white rounded-full text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2"
						>
							{loading ? (
								"Signing up..."
							) : (
								<>
									Sign Up <ArrowRightIcon className="size-4" />
								</>
							)}
						</button>
					</form>

					<div className="mt-6 text-center text-sm text-slate-400">
						Already have an account?{" "}
						<button
							onClick={() => {
								navigate("/login");
							}}
							className="text-violet-600 hover:text-violet-700"
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
