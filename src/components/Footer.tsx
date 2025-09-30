import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src="/NewLogo.png" alt="DevDussey" className="footer-logo" style={{height: '50px'}} />
          <p className="footer-tagline">Crafting Digital Excellence</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <nav className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="footer-social">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Admin</h3>
          <Link to="/admin/login" className="admin-login-btn">
            <span className="admin-icon">🔐</span>
            Admin Login
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} DevDussey. All rights reserved.</p>
      </div>
    </footer>
  )
}
