import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const Dashboard = () => {
  const [stats, setStats] = useState({ scheduled: 0, published: 0, connectedAccounts: 0 })
  const [activities, setActivites] = useState<any>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postsRes, accountsRes, activitiesRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])

        const posts = Array.isArray(postsRes.data) ? postsRes.data : postsRes.data.posts || [];
        const accounts = Array.isArray(accountsRes.data) ? accountsRes.data : accountsRes.data.data || [];
        const activityList = activitiesRes.data.activity || (Array.isArray(activitiesRes.data) ? activitiesRes.data : []);

        setStats({
          scheduled: posts.filter((p: any) => p.status === 'scheduled').length,
          published: posts.filter((p: any) => p.status === 'published').length,
          connectedAccounts: accounts.filter((a: any) => a.status === 'connected').length,
        })
        setActivites(activityList)
      } catch (error) {
        console.error("Error fetching dashboard data", error)
      }
    };
    fetchDashboardData()
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning ☀️" : hour < 17 ? "Good Afternoon 👋" : "Good Evening 🌙"

  const statCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today"
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      trend: "All time",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active",
    },
  ]

  return (
    <div className='space-y-6'>

      {/* Welcome banner */}
      <div className='bg-gradient-to-r from-violet-600/8 via-white to-indigo-600/5 border border-violet-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-serif font-bold text-slate-900'>{greeting}</h2>
          <p className='text-slate-500 text-sm mt-0.5'>Here's what's happening with your social accounts today.</p>
        </div>
        <Link to="/schedule" className='bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl px-5 py-2.5 font-semibold text-sm shadow-md shadow-violet-500/20 hover:scale-[1.02] transition-all duration-150 whitespace-nowrap'>
          Schedule a Post →
        </Link>
      </div>

      {/* Stat cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {statCards.map((card) => (
          <div key={card.label} className='bg-white rounded-2xl border border-slate-100 p-5 hover:border-violet-200 hover:shadow-md hover:shadow-violet-500/8 transition-all duration-150 cursor-default'>
            <div className='flex items-start justify-between'>
              <div className='size-9 rounded-xl bg-violet-50 flex items-center justify-center'>
                <card.icon className='size-4.5 text-violet-500' />
              </div>
              <span className='text-[10px] bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-semibold'>{card.trend}</span>
            </div>
            <div className='text-3xl font-bold text-slate-900 mt-3'>{card.value}</div>
            <p className='text-xs text-slate-500 font-medium uppercase tracking-wider mt-1'>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className='bg-white rounded-2xl border border-slate-100 overflow-hidden'>
        <div className='px-6 py-4 border-b border-slate-50 flex items-center justify-between'>
          <h2 className='text-slate-800 font-semibold text-sm'>Recent Activity</h2>
          <span className='bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-0.5 rounded-full'>{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-14 px-4 text-center'>
            <div className='size-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3'>
              <ActivityIcon className='size-5 text-slate-300' />
            </div>
            <p className='font-medium text-slate-700 text-sm'>No Recent Activity</p>
            <p className='text-xs text-slate-400 mt-1 max-w-xs'>Connect accounts and schedule posts to see events here</p>
          </div>
        ) : (
          <div>
            {activities.map((activity: any) => (
              <div key={activity._id || activity.id} className='flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50/80 transition-colors duration-100 border-b border-slate-50 last:border-0'>
                <div className='size-8 rounded-full bg-violet-50 flex items-center justify-center shrink-0 mt-0.5'>
                  <SendIcon className='size-3.5 text-violet-500' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between gap-2 mb-0.5'>
                    <span className='px-2 py-0.5 text-[10px] font-semibold bg-violet-50 text-violet-700 rounded-full inline-block'>
                      {activity.actionType === "POST_PUBLISHED" ? "Published" : (activity.type || "Published")}
                    </span>
                    <span className='text-[10px] text-slate-400 font-normal'>
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className='text-sm text-slate-700 mt-0.5'>
                    {activity.description || activity.des || activity.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard