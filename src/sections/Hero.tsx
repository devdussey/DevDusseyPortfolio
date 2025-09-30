import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <img src="/Hero Page.gif" alt="DevDussey Hero" className="hero-gif" />
          <h1 className="hero-title">DevDussey</h1>
          <h2 className="hero-subtitle">Web Developer & Designer</h2>
          <p className="hero-description">
            Creating beautiful, functional websites and applications
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn-primary">Get In Touch</Link>
            <Link to="/portfolio" className="btn-secondary">View Work</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
