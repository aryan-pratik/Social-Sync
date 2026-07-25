import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarDaysIcon, CalendarIcon, ClockIcon, XIcon, AlertCircleIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
toast


const Scheduler = () => {
  const [post, setPosts] = useState<any[]>([])
  const [content, setContent] = useState("")
  const [scheduleDate, setSchduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [_mediafile, setMediafile] = useState<File | null>(null);
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
        const toastId = toast.loading("Uploading media...");
        try {
          const { data } = await api.post("/api/posts/upload", { media: reader.result });
          if (data?.url) {
            setMediaUrl(data.url);
            toast.success("Media uploaded !", { id: toastId });
          } else {
            toast.error("Cloudinary did not return a valid URL", { id: toastId });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Failed to upload", { id: toastId });
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
  const failedOrUnpublished = post.filter((p) => p.status === 'failed' || p.status === 'draft')

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
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-slate-900">Compose Post</h2>
        </div>

        <form className="space-y-5" onSubmit={handleSchedule}>
          {/* Platform */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Platforms</label>
            <div className="flex flex-wrap gap-3">
              {PLATFORMS.map((p) => {
                const active = selectedPlatforms.includes(p.id);
                return (
                  <button key={p.id} type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-1.5 p-3 rounded-xl border transition-all duration-100 ${active ? "border-violet-400 bg-violet-50 text-violet-500 scale-105" : "border-slate-200 bg-white text-slate-400 hover:border-violet-300 hover:bg-violet-50"}`}>
                    <p.icon className="size-4.5" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Content</label>
            <textarea required rows={5} placeholder="What do you want to share today"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className={`text-right text-[10px] mt-1 font-medium ${content.length > 270 ? "text-violet-500" : "text-slate-400"}`}>
              {content.length}/270
            </div>
          </div>

          {/* Media Upload & URL */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Media</label>
            {mediaUrl && (mediaUrl.startsWith("http://") || mediaUrl.startsWith("https://")) ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
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
                <label className="flex flex-col items-center justify-center gap-1.5 p-5 py-6 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-violet-400 hover:bg-violet-50/40 transition-all group">
                  {uploadingMedia ? (
                    <span className="text-xs text-slate-400 font-medium animate-pulse">Uploading file to Cloudinary...</span>
                  ) : (
                    <>
                      <span className="text-sm text-slate-600 font-medium group-hover:text-violet-600 transition-colors">Upload images</span>
                    </>
                  )}
                  <input type="file" accept="image/*" disabled={uploadingMedia} className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
                </label>
                <div className="relative">
                </div>
              </div>
            )}
          </div>
          {/* Date & Time  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Date</label>
              <div className="relative">
                <CalendarIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input type="date" required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm outline-none focus:border-violet-500" value={scheduleDate} onChange={(e) => setSchduleDate(e.target.value)} />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Time</label>
              <div className="relative">
                <ClockIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input type="time" required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm outline-none focus:border-violet-500" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-md shadow-violet-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 cursor-pointer">
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
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
            <CalendarDaysIcon className="size-4 text-violet-400" />
            <h3 className="text-slate-800 text-sm font-semibold">Upcoming</h3>
            <span className="ml-auto bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{scheduled.length}</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
            {scheduled.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No upcoming posts scheduled</div>
            ) : (
              scheduled.map((postItem: any) => (
                <div key={postItem._id || postItem.id} className="px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {(postItem.platforms || postItem.platform || []).map((p1: string) => {
                        const meta = PLATFORMS.find((p) => p.id === p1);
                        return meta ? <meta.icon key={p1} className="size-3.5 text-slate-400" /> : null
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{postItem.updatedAt ? new Date(postItem.updatedAt).toLocaleString() : ''}</span>
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-semibold">Scheduled</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm line-clamp-1 mt-1">{postItem.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Published */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
            <CalendarDaysIcon className="size-4 text-emerald-500" />
            <h3 className="text-slate-800 text-sm font-semibold">Published</h3>
            <span className="ml-auto bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{published.length}</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
            {published.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No published posts yet</div>
            ) : (
              published.map((postItem: any) => (
                <div key={postItem._id || postItem.id} className="px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {(postItem.platforms || postItem.platform || []).map((p1: string) => {
                        const meta = PLATFORMS.find((p) => p.id === p1);
                        return meta ? <meta.icon key={p1} className="size-3.5 text-slate-400" /> : null
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{postItem.updatedAt ? new Date(postItem.updatedAt).toLocaleString() : ''}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">Published</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm line-clamp-1 mt-1">{postItem.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Failed / Not Published */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100">
            <AlertCircleIcon className="size-4 text-rose-500" />
            <h3 className="text-slate-800 text-sm font-semibold">Failed / Not Published</h3>
            <span className="ml-auto bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{failedOrUnpublished.length}</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
            {failedOrUnpublished.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No failed or unpublished posts</div>
            ) : (
              failedOrUnpublished.map((postItem: any) => (
                <div key={postItem._id || postItem.id} className="px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      {(postItem.platforms || postItem.platform || []).map((p1: string) => {
                        const meta = PLATFORMS.find((p) => p.id === p1);
                        return meta ? <meta.icon key={p1} className="size-3.5 text-slate-400" /> : null
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{postItem.updatedAt ? new Date(postItem.updatedAt).toLocaleString() : ''}</span>
                      <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full font-semibold capitalize">
                        {postItem.status === 'failed' ? 'Failed' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm line-clamp-1 mt-1">{postItem.content}</p>
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