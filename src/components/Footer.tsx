import { Link } from 'react-router-dom'
import './Footer.css'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { label: 'Discord', href: 'https://discord.com' },
  { label: 'GitHub', href: 'https://github.com/devdussey' },
  { label: 'Facebook', href: 'https://facebook.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/DevDusseyLogo2.svg" alt="DevDussey" className="footer-logo" />
            <p className="footer-tagline">Crafting digital experiences that feel premium and perform flawlessly.</p>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>
            <nav>
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-links">
            <h3>Connect</h3>
            <div className="footer-social">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h3>Admin</h3>
            <Link to="/admin/login" className="admin-login-btn">
              Admin Login
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} DevDussey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
