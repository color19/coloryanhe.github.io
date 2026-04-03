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
        <div className="nav-logo">
          <span className="rainbow">Color(Yan)</span> He
        </div>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
