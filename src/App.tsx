import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Portfolio from './sections/Portfolio'
import CurrentProjects from './sections/CurrentProjects'
import Contact from './sections/Contact'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="app">
      {!isAdminRoute && <Navigation />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/current-projects" element={<CurrentProjects />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute requiredPermission={{ resource: 'projects', action: 'view' }}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/current-projects"
          element={
            <ProtectedRoute requiredPermission={{ resource: 'current_projects', action: 'view' }}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute requiredPermission={{ resource: 'messages', action: 'view' }}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
