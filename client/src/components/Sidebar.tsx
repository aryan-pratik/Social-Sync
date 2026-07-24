import { Calendar1Icon, LayoutDashboardIcon, LogOutIcon, UserIcon, Wand2Icon } from 'lucide-react'
import { useLocation, NavLink } from 'react-router-dom'
import logoUrl from '../assets/logo.svg'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (value: boolean) => void }) => {

  const { logout, user } = useAuth()

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Accounts", icon: UserIcon, path: "/accounts" },
    { name: "Scheduler", icon: Calendar1Icon, path: "/schedule" },
    { name: "Ai Composer", icon: Wand2Icon, path: "/ai-composer" }
  ]

  const location = useLocation()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

      <div className="p-5 pb-0">
        <div className='flex items-center gap-2.5 mb-4'>
          <img src={logoUrl} alt="SocialSync Logo" className="size-8 drop-shadow-md" />
          <span className='font-serif font-bold text-xl text-slate-900 tracking-tight'>
            Social<span className='text-violet-600 italic font-normal'>Sync</span>
          </span>
        </div>

        <div className='h-px bg-slate-100 my-3' />

        <nav className='flex flex-col gap-0.5'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-600 hover:bg-violet-50/60 hover:text-violet-600"}`}
              >
                <item.icon className={`size-4.5 shrink-0 ${isActive ? "text-violet-500" : "text-slate-400"}`} />
                {item.name}
                {isActive && <span className='ml-auto w-1 h-5 rounded-full bg-violet-500' />}
              </NavLink>
            )
          })}
        </nav>
      </div>

      <div className='absolute bottom-4 left-0 right-0'>
        <div className="mx-3 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors duration-150 cursor-pointer">
            <div className='size-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0'>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className='flex-1 min-w-0'>
              <div className='text-sm text-slate-800 font-medium truncate'>{user?.name || ""}</div>
              <div className='text-xs text-slate-400 truncate'>{user?.email || ""}</div>
            </div>
          </div>

          <button onClick={logout} className="mt-1 flex items-center gap-2 px-4 py-2 w-full text-sm text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-150">
            <LogOutIcon className='size-4' />
            Sign Out
          </button>
        </div>
      </div>

    </div>
  )
}

export default Sidebar