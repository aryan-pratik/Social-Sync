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
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">

      {/* Input Section */}
      <div className="space-y-4 text-center mt-20">
        <h1 className="text-3xl text-slate-200 tracking-tight">What are you thinking to create today?</h1>
        <div className="relative">
          <textarea
            rows={4}
            className="w-full px-6 py-5 pb-16 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-400 outline-none focus:border-slate-300 shadow-xs resize-none"
            placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-rose-50/80 px-3 py-1.5 rounded-full border border-rose-100/60">
              <span className="text-xs font-medium text-slate-600">Generate AI Image</span>
              <button
                type="button"
                onClick={() => setGenerateImage(!generateImage)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${generateImage ? "bg-violet-500" : "bg-slate-300"}`}
              >
                <span className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full bg-slate-900 shadow-xs transition ${generateImage ? "translate-x-4.5" : "translate-x-0.5"}`} />
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-xs cursor-pointer disabled:opacity-50"
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
        <div className="flex flex-wrap justify-center gap-2.5 pt-2">
          {tones.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${tone === t ? "bg-slate-900 text-white" : "bg-slate-900 text-slate-600 border border-white/10 hover:bg-slate-800/50"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-12 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HistoryIcon className="size-5 text-slate-400" />
            <h2 className="text-xl text-slate-200">Generation History</h2>
          </div>
          <span className="text-slate-400 text-sm">{generations.length} total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {generations.map((gen, idx) => (
            <div key={gen._id || gen.id || idx} className="group bg-slate-900 rounded-2xl border border-slate-100 p-5 hover:border-violet-200 transition-all relative overflow-hidden">
              <div className="flex flex-col h-full space-y-4">

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">{gen.content}</p>

                {gen.mediaUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-50">
                    <img src={gen.mediaUrl} alt="Gen" className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveScheduler(gen)}
                    className="flex-1 bg-slate-800 hover:bg-violet-500 hover:text-white text-slate-600 text-xs py-2.5 rounded-lg transition-opacity">
                    Schedule Post
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">{new Date(gen.createdAt || Date.now()).toLocaleDateString()}</span>
                  <span className="text-xs text-violet-500 bg-violet-50 px-2 py-0.5 rounded-md">{gen.tone}</span>
                </div>
              </div>

            </div>
          ))}

          {
            generations.length === 0 && (
              <div className="col-span-full py-20 text-center space-y-2">
                <div className="size-12 bgslate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                  <Wand2Icon className="size-6 text-slate-700" />
                </div>
                <p className="text-center text-slate-400 mt-4 text-sm">
                  No generations yet.
                </p>
              </div>
            )
          }
        </div>
      </div>

      {/* Scheduler Modal */}
      {activeScheduler && (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-slate-800/50/30">
              <h3 className="text-white font-medium">Schedule Generation</h3>
              <button onClick={() => setActiveScheduler(null)} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 transition-colors">
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {activeScheduler.prompt && (
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-100 space-y-4">
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.prompt}</p>
                </div>
              )}

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && <img src={activeScheduler.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-white/10 shadow-md shadow-black/40" />}
              </div>
            </div>

            <div className="p-8 bg-slate-800/50/50 border-t border-slate-50 space-y-8">
              {/* Options  */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-slate-600 uppercase tracking-widest mb-3">Select Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => {
                      const active = selectedPlatforms.includes(p.id);
                      return (
                        <button key={p.id} onClick={() => setSelectedPlatforms((prev) => prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id])} className={`size-10 rounded-xl transition flex items-center justify-center ${active ? "bg-violet-500 text-white" : "bg-slate-900 text-slate-700 border border-white/10 hover:bg-slate-800"}`}>
                          <p.icon className="size-4.5 " />
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar1Icon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-100 rounded-md text-white textsm focus:outline-none transition-all" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                  </div>
                  <div className="relative">
                    <ClockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="time" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-100 rounded-md text-white text-sm focus:outline-none transition-all" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                  </div>

                </div>

              </div>

              <button onClick={handleSchedule} className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-slate-200 text-slate-700 hover:bg-violet-500 hover:text-white transition">
                {scheduling ? <Loader2Icon className="size-4 animate-spin" /> : <TimerIcon className="size-4" />}
                Schedule post
              </button>


            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AIComposer