import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

type TabType = 'photos' | 'forms' | 'settings'

const mockForms = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Interested in building a new e-commerce website for my business.',
    date: '2025-10-03',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@company.com',
    message: 'Need help with cloud communication services for SMS campaigns.',
    date: '2025-10-02',
  },
]

const imageCategories = [
  { id: 'hero', label: 'Hero Section', current: '/DevDusseyHome.gif' },
  { id: 'about', label: 'About Section', current: '/DevDusseyAbout.gif' },
  { id: 'services', label: 'Services Carousel', images: ['/service1.jpg', '/service2.jpg', '/service3.jpg', '/service4.jpg', '/service5.jpg', '/service6.jpg'] },
  { id: 'portfolio', label: 'Portfolio Projects', images: ['/portfolio-ecommerce.jpg', '/portfolio-saas.jpg', '/portfolio-service.jpg', '/portfolio-community.jpg'] },
  { id: 'projects', label: 'Current Projects', current: '/DevDusseyProjects.gif' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('photos')
  const [selectedCategory, setSelectedCategory] = useState(imageCategories[0].id)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = sessionStorage.getItem('adminAuth')
    if (!isAuth) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <h1>c:\DevDussey\Admin{'>'}<span className="cursor">_</span></h1>
            <p>Manage your portfolio content and view submissions</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Photo Manager
          </button>
          <button
            className={`admin-tab ${activeTab === 'forms' ? 'active' : ''}`}
            onClick={() => setActiveTab('forms')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Form Submissions
          </button>
          <button
            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
            </svg>
            Settings
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'photos' && (
            <div className="photo-manager">
              <div className="category-sidebar">
                <h3>Categories</h3>
                {imageCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="photo-content">
                {imageCategories.find(c => c.id === selectedCategory)?.current && (
                  <div className="photo-item">
                    <img
                      src={imageCategories.find(c => c.id === selectedCategory)?.current}
                      alt={imageCategories.find(c => c.id === selectedCategory)?.label}
                    />
                    <div className="photo-actions">
                      <button className="btn-replace">Replace Image</button>
                      <input type="file" accept="image/*" style={{ display: 'none' }} />
                    </div>
                  </div>
                )}

                {imageCategories.find(c => c.id === selectedCategory)?.images && (
                  <div className="photo-grid">
                    {imageCategories.find(c => c.id === selectedCategory)?.images?.map((img, idx) => (
                      <div key={idx} className="photo-grid-item">
                        <img src={img} alt={`Item ${idx + 1}`} />
                        <button className="btn-replace-small">Replace</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="form-submissions">
              <div className="submissions-header">
                <h3>Contact Form Submissions</h3>
                <span className="submission-count">{mockForms.length} total submissions</span>
              </div>

              <div className="submissions-list">
                {mockForms.map(form => (
                  <div key={form.id} className="submission-card">
                    <div className="submission-header">
                      <div>
                        <h4>{form.name}</h4>
                        <p className="submission-email">{form.email}</p>
                      </div>
                      <span className="submission-date">{form.date}</span>
                    </div>
                    <p className="submission-message">{form.message}</p>
                    <div className="submission-actions">
                      <button className="btn-reply">Reply</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-settings">
              <h3>Admin Settings</h3>
              <div className="settings-section">
                <h4>Email Notifications</h4>
                <label className="setting-item">
                  <input type="checkbox" defaultChecked />
                  <span>Receive email for new form submissions</span>
                </label>
                <label className="setting-item">
                  <input type="checkbox" />
                  <span>Daily summary of submissions</span>
                </label>
              </div>

              <div className="settings-section">
                <h4>Site Configuration</h4>
                <div className="setting-field">
                  <label>Contact Email</label>
                  <input type="email" defaultValue="devdussey@gmail.com" />
                </div>
                <div className="setting-field">
                  <label>Response Time Display</label>
                  <input type="text" defaultValue="Under 24 hours" />
                </div>
              </div>

              <button className="btn-save-settings">Save Settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
