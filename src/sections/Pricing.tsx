import { useState } from 'react'
import './Pricing.css'

type ServiceType = 'website' | 'cloud-comms' | 'products' | null
type WebsiteService = 'build' | 'host' | 'maintain' | 'end-to-end' | null

const websiteAddons = [
  { id: 'ecommerce', name: 'E-commerce Integration', price: 500 },
  { id: 'cms', name: 'Content Management System', price: 300 },
  { id: 'seo', name: 'Advanced SEO Package', price: 250 },
  { id: 'analytics', name: 'Analytics Dashboard', price: 200 },
  { id: 'auth', name: 'User Authentication', price: 350 },
  { id: 'api', name: 'Custom API Integration', price: 400 },
  { id: 'multilingual', name: 'Multi-language Support', price: 300 },
  { id: 'blog', name: 'Blog System', price: 200 },
]

export default function Pricing() {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>(null)
  const [websiteService, setWebsiteService] = useState<WebsiteService>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const handleServiceTypeSelect = (type: ServiceType) => {
    setServiceType(type)
    setStep(2)
  }

  const handleWebsiteServiceSelect = (service: WebsiteService) => {
    setWebsiteService(service)
    if (service !== 'end-to-end') {
      setStep(3)
    }
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const calculateTotal = () => {
    let total = 0

    // Base service cost
    if (websiteService === 'build') total += 1500
    else if (websiteService === 'host') total += 25 // monthly
    else if (websiteService === 'maintain') total += 100 // monthly
    else if (websiteService === 'end-to-end') total += 150

    // Add-ons
    selectedAddons.forEach(addonId => {
      const addon = websiteAddons.find(a => a.id === addonId)
      if (addon) total += addon.price
    })

    return total
  }

  const resetQuote = () => {
    setStep(1)
    setServiceType(null)
    setWebsiteService(null)
    setSelectedAddons([])
  }

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-shell">
        <div className="pricing-inner section-inner">
          <header className="pricing-header">
            <h2>c:\DevDussey\Pricing{'>'}<span className="cursor">_</span></h2>
          </header>

          <div className="quote-builder">
            {/* Step 1: Service Type Selection */}
            {step === 1 && (
              <div className="quote-step">
                <h3>What type of service are you seeking?</h3>
                <div className="service-options">
                  <button
                    className="service-option-card"
                    onClick={() => handleServiceTypeSelect('website')}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <h4>Website Services</h4>
                    <p>Custom builds, hosting, and maintenance</p>
                  </button>

                  <button
                    className="service-option-card"
                    onClick={() => handleServiceTypeSelect('cloud-comms')}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <h4>Cloud Communications</h4>
                    <p>SMS, email, and messaging services</p>
                  </button>

                  <button
                    className="service-option-card"
                    onClick={() => handleServiceTypeSelect('products')}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <h4>Products</h4>
                    <p>Browse our ready-made solutions</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Website Service Selection */}
            {step === 2 && serviceType === 'website' && (
              <div className="quote-step">
                <h3>Choose your website service</h3>
                <div className="service-options">
                  <button
                    className="service-option-card small"
                    onClick={() => handleWebsiteServiceSelect('build')}
                  >
                    <h4>Build</h4>
                    <p className="price-tag">$1,500 CAD</p>
                    <p>Custom website development</p>
                  </button>

                  <button
                    className="service-option-card small"
                    onClick={() => handleWebsiteServiceSelect('host')}
                  >
                    <h4>Host</h4>
                    <p className="price-tag">$25 CAD/mo</p>
                    <p>Reliable hosting services</p>
                  </button>

                  <button
                    className="service-option-card small"
                    onClick={() => handleWebsiteServiceSelect('maintain')}
                  >
                    <h4>Maintain</h4>
                    <p className="price-tag">$100 CAD/mo</p>
                    <p>Ongoing updates & support</p>
                  </button>

                  <button
                    className="service-option-card small highlighted"
                    onClick={() => handleWebsiteServiceSelect('end-to-end')}
                  >
                    <h4>End to End Package</h4>
                    <p className="price-tag">$150 CAD + monthly</p>
                    <p>Build, host, and maintain all-in-one</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Add-ons Selection */}
            {step === 3 && serviceType === 'website' && (
              <div className="quote-step">
                <h3>Enhance your website with add-ons</h3>
                <div className="addons-grid">
                  {websiteAddons.map(addon => (
                    <label key={addon.id} className={`addon-card ${selectedAddons.includes(addon.id) ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                      />
                      <div className="addon-content">
                        <div className="addon-header">
                          <h4>{addon.name}</h4>
                          <span className="addon-price">+${addon.price}</span>
                        </div>
                        <div className="addon-checkbox">
                          {selectedAddons.includes(addon.id) && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="quote-summary">
                  <div className="price-breakdown">
                    <div className="breakdown-item">
                      <span>Base Service:</span>
                      <span>
                        ${websiteService === 'build' ? '1,500' :
                          websiteService === 'host' ? '25/mo' :
                          websiteService === 'maintain' ? '100/mo' : '150'}
                      </span>
                    </div>
                    {selectedAddons.map(addonId => {
                      const addon = websiteAddons.find(a => a.id === addonId)
                      return addon ? (
                        <div key={addonId} className="breakdown-item">
                          <span>{addon.name}:</span>
                          <span>+${addon.price}</span>
                        </div>
                      ) : null
                    })}
                  </div>
                  <div className="final-price">
                    <span className="price-label">Estimated Total:</span>
                    <span className="price-amount">${calculateTotal()} CAD</span>
                    {(websiteService === 'host' || websiteService === 'maintain') && (
                      <span className="price-note">/month</span>
                    )}
                  </div>
                  <p className="disclaimer">*This is a rough estimate. Final pricing may vary based on project complexity.</p>
                  <div className="quote-actions">
                    <button className="btn-secondary" onClick={resetQuote}>Start Over</button>
                    <a href="/contact" className="btn-primary">Proceed to Contact</a>
                  </div>
                </div>
              </div>
            )}

            {/* End-to-End Package Summary */}
            {websiteService === 'end-to-end' && step === 2 && (
              <div className="quote-step">
                <div className="quote-summary">
                  <h3>End to End Package Selected</h3>
                  <p>Complete website solution: build, host, and maintain</p>
                  <div className="package-details">
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Custom website build based on your requirements</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Reliable hosting included</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Ongoing maintenance and updates</span>
                    </div>
                  </div>
                  <div className="final-price">
                    <span className="price-label">Starting at:</span>
                    <span className="price-amount">${calculateTotal()} CAD</span>
                    <span className="price-note">+ monthly maintenance fee</span>
                  </div>
                  <p className="disclaimer">*Final pricing depends on website size and complexity.</p>
                  <div className="quote-actions">
                    <button className="btn-secondary" onClick={resetQuote}>Start Over</button>
                    <a href="/contact" className="btn-primary">Proceed to Contact</a>
                  </div>
                </div>
              </div>
            )}

            {/* Cloud Communications Summary */}
            {step === 2 && serviceType === 'cloud-comms' && (
              <div className="quote-step">
                <div className="quote-summary">
                  <h3>Cloud Communications Services</h3>
                  <p>Powerful SMS, email, and messaging solutions for your business</p>
                  <div className="package-details">
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Mass SMS messaging and notification systems</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Email campaign management</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Subscription and opt-in management</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Analytics and delivery tracking</span>
                    </div>
                  </div>
                  <div className="final-price">
                    <span className="price-label">Pricing:</span>
                    <span className="price-amount">Custom Quote</span>
                  </div>
                  <p className="disclaimer">*Contact us for volume-based pricing tailored to your needs.</p>
                  <div className="quote-actions">
                    <button className="btn-secondary" onClick={resetQuote}>Start Over</button>
                    <a href="/contact" className="btn-primary">Get a Quote</a>
                  </div>
                </div>
              </div>
            )}

            {/* Products Redirect */}
            {step === 2 && serviceType === 'products' && (
              <div className="quote-step">
                <div className="quote-summary">
                  <h3>Browse Our Products</h3>
                  <p>Explore our catalog of ready-made solutions and tools</p>
                  <div className="package-details">
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Pre-built software solutions</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Professional templates and themes</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Development tools and plugins</span>
                    </div>
                    <div className="detail-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Licensing and support included</span>
                    </div>
                  </div>
                  <div className="quote-actions">
                    <button className="btn-secondary" onClick={resetQuote}>Start Over</button>
                    <a href="/products" className="btn-primary">View Products</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
