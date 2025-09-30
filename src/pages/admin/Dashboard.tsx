import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import './Dashboard.css'

interface Stats {
  totalProjects: number
  currentProjects: number
  unreadMessages: number
  totalMessages: number
}

export default function Dashboard() {
  const { adminUser } = useAuth()
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    currentProjects: 0,
    unreadMessages: 0,
    totalMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [projectsRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'unread'),
      ])

      setStats({
        totalProjects: projectsRes.count || 0,
        currentProjects: 0,
        unreadMessages: unreadRes.count || 0,
        totalMessages: messagesRes.count || 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="dashboard-page">
        <div className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {adminUser?.full_name}!</p>
          </div>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-content">
                <h3>Portfolio Projects</h3>
                <p className="stat-value">{stats.totalProjects}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🚀</div>
              <div className="stat-content">
                <h3>Current Projects</h3>
                <p className="stat-value">{stats.currentProjects}</p>
              </div>
            </div>

            <div className="stat-card highlight">
              <div className="stat-icon">💬</div>
              <div className="stat-content">
                <h3>Unread Messages</h3>
                <p className="stat-value">{stats.unreadMessages}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📧</div>
              <div className="stat-content">
                <h3>Total Messages</h3>
                <p className="stat-value">{stats.totalMessages}</p>
              </div>
            </div>
          </div>
        )}

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/admin/projects" className="action-card">
              <span className="action-icon">➕</span>
              <span>Add Project</span>
            </a>
            <a href="/admin/messages" className="action-card">
              <span className="action-icon">📨</span>
              <span>View Messages</span>
            </a>
            <a href="/" target="_blank" className="action-card">
              <span className="action-icon">🌐</span>
              <span>View Site</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
