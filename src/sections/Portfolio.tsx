import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container">
        <img src="/DevDusseyPortfolio.gif" alt="DevDussey Portfolio" className="portfolio-gif" />
        <h2>Portfolio</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <img src="/Dusscord.png" alt="Dusscord Project" />
            <h3>Dusscord</h3>
            <p>A modern communication platform</p>
          </div>
        </div>
      </div>
    </section>
  )
}
