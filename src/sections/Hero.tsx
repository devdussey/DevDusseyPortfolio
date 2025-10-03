import { Link } from 'react-router-dom'
import './Hero.css'

const features = [
  {
    title: 'UI Engineering',
    description: 'Component-driven interfaces that balance performance with polish.',
  },
  {
    title: 'Full-Stack Delivery',
    description: 'TypeScript-first APIs deployed with fault-tolerant infrastructure.',
  },
  {
    title: 'Launch & Support',
    description: 'Roadmaps, analytics, and iteration to keep every release sharp.',
  },
]

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="section-shell">
        <div className="hero-inner section-inner">
          <div className="hero-media" aria-hidden="true">
            <div className="hero-orb-container">
              <img src="/BlueHero.png" alt="DevDussey hero orb" className="hero-orb" loading="lazy" />
            </div>
          </div>

          <header className="hero-header">
            <h1>c:\DevDussey{'>'}<span className="cursor">_</span></h1>
            <p className="hero-kicker">Design / Development / Delivery</p>
            <p className="hero-subtitle">
              DevDussey partners with brands to craft modern products that feel artisanal, move fast, and stay resilient under scale.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Start a project</Link>
              <Link to="/portfolio" className="btn-secondary">View portfolio</Link>
            </div>
          </header>

          <div className="hero-features">
            {features.map((feature) => (
              <article key={feature.title} className="hero-feature">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

