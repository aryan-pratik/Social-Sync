import { useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Social Accounts",
  "/schedule": "Post Scheduler",
  "/ai-composer": "AI Composer"
}

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth()

  const location = useLocation()

  const title = pageTitles[location.pathname] || "Social Sync";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[#f8f7ff]'>
        <div className='size-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className='flex h-screen bg-[#f8f7ff]'>
      {isMobileMenuOpen && <div className='fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden'
        onClick={() => setMobileMenuOpen(false)} />}

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center px-6 md:px-10 gap-4 sticky top-0 z-30'>

          <button className='md:hidden p-2.5 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors' onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon className='size-6' />
          </button>

          <div className='flex flex-col justify-center'>
            <h1 className='text-2xl font-serif font-bold bg-gradient-to-r from-violet-700 to-indigo-500 bg-clip-text text-transparent tracking-tight'>{title}</h1>
            <p className='text-slate-500 text-[13px] font-medium mt-1'>Manage and automate your social presence</p>
          </div>

        </header>

        <main className='flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout