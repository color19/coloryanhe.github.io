import { useEffect, useState } from 'react'

const links = [
  { id: 'top', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="nav" aria-label="Primary">
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className={active === l.id ? 'is-active' : undefined}
          aria-current={active === l.id ? 'true' : undefined}
        >
          {l.label}
        </a>
      ))}
      <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        Résumé <span aria-hidden="true">↗</span>
      </a>
    </nav>
  )
}

export default Navbar
