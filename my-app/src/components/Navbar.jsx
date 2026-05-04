import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#work', label: 'Work' },
    { href: '#workspace', label: 'Setup' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <a href="#top" className="nav-logo">
          <span className="rainbow">Color(Yan)</span>
          <span className="nav-logo-tail"> He</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>
                <span className="nav-link-num" aria-hidden="true">
                  ·
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={handleLinkClick}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}

export default Navbar
