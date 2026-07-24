import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface PlatformPickerModalProps {
    connectedIds: string[];
    connecting: string | null;
    onClose: () => void;
    onConnect: (platformId: string) => void;
}

const PlatformPickerModal = ({connectedIds, connecting, onClose, onConnect}: PlatformPickerModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-12px_rgba(124,58,237,0.2)] border border-white w-full max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h2 className="text-lg font-serif font-bold text-slate-900">Connect an account</h2>
                <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                    <XIcon className="size-4"/>
                </button>
            </div>

            {/* Platform list */}
            <div className="p-3 flex flex-col gap-1.5">
                {PLATFORMS.map((p) => {
                    const isConnected = connectedIds.includes(p.id);
                    const isConnecting = connecting === p.id;
                    return (
                        <button key={p.id}
                        disabled={isConnected || isConnecting}
                        onClick={() => onConnect(p.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${isConnected ? "border-violet-200 bg-violet-50/60 cursor-default" : "border-slate-100 bg-white hover:border-violet-300 hover:bg-violet-50/40 cursor-pointer"} ${isConnecting && 'opacity-50'}`}>
                            {/* Icon */}
                            <div className={`size-9 rounded-xl flex items-center justify-center ${isConnected ? 'bg-violet-50' : 'bg-slate-50'}`}>
                                <p.icon className={`size-5 ${isConnected ? "text-violet-500" : "text-slate-500"}`} />
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                                <div className={`text-sm font-medium ${isConnected ? "text-violet-700" : "text-slate-700"}`}>
                                    {p.name}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                    {isConnected ? "Already connected" : p.description}
                                </div>
                            </div>

                            {/* Status */}
                            {isConnected && <CheckCircleIcon className="size-4 text-violet-400 shrink-0"/>}
                            {isConnecting && <div className="size-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin shrink-0"/>}
                            {!isConnected && !isConnecting && <ExternalLinkIcon className="size-3.5 text-slate-300 shrink-0"/>}
                        </button>
                    )
                })}
            </div>
        </div>
        
    </div>
  )
}

export default PlatformPickerModal