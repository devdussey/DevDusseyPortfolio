import { Link } from 'react-router-dom'
import './Hero.css'

const features = [
  {
    title: 'Design',
    description: 'Share your vision and objectives — we transform them into intuitive, user-centered designs that align with your brand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: 'Build',
    description: 'From concept to code, we develop scalable applications using modern technologies and industry best practices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Deploy',
    description: 'Seamless deployment to production with optimized performance, security configurations, and reliable hosting infrastructure.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        <polyline points="16 16 12 12 8 16" />
      </svg>
    ),
  },
  {
    title: 'Maintain',
    description: 'Ongoing support and updates tailored to your needs — keeping your application current, secure, and performing at its best.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="section-shell">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-orb-container">
            <img src="/OrbBlue.png" alt="DevDussey hero orb" className="hero-orb" loading="lazy" />
          </div>
        </div>

        <div className="hero-inner section-inner">
          <header className="hero-header">
            <h1>c:\DevDussey{'>'}<span className="cursor">_</span></h1>
            <p className="hero-kicker">Design / Development / Delivery</p>
            <p className="hero-subtitle">
              End to end website and application services
            </p>
            <div className="hero-actions">
              <Link to="/pricing" className="btn-primary">Pricing</Link>
              <Link to="/portfolio" className="btn-secondary">Portfolio</Link>
            </div>
          </header>

          <div className="hero-features">
            {features.map((feature, index) => (
              <div key={feature.title} className="feature-wrapper">
                <article className="hero-feature">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
                {index < features.length - 1 && (
                  <div className="feature-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link to="/services" className="hero-learn-more">
            Learn More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

