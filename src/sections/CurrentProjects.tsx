import './CurrentProjects.css'

export default function CurrentProjects() {
  return (
    <section className="current-projects" id="projects">
      <div className="current-projects-container">
        <img src="/DevDusseyAbout.gif" alt="DevDussey Projects" className="projects-gif" />
        <h2>Current Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Coming Soon</h3>
            <p>Exciting new projects in development</p>
          </div>
        </div>
      </div>
    </section>
  )
}
