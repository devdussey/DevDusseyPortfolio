import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  return (
    <section className="about-section section" id="about">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-content">
          <div className="about-text">
            <p>
              At DevDussey, I specialize in creating custom web solutions that transform businesses. 
              With a focus on modern technologies and user-centered design, we build applications 
              that are not only beautiful but also highly functional and scalable.
            </p>
            <p>
              My approach combines technical expertise with creative problem-solving to deliver 
              solutions that exceed expectations. Whether you're a startup looking to launch your 
              first product or an established business seeking to modernize your digital presence, 
              I am here to help.
            </p>
            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4>Frontend</h4>
                <p>React, TypeScript, Next.js</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4>Backend</h4>
                <p>Node.js, Supabase, PostgreSQL</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h4>Design</h4>
                <p>Figma, UI/UX, Responsive Design</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>DevOps</h4>
                <p>Git, CI/CD, Cloud Deployment</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
