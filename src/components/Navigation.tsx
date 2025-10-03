import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export default function Navigation() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

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
        <Link to="/" className="nav-logo" aria-label="DevDussey home">
          <img src="/DevDusseyLogo2.svg" alt="DevDussey" />
        </Link>
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
