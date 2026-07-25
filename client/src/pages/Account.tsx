import { useCallback, useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets"
import { PlusIcon } from "lucide-react"
import AccountList from "../components/AccountList"
import PlatformPickerModal from "../components/PlatformPickerModal"
import toast from "react-hot-toast"
import api from "../api/axios"

const Account = () => {

  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [showPlatformPicker, setShowPlatfromPicker] = useState(false)

  const fetchAccounts = useCallback(async (isSync = false, platform: string | null = null, successMsg?: string) => {
    try {
      if(isSync) {
        const label = platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Social Media";
        toast.loading(`Syncing ${label} account...`, {id: "sync"} )
        await api.get("/api/oauth/sync")
        toast.success(successMsg || "Account synced!", { id: "sync"})
      }

      const { data } = await api.get("/api/accounts")
      setAccounts(data.data || data)
      
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to load accounts");
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const connectedPlatform = params.get("connected");
    const connectedUsername = params.get("username");
    const syncNeeded = params.get("sync") === "true";
    const errorMsg = params.get("error");

    window.history.replaceState({}, document.title, window.location.pathname)

    if(connectedPlatform) {
      const label = connectedPlatform.charAt(0).toUpperCase() + connectedPlatform.slice(1);
      const handle = connectedUsername ? `(@${connectedUsername})` : ""
      fetchAccounts(true, connectedPlatform, `${label} ${handle} connected!`)
    } else if(errorMsg) {
      toast.error(`Connection failed: ${decodeURIComponent(errorMsg)}`)
      fetchAccounts();
    } else if(syncNeeded) {
      fetchAccounts(true, null, "Accounts synced!");
    } else {
      fetchAccounts();
    }
  }, [fetchAccounts])

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId)
    try {
      const { data } = await api.get(`/api/oauth/${platformId}/url`)
      window.location.href = data.url;
    } catch (error : any) {
      toast.error(error?.response?.data?.message || "Failed to connect platform")
      setConnecting(null)
    }
  }

  const handleDisconnect = async (accountId: string) => {
    try {
      await api.delete(`/api/accounts/${accountId}`)
      toast.success("Account disconnected")
      await fetchAccounts()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to disconnect account")
    }
  }
  
  const connectedIds = accounts.map((a) => a.platform)  
  
  return (
    <div className="space-y-8 max-w-4xl">

    {/* Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
      <div>
        <h2 className="text-2xl font-serif font-bold text-slate-900">Connected Accounts</h2>
        <p className="text-slate-500 text-sm mt-0.5">{accounts.length} of {PLATFORMS.length} platforms connected</p>
      </div>
      <button onClick={() => {
        setShowPlatfromPicker(true) 
      }} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-violet-500/20 hover:scale-[1.01] transition-all w-full sm:w-auto justify-center">
        <PlusIcon className="size-4"/> Connect Account
      </button>
    </div>

    {/* Platfrom picker modal */}
    {showPlatformPicker && <PlatformPickerModal connectedIds={connectedIds} connecting={connecting} onClose={()=>setShowPlatfromPicker(false)} onConnect={handleConnect}/>}

    {/* Connected accounts list or Skeleton loading state */}
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200/80 animate-pulse flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-3 w-16 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="h-8 w-20 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>
    ) : (
      <AccountList accounts={accounts} onDisconnect={handleDisconnect}/>
    )}

    </div>
  )
}

export default Account