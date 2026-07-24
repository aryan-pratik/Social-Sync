import { AlertCircleIcon, CheckCircleIcon, PlusCircleIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";


interface AccountListProps {
    accounts: any[];
    onDisconnect: (accountId: string) => Promise<void>;
}

const AccountList = ({ accounts, onDisconnect }: AccountListProps) => {

    const handleDisconnect = async (accountId: string) => {
        const confirm = window.confirm("Are you sure you want to disconnect this account?")
        if (!confirm) return;
        try {
            await onDisconnect(accountId)
        } catch (error) {
            console.log(error)
        }
    }

    if(accounts.length === 0) {
        return (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center py-20 px-6">
                <div className="size-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-4">
                    <PlusCircleIcon className="size-6 text-violet-300"/>
                </div>
                <p className="text-slate-700 text-lg font-semibold">No accounts connected</p>
                <p className="text-sm text-slate-400 mt-1 max-w-xs text-center">Connect your first social platform to start scheduling posts.</p>
            </div>
        )
    }


  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        {accounts.map((account, index) => {
            const meta = PLATFORMS.find((p) => p.id === account.platform);
            if(!meta) return null;

            return (
                <div key={index} className="group flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                    <div className="size-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
                        <meta.icon className="size-5 text-violet-500"/>
                    </div>
                    <div>
                        <div className="text-slate-800 font-medium truncate">{account.handle}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{meta.name}</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                        {account.status === 'connected' ? (
                            <>
                            <CheckCircleIcon className="size-4 text-emerald-400"/>
                            <span className="text-xs text-emerald-600">Connected</span>
                            </>
                        ) : (
                            <>
                            <AlertCircleIcon className="size-4 text-slate-400"/>
                            <span className="text-xs text-slate-400">Disconnected</span>
                            </>
                        )}
                    </div>
                    <button onClick={()=> handleDisconnect(account._id || account.id)}
                    title="Disconnect account"
                    className="ml-2 text-rose-400 hover:text-rose-600 text-xs font-medium border border-rose-100 hover:border-rose-200 rounded-lg px-3 py-1.5 transition-all">
                        Disconnect
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default AccountList