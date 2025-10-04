import './Portfolio.css'

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Full-featured online store with product management, shopping cart, secure checkout, and order tracking. Built for scalability and conversion.',
    image: '/portfolio-ecommerce.jpg',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    title: 'SaaS Dashboard',
    description: 'Modern admin panel with analytics, user management, and real-time data visualization. Clean UI with powerful features.',
    image: '/portfolio-saas.jpg',
    tags: ['React', 'TypeScript', 'Chart.js', 'REST API'],
  },
  {
    title: 'Service Company Template',
    description: 'Professional business website with service showcase, testimonials, contact forms, and SEO optimization. Perfect for agencies.',
    image: '/portfolio-service.jpg',
    tags: ['React', 'Framer Motion', 'Responsive', 'SEO Ready'],
  },
  {
    title: 'Community Platform',
    description: 'Interactive community hub with user profiles, messaging, forums, and real-time notifications. Engaging and scalable.',
    image: '/portfolio-community.jpg',
    tags: ['React', 'Supabase', 'Real-time', 'Auth'],
  },
]

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-shell">
        <div className="portfolio-inner section-inner">
          <header className="portfolio-header">
            <h2>c:\DevDussey\Portfolio{'>'}<span className="cursor">_</span></h2>
            <p>
              A snapshot of digital products built to elevate brands and deliver measurable results. Each engagement blends craft, motion, and dependable engineering.
            </p>
          </header>

          <div className="portfolio-grid">
            {projects.map((project) => (
              <article key={project.title} className="portfolio-card">
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="portfolio-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
