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
      <div className='flex h-screen w-full items-center justify-center bg-slate-800/50'>
        <div className='size-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className='flex h-screen bg-slate-800/50'>
      {isMobileMenuOpen && <div className='fixed inset-0 bg-slate-900/50 z-40 md:hidden'
        onClick={() => setMobileMenuOpen(false)} />}



      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />


      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='h-16 bg-slate-900 border-b border-white/10 flex items-center px-4 md:px-8 gap-4'>

          <button className='md:hidden p-2 -ml-2 text-slate-400' onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon className='size-6' />
          </button>

          <div>
            <h1 className='text-white'>{title}</h1>
            <p>Manage and automate your social presence</p>
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