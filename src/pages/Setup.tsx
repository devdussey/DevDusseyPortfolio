import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Setup.css'

export default function Setup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

      if (signUpError) throw signUpError
      if (!authData.user) throw new Error('No user returned from signup')

      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({
          auth_user_id: authData.user.id,
          email,
          full_name: fullName,
          role: 'super_admin',
          is_active: true,
        })

      if (adminError) throw adminError

      setSuccess(true)
      setTimeout(() => {
        navigate('/admin/login')
      }, 2000)
    } catch (err: any) {
      console.error('Setup error:', err)
      setError(err.message || 'Failed to create admin user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="setup-container">
      <div className="setup-card">
        <div className="setup-header">
          <img src="/DevDusseyCropped.png" alt="DevDussey" className="setup-logo" />
          <h1>First Time Setup</h1>
          <p>Create your super admin account</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Setup Complete!</h2>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSetup} className="setup-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                disabled={loading}
                minLength={6}
              />
              <small>Minimum 6 characters</small>
            </div>

            <button
              type="submit"
              className="setup-button"
              disabled={loading}
            >
              {loading ? 'Creating Admin Account...' : 'Create Super Admin'}
            </button>
          </form>
        )}

        <div className="setup-footer">
          <p>This page is only for first-time setup</p>
        </div>
      </div>
    </div>
  )
}
