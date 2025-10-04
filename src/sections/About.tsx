import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import './About.css'

const story = [
  "At DevDussey, the focus is on building experiences that are both beautiful and bulletproof.",
  "Every engagement starts with aligned strategy, a design language that feels bespoke, and an engineering approach that keeps future iterations painless.",
  "From startups searching for product-market fit to established teams scaling platforms, DevDussey becomes the partner who can translate vision into production-ready software."
]

const commands: Record<string, string> = {
  help: `Available commands:
  • whoami        - Learn about DevDussey
  • skills        - View technical expertise
  • projects      - See portfolio highlights
  • contact       - Get in touch
  • clear         - Clear terminal`,
  whoami: `DevDussey
Full-stack developer specializing in modern web applications.
Building scalable solutions with React, TypeScript, and Node.js.
Based on passion for clean code and great UX.`,
  skills: `Technical Stack:
  Frontend: React, Next.js, TypeScript, Framer Motion
  Backend: Node.js, Supabase, PostgreSQL
  DevOps: CI/CD, Docker, Netlify, Vercel
  Design: Figma, Adobe Creative Suite`,
  projects: `Featured Work:
  • E-commerce Platform - Full-stack Next.js application
  • Portfolio Sites - Custom React builds for clients
  • API Services - RESTful backends with Node.js

  Visit /portfolio to see more!`,
  contact: `Let's Connect:
  📧 Email: contact@devdussey.com
  💼 GitHub: github.com/devdussey
  🔗 LinkedIn: linkedin.com/in/devdussey

  Or visit /contact page to send a message!`,
}

export default function About() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
    { type: 'output', content: 'Welcome to DevDussey Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.\n' },
  ])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === 'clear') {
      setHistory([])
      return
    }

    const output = commands[trimmedCmd] || `Command not found: ${cmd}\nType "help" for available commands.`

    setHistory([...history, { type: 'input', content: cmd }, { type: 'output', content: output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }
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
          <div className="about-content">
            <h2>c:\DevDussey\About{'>'}<span className="cursor">_</span></h2>
            <div className="about-text">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="terminal-container">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot red"></span>
                  <span className="control-dot yellow"></span>
                  <span className="control-dot green"></span>
                </div>
                <div className="terminal-title">devdussey@terminal ~ %</div>
              </div>
              <div className="terminal-body">
                {history.map((entry, index) => (
                  <div key={index} className={`terminal-line ${entry.type}`}>
                    {entry.type === 'input' ? (
                      <div>
                        <span className="terminal-prompt">$</span> {entry.content}
                      </div>
                    ) : (
                      <pre>{entry.content}</pre>
                    )}
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="terminal-input-line">
                  <span className="terminal-prompt">$</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="terminal-input"
                    placeholder="Type 'help' for commands..."
                    autoFocus
                  />
                </form>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
