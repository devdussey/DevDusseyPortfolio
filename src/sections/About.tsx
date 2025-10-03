import { motion } from 'framer-motion'
import './About.css'

const story = [
  "At DevDussey, the focus is on building experiences that are both beautiful and bulletproof.",
  "Every engagement starts with aligned strategy, a design language that feels bespoke, and an engineering approach that keeps future iterations painless.",
  "From startups searching for product-market fit to established teams scaling platforms, DevDussey becomes the partner who can translate vision into production-ready software."
]

const skills = [
  {
    title: 'Interface Engineering',
    description: 'React, Next.js, TypeScript, motion design',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <circle cx="8" cy="6" r="1.5" />
        <circle cx="8" cy="12" r="1.5" />
        <circle cx="8" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Systems & APIs',
    description: 'Node.js, Supabase, PostgreSQL, edge deployments',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2L3 7l9 5 9-5-9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: 'Product Design',
    description: 'Design systems, accessibility, user testing',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16v16H4z" />
        <path d="M4 10h16" />
        <path d="M10 4v16" />
      </svg>
    ),
  },
  {
    title: 'DevOps & QA',
    description: 'CI/CD, monitoring, Playwright and Cypress audits',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-shell">
        <motion.div
          className="about-inner section-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-media" aria-hidden="true">
            <img src="/DevDusseyAbout.gif" alt="DevDussey about" loading="lazy" />
          </div>

          <div className="about-content">
            <h2>About DevDussey</h2>
            <div className="about-text">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <article key={skill.title} className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
