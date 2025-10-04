import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Simple authentication - in production, use environment variables
    const ADMIN_USERNAME = 'admin'
    const ADMIN_PASSWORD = 'DevDussey2025!'

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store auth token in sessionStorage
      sessionStorage.setItem('adminAuth', 'authenticated')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password')
      setPassword('')
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>c:\DevDussey\Admin\Login{'>'}<span className="cursor">_</span></h1>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="login-info">
            <p>Default credentials:</p>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> DevDussey2025!</p>
            <p className="warning">⚠️ Change these credentials in production!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
