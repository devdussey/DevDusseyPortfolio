import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export default function Navigation() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <nav className={`navigation${isScrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/Devdussey.png" alt="DevDussey" />
        </Link>

        <ul className="nav-menu">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            const isContact = link.to === '/contact'
            return (
              <li key={link.to}>
                <Link className={`${isActive ? 'active' : ''} ${isContact ? 'cta-link' : ''}`} to={link.to}>
                  <span className="nav-link-text">{link.label}</span>
                  <span className="nav-link-bg"></span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="nav-datetime">
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          <span className="nav-date">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </nav>
  )
}
