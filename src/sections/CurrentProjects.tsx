import './CurrentProjects.css'

const activeProjects = [
  {
    name: 'AI-Driven Anti-Virus Software',
    summary: 'Next-generation threat detection powered by machine learning, delivering enterprise-grade protection with a lightweight, clean interface.',
    status: 'Early Development',
    eta: 'Alpha testing Q2 2026',
    highlights: [
      'Real-time behavioral analysis detecting zero-day threats before signature updates',
      'Predictive threat modeling using neural networks trained on global attack patterns',
      'Autonomous quarantine and remediation with minimal user intervention',
      'Resource-efficient scanning that adapts to system load and usage patterns'
    ],
  },
]

export default function CurrentProjects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-shell">
        <div className="projects-inner section-inner">
          <header className="projects-header">
            <h2>c:\DevDussey\Projects{'>'}<span className="cursor">_</span></h2>
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
