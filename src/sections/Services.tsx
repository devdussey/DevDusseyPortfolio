import { useState } from 'react'
import './Services.css'

const services = [
  {
    title: 'End to End Website Builds',
    description: 'You give us your vision, and we do everything else for you, hassle free.',
    bullets: ['From Building to Deployment', 'Maintenance and Upkeep', '24/7 Support and Security', 'Unique Integrations and Interfaces'],
    image: '/service1.jpg', // Add your service images to public folder
  },
  {
    title: 'Cloud Texting Services',
    description: 'Powerful SMS application for mass text messaging — perfect for notifications, subscriptions, and marketing campaigns.',
    bullets: ['Automated notification systems', 'Subscription and opt-in management', 'Marketing campaign delivery', 'Analytics and delivery tracking'],
    image: '/service2.jpg',
  },
  {
    title: 'Application Development',
    description: 'Full-stack features from concept through launch and handoff.',
    bullets: ['API architecture with TypeScript', 'Realtime data with Supabase and PostgreSQL', 'Secure auth, billing, and analytics'],
    image: '/service3.jpg',
  },
  {
    title: 'SEO Optimization',
    description: 'Boost your online visibility and drive organic traffic with comprehensive search engine optimization strategies.',
    bullets: ['Technical SEO and site audits', 'Keyword research and content optimization', 'Performance and speed improvements', 'Local SEO and Google Business optimization'],
    image: '/service4.jpg',
  },
  {
    title: 'Maintenance Retainers',
    description: 'Proactive monitoring and iteration for ongoing product health.',
    bullets: ['CI/CD, observability, and testing', 'Quarterly strategy reviews', 'Dedicated support channel'],
    image: '/service5.jpg',
  },
  {
    title: 'Launch Strategy',
    description: 'Marketing campaigns, landing pages, and content plans.',
    bullets: ['Launch asset production', 'Email and social rollout support', 'Conversion tracking and insights'],
    image: '/service6.jpg',
  },
]

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  const currentService = services[currentIndex]
  return (
    <section className="services-section" id="services">
      <div className="section-shell">
        <div className="services-inner section-inner">
          <header className="services-header">
            <h2>c:\DevDussey\Services{'>'}<span className="cursor">_</span></h2>
            <p>
              Versatile solutions tailored to your needs. Navigate through our offerings and discover how we can elevate your digital presence.
            </p>
          </header>

          <div className="service-carousel">
            <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous service">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="carousel-content">
              <div className="carousel-image">
                <img src={currentService.image} alt={currentService.title} />
                <div className="carousel-overlay"></div>
              </div>

              <div className="carousel-info">
                <h3>{currentService.title}</h3>
                <p className="service-description">{currentService.description}</p>
                <ul>
                  {currentService.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="carousel-indicators">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next service">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <a href="/contact" className="find-out-more-btn">
            Find Out More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
