import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
  requireSuperAdmin?: boolean
  requiredPermission?: {
    resource: string
    action: 'view' | 'create' | 'edit' | 'delete'
  }
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  requireSuperAdmin = false,
  requiredPermission,
}: ProtectedRouteProps) {
  const { user, adminUser, loading, hasPermission, isAdmin, isSuperAdmin } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user || !adminUser) {
    return <Navigate to="/admin/login" replace />
  }

  if (!adminUser.is_active) {
    return <Navigate to="/admin/login" replace />
  }

  if (requireSuperAdmin && !isSuperAdmin()) {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (requiredPermission) {
    const { resource, action } = requiredPermission
    if (!hasPermission(resource, action)) {
      return <Navigate to="/admin/dashboard" replace />
    }
  }

  return <>{children}</>
}
