import { useEffect, useState } from "react"
import { dummyGenerationData, PLATFORMS } from "../assets/assets"
import { ArrowRightIcon, Calendar1Icon, ClockIcon, HistoryIcon, Loader2Icon, TimerIcon, Wand2Icon, XIcon } from "lucide-react"
import Scheduler from "./Scheduler"


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
  const [type, setType] = useState("standard");

  const fetchGenerations = async () => {
    setGenerations(dummyGenerationData)
  }

  useEffect(() => {
    fetchGenerations();
  }, [])

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }

  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];

  const handleSchedule = () => {
    setScheduling(true);
    setTimeout(() => {
      setScheduling(false);
      setActiveScheduler(null);
    }, 2000)
  }


  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">

      {/* Input Section */}
      <div className="space-y-4 text-center mt-20">
        <h1 className="text-3xl text-slate-800 tracking-tight">What are you thinking to create today?</h1>
        <div className="relative">
          <textarea
            rows={4}
            className="w-full px-6 py-5 pb-16 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 outline-none focus:border-slate-300 shadow-xs resize-none"
            placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-rose-50/80 px-3 py-1.5 rounded-full border border-rose-100/60">
              <span className="text-xs font-medium text-slate-600">AI Image</span>
              <button
                type="button"
                onClick={() => setGenerateImage(!generateImage)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${generateImage ? "bg-red-500" : "bg-slate-300"}`}
              >
                <span className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full bg-white shadow-xs transition ${generateImage ? "translate-x-4.5" : "translate-x-0.5"}`} />
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${tone === t ? "bg-red-500 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-12 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HistoryIcon className="size-5 text-slate-500" />
            <h2 className="text-xl text-slate-800">Generation History</h2>
          </div>
          <span className="text-slate-400 text-sm">{generations.length} total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {generations.map((gen) => (
            <div key={gen.id} className="group bg-white rounded-2xl border border-slate-100 p-5 hover:border-red-200 transition-all relative overflow-hidden">
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
                    className="flex-1 bg-slate-100 hover:bg-red-500 hover:text-white text-slate-600 text-xs py-2.5 rounded-lg transition-opacity">
                    Schedule Post
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">{new Date(gen.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-md">{gen.tone}</span>
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-slate-50/30">
              <h3 className="text-slate-900 font-medium">Schedule Generation</h3>
              <button onClick={() => setActiveScheduler(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {activeScheduler.prompt && (
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                  <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.prompt}</p>
                </div>
              )}

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && <img src={activeScheduler.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-slate-200 shadow-sm" />}
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-50 space-y-8">
              {/* Options  */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-slate-600 uppercase tracking-widest mb-3">Select Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => {
                      const active = selectedPlatforms.includes(p.id);
                      return (
                        <button key={p.id} onClick={() => setSelectedPlatforms((prev) => prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id])} className={`size-10 rounded-xl transition flex items-center justify-center ${active ? "bg-red-500 text-white" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"}`}>
                          <p.icon className="size-4.5 " />
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar1Icon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-md text-slate-900 textsm focus:outline-none transition-all" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                  </div>
                  <div className="relative">
                    <ClockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="time" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-md text-slate-900 text-sm focus:outline-none transition-all" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                  </div>

                </div>

              </div>

              <button onClick={handleSchedule} className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-slate-200 text-slate-700 hover:bg-red-500 hover:text-white transition">
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