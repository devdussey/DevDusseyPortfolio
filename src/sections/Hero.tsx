import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">DevDussey</h1>
          <h2 className="hero-subtitle">Web Developer & Designer</h2>
          <p className="hero-description">
            Creating beautiful, functional websites and applications
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary">Get In Touch</a>
            <a href="#portfolio" className="btn-secondary">View Work</a>
          </div>
        </div>
      </div>
    </section>
  )
}
