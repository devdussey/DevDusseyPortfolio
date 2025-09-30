import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{fontSize: '24px', fontWeight: 'bold', color: '#00d4ff'}}>
          DevDussey
        </Link>
        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
