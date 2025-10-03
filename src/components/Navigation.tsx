import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export default function Navigation() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navigation${isScrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo-btn" aria-label="DevDussey home">
          <img src="/DevDussBannerOfficial.png" alt="DevDussey" />
        </Link>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className="nav-menu">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <li key={link.to}>
                <Link className={isActive ? 'active' : ''} to={link.to}>
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
