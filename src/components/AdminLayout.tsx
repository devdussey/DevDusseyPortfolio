import { ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AdminLayout.css'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { adminUser, signOut, hasPermission, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src="/NewLogo.png" alt="DevDussey" className="sidebar-logo" style={{height: '40px', marginBottom: '8px'}} />
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={`nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>

          {hasPermission('projects', 'view') && (
            <Link
              to="/admin/projects"
              className={`nav-item ${isActive('/admin/projects') ? 'active' : ''}`}
            >
              <span className="nav-icon">💼</span>
              <span>Portfolio Projects</span>
            </Link>
          )}

          {hasPermission('current_projects', 'view') && (
            <Link
              to="/admin/current-projects"
              className={`nav-item ${isActive('/admin/current-projects') ? 'active' : ''}`}
            >
              <span className="nav-icon">🚀</span>
              <span>Current Projects</span>
            </Link>
          )}

          {hasPermission('messages', 'view') && (
            <Link
              to="/admin/messages"
              className={`nav-item ${isActive('/admin/messages') ? 'active' : ''}`}
            >
              <span className="nav-icon">💬</span>
              <span>Messages</span>
            </Link>
          )}

          {isAdmin() && (
            <Link
              to="/admin/users"
              className={`nav-item ${isActive('/admin/users') ? 'active' : ''}`}
            >
              <span className="nav-icon">👥</span>
              <span>User Management</span>
            </Link>
          )}

          <Link
            to="/"
            className="nav-item"
            target="_blank"
          >
            <span className="nav-icon">🌐</span>
            <span>View Site</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {adminUser?.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <p className="user-name">{adminUser?.full_name}</p>
              <p className="user-role">{adminUser?.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}
