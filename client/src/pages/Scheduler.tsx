import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarDaysIcon, CalendarIcon, ClockIcon, XIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
toast


const Scheduler = () => {
  const [post, setPosts] = useState<any[]>([])
  const [content, setContent] = useState("")
  const [scheduleDate, setSchduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediafile, setMediafile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [loading, setLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setMediafile(null);
      setMediaUrl("");
      return;
    }
    setMediafile(file);
    const type = file.type.startsWith("video/") ? "video" : "image";
    setMediaType(type);

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result === "string") {
        setUploadingMedia(true);
        const toastId = toast.loading("Uploading media to Cloudinary...");
        try {
          const { data } = await api.post("/api/posts/upload", { media: reader.result });
          if (data?.url) {
            setMediaUrl(data.url);
            toast.success("Media uploaded to Cloudinary!", { id: toastId });
          } else {
            toast.error("Cloudinary did not return a valid URL", { id: toastId });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Failed to upload to Cloudinary", { id: toastId });
        } finally {
          setUploadingMedia(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/api/posts/")
      setPosts(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchPosts()
    const interval = setInterval(fetchPosts, 10000)
    return () => clearInterval(interval)
  }, [])

  const scheduled = post.filter((p) => p.status === 'scheduled')
  const published = post.filter((p) => p.status === 'published')

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    if(selectedPlatforms.length === 0) {
      toast.error("Select at least one platform")
      return;
    }
    if(!scheduleDate || !scheduleTime) {
      toast.error("Select date and time")
      return;
    }

    const isPublicUrl = mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://");

    if (mediaUrl && !isPublicUrl) {
      toast.error("Media URL must start with http:// or https:// (data: base64 URLs are not supported by Zernio/Instagram)");
      return;
    }

    if (selectedPlatforms.includes("instagram") && !isPublicUrl) {
      toast.error("Instagram posts require a public http:// or https:// image/video URL");
      return;
    }

    const scheduledFor = new Date(`${scheduleDate}T${scheduleTime}`).toISOString(); 

    setLoading(true)
    try {
      await api.post("/api/posts", {
        content,
        mediaUrl: isPublicUrl ? mediaUrl : undefined,
        mediaType,
        scheduledFor,
        status: "scheduled",
        platforms: selectedPlatforms
      })
      toast.success("Post scheduled successfully")
      setContent("")
      setSchduleDate("")
      setScheduleTime("")
      setSelectedPlatforms([])
      setMediafile(null)
      setMediaUrl("")
      fetchPosts()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Compose panel */}
      <div className="w-full lg:w-[460px] shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg text-slate-700 font-medium">Compose Post</h2>
        </div>

        <form className="space-y-5" onSubmit={handleSchedule}>
          {/* Platform */}
          <div>
            <label className="block text-xs text-slate-400 uppercase mb-2">Platforms</label>
            <div className="flex flex-wrap gap-3">
              {PLATFORMS.map((p) => {
                const active = selectedPlatforms.includes(p.id);
                return (
                  <button key={p.id} type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-1.5 p-3 rounded-md border transition-all duration-150 ${active ? "bg-violet-50 border-violet-300 text-violet-500 scale-103" : "border-white/10 text-slate-400 hover:border-slate-300"}`}>
                    <p.icon className="size-4.5" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs text-slate-400 uppercase mb-2">Content</label>
            <textarea required rows={5} placeholder="What do you want to share today"
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-400 outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className={`text-right text-xs mt-1 font-medium ${content.length > 270 ? "text-violet-500" : "text-slate-400"}`}>
              {content.length}/270
            </div>
          </div>

          {/* Media Upload & URL */}
          <div>
            <label className="block text-xs text-slate-400 uppercase mb-2">Media (Cloudinary / HTTPS URL)</label>
            {mediaUrl && (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://")) ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-800/50">
                {mediaType === "image" ? (
                  <img src={mediaUrl} alt="preview" className="w-full h-44 object-cover" />
                ) : (
                  <video src={mediaUrl} controls className="w-full h-44 object-cover" />
                )}

                <button type="button" onClick={() => { setMediafile(null); setMediaUrl(""); }} className="absolute top-2 right-2 size-7 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full flex items-center justify-center transition-colors">
                  <XIcon className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center gap-1.5 p-5 py-6 border-2 border-dotted border-white/10 rounded-xl cursor-pointer hover:border-violet-300 hover:bg-violet-50/30 transition-all group">
                  {uploadingMedia ? (
                    <span className="text-xs text-slate-400 font-medium animate-pulse">Uploading file to Cloudinary...</span>
                  ) : (
                    <>
                      <span className="text-sm text-slate-600 font-medium group-hover:text-violet-600 transition-colors">Upload image/video to Cloudinary</span>
                      <span className="text-[11px] text-slate-400">Files will be converted to public HTTPS Cloudinary URLs</span>
                    </>
                  )}
                  <input type="file" accept="image/*, video/*" disabled={uploadingMedia} className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="Or paste public image/video URL (e.g. https://...)"
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-400 outline-none focus:border-slate-300"
                    value={mediaUrl}
                    onChange={(e) => {
                      setMediaUrl(e.target.value);
                      if (e.target.value.match(/\.(mp4|webm|ogg)$/i)) {
                        setMediaType("video");
                      } else {
                        setMediaType("image");
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Date & Time  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date */}
            <div>
              <label className="block text-xs text-slate-400 uppercase mb-2">Date</label>
              <div className="relative">
                <CalendarIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input type="date" required className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white text-sm outline-none" value={scheduleDate} onChange={(e) => setSchduleDate(e.target.value)} />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs text-slate-400 uppercase mb-2">Time</label>
              <div className="relative">
                <ClockIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input type="time" required className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white text-sm outline-none" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-violet-500 hover:bg-violet-600 transition-all text-white rounded-lg cursor-pointer">
            {loading ? (
              <>
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Scheduling....
              </>
            ) : (
              <>
                <span>Schedule Post</span>
                <ArrowRightIcon className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Queue Panel */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">

        {/* Upcoming */}
        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
            <CalendarDaysIcon className="size-4 text-zinc-400" />
            <h3 className="text-white text-sm font-medium">Upcoming</h3>
            <span className="ml-auto text-xs font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full">{scheduled.length}</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
            {scheduled.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No posts scheduled yet</div>
            ) : (
              scheduled.map((postItem: any) => (
                <div key={postItem._id || postItem.id} className="px-5 py-4 hover:bg-slate-800/50/60 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {(postItem.platforms || postItem.platform || []).map((p1: string) => {
                        const meta = PLATFORMS.find((p) => p.id === p1);
                        return meta ? <meta.icon key={p1} className="size-3.5 text-slate-400" /> : null
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      {postItem.mediaType && <span className="text-xs bg-slate-800 text-slate-600 border-slate px-1.5 py-0.5 rounded-md font-semibold capitalize">
                        {postItem.mediaType}
                      </span>}

                      <span className="text-xs text-slate-400">{postItem.updatedAt ? new Date(postItem.updatedAt).toLocaleString() : ''}</span>
                      <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">Scheduled</span>
                    </div>
                  </div>
                  <p className="text-slate-200 text-sm mt-2 line-clamp-1">{postItem.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Published */}
        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
            <CalendarDaysIcon className="size-4 text-emerald-500" />
            <h3 className="text-white text-sm font-medium">Published</h3>
            <span className="ml-auto text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{published.length}</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
            {published.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No published posts yet</div>
            ) : (
              published.map((postItem: any) => (
                <div key={postItem._id || postItem.id} className="px-5 py-4 hover:bg-slate-800/50/60 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {(postItem.platforms || postItem.platform || []).map((p1: string) => {
                        const meta = PLATFORMS.find((p) => p.id === p1);
                        return meta ? <meta.icon key={p1} className="size-3.5 text-slate-400" /> : null
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      {postItem.mediaType && <span className="text-xs bg-slate-800 text-slate-600 border-slate px-1.5 py-0.5 rounded-md font-semibold capitalize">
                        {postItem.mediaType}
                      </span>}

                      <span className="text-xs text-slate-400">{postItem.updatedAt ? new Date(postItem.updatedAt).toLocaleString() : ''}</span>
                      <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">Published</span>
                    </div>
                  </div>
                  <p className="text-slate-200 text-sm mt-2 line-clamp-1">{postItem.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default Scheduler