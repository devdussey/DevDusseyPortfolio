import './Portfolio.css'

const projects = [
  {
    title: 'Dusscord',
    description: 'Community-first messaging with custom moderation workflows and playful branding.',
    image: '/DusscordBlackBanner.png',
    tags: ['Brand Identity', 'Realtime Chat', 'Design System'],
  },
  {
    title: 'Gawels Green',
    description: 'Sustainable commerce built with a storytelling-driven product catalogue.',
    image: '/GawelsGreenBanner.png',
    tags: ['E-commerce', 'Animations', 'Conversion Optimization'],
  },
  {
    title: 'Landing Suite',
    description: 'High-performing landing page templates tuned for rapid marketing experiments.',
    image: '/LAndingPAge copy.png',
    tags: ['Marketing', 'UI Toolkit', 'A/B Testing'],
  },
]

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-shell">
        <div className="portfolio-inner section-inner">
          <div className="portfolio-media" aria-hidden="true">
            <img src="/DevDusseyPortfolio.gif" alt="DevDussey portfolio" loading="lazy" />
          </div>

          <header className="portfolio-header">
            <h2>Selected Work</h2>
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
