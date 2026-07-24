import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import api from '../api/axios'

const Dashboard = () => {
  const [stats, setStats] = useState({scheduled: 0, published: 0, connectedAccounts: 0})
  const [activities, setActivites] = useState<any>([])

  useEffect(() => {
    const fetchDashboardData = async() => {
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
    <div className='space-y-8'>
      
      <div>
        <h2 className='text-2xl text-slate-900'>Good Morning</h2>
        <p className='text-slate-500'>Here's what's happening with your social accounts today.</p>
      </div>
        
      {/* stats cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'> 
        {statCards.map((card) => (
          <div key={card.label} className='bg-white border border-slate-200/70 rounded-2xl p-6 transition-all hover:border-red-200 hover:bg-red-50/40 cursor-pointer'>
            <div className='flex items-start justify-between mb-4'> 
              <div className='text-3xl font-semibold text-slate-900'>{card.value}</div>
              <div className='flex items-center gap-1 text-xs text-rose-500 font-medium'>
                <TrendingUpIcon className='size-3'/>
                {card.trend}
              </div>
            </div>
            <p className='text-sm font-medium text-slate-400'>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className='bg-white rounded-2xl border border-slate-200/70 overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
          <h2 className='font-semibold text-slate-900'>Recent Activity</h2>
          <span className='text-xs text-slate-400'>{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
            <div className='size-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3'>
              <ActivityIcon className='size-6 text-slate-400'/>
            </div>
            <p className='font-medium text-slate-700'>No Recent Activity</p>
            <p className='text-sm text-slate-400 mt-1 max-w-sm'>Connect accounts and schedule posts to see events here</p>
          </div>
        ) : (
          <div className='divide-y divide-slate-100'>
            {activities.map((activity: any) => (
              <div key={activity._id || activity.id} className='flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors'>
                <div className='size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600'>
                  <SendIcon className='size-4'/>
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between gap-2 mb-1'>
                    <span className='px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-full inline-block'>
                      {activity.actionType === "POST_PUBLISHED" ? "Published" : (activity.type || "Published")}
                    </span>
                    <span className='text-xs text-slate-400 font-normal'>
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className='text-sm font-medium text-slate-700'>
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