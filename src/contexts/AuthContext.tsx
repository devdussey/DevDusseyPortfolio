import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AdminUser {
  id: string
  auth_user_id: string
  email: string
  full_name: string
  role: 'super_admin' | 'admin' | 'editor' | 'viewer'
  is_active: boolean
}

interface Permission {
  resource: string
  can_view: boolean
  can_create: boolean
  can_edit: boolean
  can_delete: boolean
}

interface AuthContextType {
  user: User | null
  adminUser: AdminUser | null
  permissions: Permission[]
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  hasPermission: (resource: string, action: 'view' | 'create' | 'edit' | 'delete') => boolean
  isAdmin: () => boolean
  isSuperAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadAdminUser(session.user.id)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadAdminUser(session.user.id)
      } else {
        setAdminUser(null)
        setPermissions([])
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadAdminUser = async (authUserId: string) => {
    try {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('auth_user_id', authUserId)
        .eq('is_active', true)
        .maybeSingle()

      if (adminError) throw adminError

      if (adminData) {
        setAdminUser(adminData as AdminUser)

        const { data: permsData, error: permsError } = await supabase
          .from('user_permissions')
          .select('*')
          .eq('user_id', adminData.id)

        if (permsError) throw permsError

        setPermissions(permsData || [])

        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminData.id)
      } else {
        setAdminUser(null)
        setPermissions([])
      }
    } catch (error) {
      console.error('Error loading admin user:', error)
      setAdminUser(null)
      setPermissions([])
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setAdminUser(null)
    setPermissions([])
  }

  const hasPermission = (resource: string, action: 'view' | 'create' | 'edit' | 'delete'): boolean => {
    if (!adminUser) return false
    if (adminUser.role === 'super_admin') return true

    const permission = permissions.find(p => p.resource === resource)
    if (!permission) return false

    switch (action) {
      case 'view':
        return permission.can_view
      case 'create':
        return permission.can_create
      case 'edit':
        return permission.can_edit
      case 'delete':
        return permission.can_delete
      default:
        return false
    }
  }

  const isAdmin = (): boolean => {
    return adminUser?.role === 'super_admin' || adminUser?.role === 'admin'
  }

  const isSuperAdmin = (): boolean => {
    return adminUser?.role === 'super_admin'
  }

  const value = {
    user,
    adminUser,
    permissions,
    session,
    loading,
    signIn,
    signOut,
    hasPermission,
    isAdmin,
    isSuperAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
