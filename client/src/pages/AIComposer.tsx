import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets"
import { ArrowRightIcon, Calendar1Icon, ClockIcon, HistoryIcon, Loader2Icon, TimerIcon, Wand2Icon, XIcon } from "lucide-react"
import api from "../api/axios"
import toast from "react-hot-toast"

const AIComposer = () => {
  const [prompt, setPrompt] = useState("")
  const [tone, setTone] = useState("Professional")
  const [generateImage, setGenerateImage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [generations, setGenerations] = useState<any[]>([])

  // Scheduling state
  const [activeScheduler, setActiveScheduler] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const fetchGenerations = async () => {
    try {
      const { data } = await api.get("/api/posts/generations");
      const list = Array.isArray(data) ? data : (data.generation || data.generations || []);
      setGenerations(list);
    } catch (error: any) {
      console.error("Error fetching generations:", error);
    }
  }

  useEffect(() => {
    fetchGenerations();
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/api/posts/generate", { prompt, tone });
      toast.success("Post generated successfully!");
      setGenerations((prev) => [data, ...prev]);
      setPrompt("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  const handleSchedule = async () => {
    if (!activeScheduler) return;

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one channel");
      return;
    }
    if (!scheduledDate || !scheduledTime) {
      toast.error("Please select date and time");
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
    setScheduling(true);

    try {
      await api.post("/api/posts", {
        content: activeScheduler.content,
        mediaUrl: activeScheduler.mediaUrl,
        platforms: selectedPlatforms,
        scheduledFor,
        status: "scheduled"
      });

      toast.success("Post scheduled successfully!");
      setActiveScheduler(null);
      setSelectedPlatforms([]);
      setScheduledDate("");
      setScheduledTime("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to schedule post");
    } finally {
      setScheduling(false);
    }
  }

  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">

      {/* Hero prompt area */}
      <div className="space-y-5 text-center pt-8">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">What are you creating today?</h1>
          <p className="text-slate-400 text-sm">Describe your idea and let AI craft the perfect post</p>
        </div>

        {/* Textarea card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <textarea
            rows={4}
            className="w-full px-6 py-5 bg-transparent text-slate-900 placeholder-slate-400 outline-none resize-none text-sm leading-relaxed"
            placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
          />
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/60">
            {/* AI Image toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGenerateImage(!generateImage)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-150 focus:outline-none ${generateImage ? "bg-violet-500" : "bg-slate-200"}`}
              >
                <span className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full bg-white shadow transition-transform duration-150 ${generateImage ? "translate-x-4.5" : "translate-x-0.5"}`} />
              </button>
              <span className="text-xs font-medium text-slate-500">Generate AI Image</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <ArrowRightIcon className="size-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tone Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {tones.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${tone === t
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Generation History */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HistoryIcon className="size-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700">Generation History</h2>
          </div>
          <span className="bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{generations.length} total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {generations.map((gen, idx) => (
            <div key={gen._id || gen.id || idx} className="group bg-white rounded-2xl border border-slate-100 p-5 hover:border-violet-200 hover:shadow-md hover:shadow-violet-500/8 transition-all duration-150 flex flex-col gap-3">
              <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed flex-1">{gen.content}</p>

              {gen.mediaUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-100">
                  <img src={gen.mediaUrl} alt="Gen" className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-150" />
                </div>
              )}

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">{new Date(gen.createdAt || Date.now()).toLocaleDateString()}</span>
                <span className="text-[10px] text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full font-semibold">{gen.tone}</span>
              </div>

              <button
                onClick={() => setActiveScheduler(gen)}
                className="w-full bg-slate-50 hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white text-slate-600 border border-slate-200 hover:border-transparent text-xs font-semibold py-2.5 rounded-xl transition-all duration-150"
              >
                Schedule Post
              </button>
            </div>
          ))}

          {generations.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-2">
              <div className="size-12 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto">
                <Wand2Icon className="size-6 text-violet-300" />
              </div>
              <p className="text-slate-400 text-sm mt-3">No generations yet. Describe your idea above!</p>
            </div>
          )}
        </div>
      </div>

      {/* Scheduler Modal */}
      {activeScheduler && (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-12px_rgba(124,58,237,0.2)] border border-white w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
              <h3 className="text-slate-900 font-serif font-bold text-lg">Schedule This Post</h3>
              <button onClick={() => setActiveScheduler(null)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-4">
              {activeScheduler.prompt && (
                <div className="bg-violet-50/60 rounded-xl p-4 border border-violet-100">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1.5">Prompt</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{activeScheduler.prompt}</p>
                </div>
              )}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1.5">Generated Content</p>
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && (
                  <img src={activeScheduler.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-slate-200" />
                )}
              </div>
            </div>

            <div className="px-7 py-6 border-t border-slate-100 space-y-6 bg-white">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Select Channels</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => {
                    const active = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPlatforms((prev) => prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id])}
                        className={`size-10 rounded-xl transition-all duration-150 flex items-center justify-center border ${active ? "bg-violet-50 border-violet-400 text-violet-500 scale-105" : "bg-white border-slate-200 text-slate-400 hover:border-violet-300 hover:bg-violet-50"}`}
                      >
                        <p.icon className="size-4.5" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar1Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                </div>
                <div className="relative">
                  <ClockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="time" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                </div>
              </div>

              <button
                onClick={handleSchedule}
                disabled={scheduling}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-violet-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
              >
                {scheduling ? <Loader2Icon className="size-4 animate-spin" /> : <TimerIcon className="size-4" />}
                Schedule Post
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AIComposer
