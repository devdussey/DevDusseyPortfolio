import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import './Users.css'

interface AdminUser {
  id: string
  auth_user_id: string | null
  email: string
  full_name: string
  role: string
  is_active: boolean
  created_at: string
  last_login: string | null
}

interface UserFormData {
  email: string
  password: string
  full_name: string
  role: string
  permissions: {
    projects: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    current_projects: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    messages: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    users: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    settings: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  }
}

export default function Users() {
  const { isSuperAdmin } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    full_name: '',
    role: 'viewer',
    permissions: {
      projects: { view: false, create: false, edit: false, delete: false },
      current_projects: { view: false, create: false, edit: false, delete: false },
      messages: { view: false, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  })
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    setSaveLoading(true)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create user')

      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({
          auth_user_id: authData.user.id,
          email: formData.email,
          full_name: formData.full_name,
          role: formData.role,
          is_active: true,
        })
        .select()
        .single()

      if (adminError) throw adminError

      const { data: newAdminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_user_id', authData.user.id)
        .single()

      if (newAdminUser) {
        const permissionsToInsert = Object.entries(formData.permissions).map(
          ([resource, perms]) => ({
            user_id: newAdminUser.id,
            resource,
            can_view: perms.view,
            can_create: perms.create,
            can_edit: perms.edit,
            can_delete: perms.delete,
          })
        )

        const { error: permsError } = await supabase
          .from('user_permissions')
          .insert(permissionsToInsert)

        if (permsError) throw permsError
      }

      setShowModal(false)
      resetForm()
      loadUsers()
    } catch (error: any) {
      console.error('Error creating user:', error)
      alert(error.message || 'Failed to create user')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleToggleActive = async (user: AdminUser) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: !user.is_active })
        .eq('id', user.id)

      if (error) throw error
      loadUsers()
    } catch (error) {
      console.error('Error toggling user status:', error)
    }
  }

  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to delete ${user.full_name}?`)) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', user.id)

      if (error) throw error
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      full_name: '',
      role: 'viewer',
      permissions: {
        projects: { view: false, create: false, edit: false, delete: false },
        current_projects: { view: false, create: false, edit: false, delete: false },
        messages: { view: false, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    })
  }

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({ ...prev, role }))

    if (role === 'admin') {
      setFormData(prev => ({
        ...prev,
        permissions: {
          projects: { view: true, create: true, edit: true, delete: true },
          current_projects: { view: true, create: true, edit: true, delete: true },
          messages: { view: true, create: false, edit: true, delete: true },
          users: { view: true, create: true, edit: true, delete: false },
          settings: { view: true, create: false, edit: true, delete: false },
        },
      }))
    } else if (role === 'editor') {
      setFormData(prev => ({
        ...prev,
        permissions: {
          projects: { view: true, create: true, edit: true, delete: false },
          current_projects: { view: true, create: true, edit: true, delete: false },
          messages: { view: true, create: false, edit: false, delete: false },
          users: { view: false, create: false, edit: false, delete: false },
          settings: { view: false, create: false, edit: false, delete: false },
        },
      }))
    } else if (role === 'viewer') {
      setFormData(prev => ({
        ...prev,
        permissions: {
          projects: { view: true, create: false, edit: false, delete: false },
          current_projects: { view: true, create: false, edit: false, delete: false },
          messages: { view: true, create: false, edit: false, delete: false },
          users: { view: false, create: false, edit: false, delete: false },
          settings: { view: false, create: false, edit: false, delete: false },
        },
      }))
    }
  }

  return (
    <AdminLayout>
      <div className="users-page">
        <div className="page-header">
          <div>
            <h1>User Management</h1>
            <p>Manage admin users and their permissions</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            Add User
          </button>
        </div>

        {loading ? (
          <div className="page-loading">
            <div className="loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      {user.last_login
                        ? new Date(user.last_login).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td>
                      <div className="action-buttons">
                        {user.role !== 'super_admin' && (
                          <>
                            <button
                              onClick={() => handleToggleActive(user)}
                              className="btn-icon"
                              title={user.is_active ? 'Deactivate' : 'Activate'}
                            >
                              {user.is_active ? '🔒' : '🔓'}
                            </button>
                            {isSuperAdmin() && (
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="btn-icon danger"
                                title="Delete"
                              >
                                🗑️
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New User</h2>
                <button onClick={() => setShowModal(false)} className="modal-close">×</button>
              </div>

              <div className="modal-body">
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={e => setFormData({...formData, full_name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="form-field">
                    <label>Role</label>
                    <select
                      value={formData.role}
                      onChange={e => handleRoleChange(e.target.value)}
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                      {isSuperAdmin() && <option value="super_admin">Super Admin</option>}
                    </select>
                  </div>
                </div>

                <div className="permissions-section">
                  <h3>Permissions</h3>
                  <p className="permissions-hint">Customize permissions based on role selection</p>

                  {Object.entries(formData.permissions).map(([resource, perms]) => (
                    <div key={resource} className="permission-row">
                      <div className="permission-label">{resource.replace('_', ' ')}</div>
                      <div className="permission-checks">
                        <label>
                          <input
                            type="checkbox"
                            checked={perms.view}
                            onChange={e => setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [resource]: { ...perms, view: e.target.checked }
                              }
                            })}
                          />
                          View
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={perms.create}
                            onChange={e => setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [resource]: { ...perms, create: e.target.checked }
                              }
                            })}
                          />
                          Create
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={perms.edit}
                            onChange={e => setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [resource]: { ...perms, edit: e.target.checked }
                              }
                            })}
                          />
                          Edit
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={perms.delete}
                            onChange={e => setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [resource]: { ...perms, delete: e.target.checked }
                              }
                            })}
                          />
                          Delete
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  className="btn-primary"
                  disabled={saveLoading}
                >
                  {saveLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
