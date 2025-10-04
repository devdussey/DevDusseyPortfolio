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
  { label: 'Shopify', href: 'https://shopify.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-grid">
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
        </div>
        <div className="footer-bottom">
          <img src="/Devdussey.png" alt="DevDussey" className="footer-bottom-logo" />
          <p>&copy; {currentYear} DevDussey. All rights reserved.</p>
          <Link to="/admin/login" className="admin-login-btn">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
