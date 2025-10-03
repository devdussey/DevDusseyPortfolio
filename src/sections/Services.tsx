import './Services.css'

const services = [
  {
    title: 'End to End Website Builds',
    description: 'You give us your vision, and we do everything else for you, hassle free.',
    bullets: ['From Building to Deployment', 'Maintainenance and Upkeep', '24/7 Support and Securtity', 'Unique Intergrations and Interfaces'],
  },
  {
    title: 'Cloud Texting Services',
    description: 'Component libraries and dashboards that scale with your roadmap.',
    bullets: ['Component audits and refactors', 'Accessibility and usability reviews', 'Design token strategy'],
  },
  {
    title: 'Application Development',
    description: 'Full-stack features from concept through launch and handoff.',
    bullets: ['API architecture with TypeScript', 'Realtime data with Supabase and PostgreSQL', 'Secure auth, billing, and analytics'],
  },
  {
    title: 'Automation & Tooling',
    description: 'Streamlined internal workflows that keep teams moving fast.',
    bullets: ['Workflow automation and scripts', 'Low-code integrations and Zapier', 'Internal dashboards and reporting'],
  },
  {
    title: 'Maintenance Retainers',
    description: 'Proactive monitoring and iteration for ongoing product health.',
    bullets: ['CI/CD, observability, and testing', 'Quarterly strategy reviews', 'Dedicated support channel'],
  },
  {
    title: 'Launch Strategy',
    description: 'Marketing campaigns, landing pages, and content plans.',
    bullets: ['Launch asset production', 'Email and social rollout support', 'Conversion tracking and insights'],
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-shell">
        <div className="services-inner section-inner">
          <div className="services-media" aria-hidden="true">
            <img src="/DevDusseyServices.gif" alt="DevDussey services" loading="lazy" />
          </div>

          <header className="services-header">
            <h2>Services built for growing teams</h2>
            <p>
              Every engagement is shaped around clarity, measurable results, and transparency. Choose a roadmap that fits your launch, then iterate together.
            </p>
          </header>

          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
