import './CurrentProjects.css'

const activeProjects = [
  {
    name: 'LaunchPad OS',
    summary: 'Operations dashboard giving founders a single source of truth for KPIs, forecasts, and stakeholder updates.',
    status: 'In build',
    eta: 'Beta ships November 2025',
    highlights: ['Realtime financial modeling', 'Role-based access with audit trails', 'AI assisted weekly briefs'],
  },
  {
    name: 'Glacier Commerce',
    summary: 'Composable storefront framework for premium outdoor retailers focused on story-driven shopping.',
    status: 'Discovery',
    eta: 'Design sprint December 2025',
    highlights: ['Headless commerce stack', 'Personalized product storytelling', 'Integrated loyalty experiences'],
  },
  {
    name: 'Signal Team',
    summary: 'Communication toolkit for remote teams combining async updates with mindful meeting cadences.',
    status: 'Prototype',
    eta: 'Pilot cohort January 2026',
    highlights: ['Dynamic agenda builder', 'Templated retros & check-ins', 'Usage analytics & sentiment'],
  },
]

export default function CurrentProjects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-shell">
        <div className="projects-inner section-inner">
          <div className="projects-media" aria-hidden="true">
            <img src="/DevDusseyProjects.gif" alt="DevDussey projects" loading="lazy" />
          </div>

          <header className="projects-header">
            <h2>Active Builds & Experiments</h2>
            <p>
              A look at what is currently in motion. Each project pairs strategy sessions, product design, and engineering execution to keep momentum high.
            </p>
          </header>

          <div className="projects-grid">
            {activeProjects.map((project) => (
              <article key={project.name} className="project-card">
                <div className="project-card-header">
                  <h3>{project.name}</h3>
                  <span className="project-status">{project.status}</span>
                </div>
                <p className="project-summary">{project.summary}</p>
                <ul>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="project-eta">{project.eta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
