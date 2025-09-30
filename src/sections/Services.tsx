import './Services.css'

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">
        <img src="/DevDusseyServices.gif" alt="DevDussey Services" className="services-gif" />
        <h2>Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Web Development</h3>
            <p>Custom websites and web applications built with modern technologies</p>
          </div>
          <div className="service-card">
            <h3>UI/UX Design</h3>
            <p>Beautiful, intuitive interfaces that users love</p>
          </div>
          <div className="service-card">
            <h3>Responsive Design</h3>
            <p>Websites that work perfectly on all devices</p>
          </div>
        </div>
      </div>
    </section>
  )
}
