import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const socialLinks = [
  { label: 'Discord', href: 'https://discord.com' },
  { label: 'GitHub', href: 'https://github.com/devdussey' },
  { label: 'Facebook', href: 'https://facebook.com' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setStatus('sending')
    // Simulate async request
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3500)
    }, 1000)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-shell">
        <div className="contact-inner section-inner">
          <div className="contact-media" aria-hidden="true">
            <img src="/DevDusseyContact.gif" alt="DevDussey contact" loading="lazy" />
          </div>

          <motion.div
            className="contact-intro"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Let’s plan your next launch</h2>
            <p>
              Share a few details about your idea, and we will map the path from concept to shipped product.
              Expect a thoughtful response within one business day.
            </p>
            <div className="contact-details">
              <div>
                <span className="detail-label">Email</span>
                <span className="detail-value">devdussey@gmail.com</span>
              </div>
              <div>
                <span className="detail-label">Response time</span>
                <span className="detail-value">Under 24 hours</span>
              </div>
            </div>
            <div className="contact-social">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Project overview</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share goals, scope, and any timelines you have in mind."
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message sent!' : 'Send message'}
            </button>

            {status === 'error' && (
              <p className="form-error">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
