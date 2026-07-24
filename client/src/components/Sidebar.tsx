import { Calendar1Icon, LayoutDashboardIcon, LogOutIcon, UserIcon, Wand2Icon } from 'lucide-react'
import { useLocation, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: (value: boolean) => void}) => {

  const {logout , user} = useAuth()


  const navItems = [ 
    {name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard"},
    {name: "Accounts", icon: UserIcon, path: "/accounts"},
    {name: "Scheduler", icon: Calendar1Icon, path: "/schedule"} ,
    {name: "Ai Composer", icon: Wand2Icon, path: "/ai-composer"} 
  ]

  const location = useLocation()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-slate-200 flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

      <div className="p-6 pb-4">
        <div className='text-xl tracking-tight text-slate-800 flex items-center gap-1.5'>
          <img src="/logo.svg" alt="logo" className='size-6' />
          <span>SocialSync</span>
        </div>

        <div className='px-6 py-2'>
          <span className='text-xs text-slate-500 uppercase tracking-wider'>
            Menu
          </span>
        </div>
        
        <nav className='flex-1 px-3 space-y-1'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink key={item.name} 
              to={item.path} 
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)} 

              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <item.icon className={`size-4.5 shrink-0 ${isActive ? "text-red-500" : "text-slate-500"}`}/>
                {item.name}
                {isActive && <span className='ml-auto w-[5px] h-5 rounded-full bg-red-500'/>}
              </NavLink>
            )
          })}
        </nav>

        <div className='absolute bottom-4 left-0 right-0'>
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors duration-150 cursor-pointer">
              <div className='size-8 rounded-full bg-linear-to-br from-red-400 to-pink-500 flex items-center justify-center text-white text-sm font-semibold shrink-0'>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='text-md text-slate-800 truncate'>{user?.name || ""}</div>
                <div className='text-xs text-slate-500 truncate'> {user?.email || ""}</div>
              </div>
              
             
            </div>

            <button onClick={logout} className="mt-1 flex items-center gap-2 px-6 py-2 w-full text-sm text-slate-500 hover:text-red-500 hover:bg-slate-50 transition-all duration-150"> 
                <LogOutIcon className='size-4'/>
                Sign Out
            </button>

          </div>

           

        </div>


      </div>
      
    </div>
  )
}

export default Sidebar