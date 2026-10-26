import { useEffect, useState } from 'react'
import PaperArt from './PaperArt'

const NAV = [
  { href: '/#top', label: 'Home' },
  { href: '/#projects', label: 'Projects', active: true },
  { href: '/#work', label: 'Work' },
  { href: '/#contact', label: 'Contact' },
]

export function TopBar() {
  return (
    <>
      <a className="pj-back" href="/#projects">
        <span aria-hidden="true">←</span> Back
      </a>
      <nav className="nav" aria-label="Primary">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={n.active ? 'is-active' : undefined}>
            {n.label}
          </a>
        ))}
      </nav>
    </>
  )
}

/* Small fixed label naming the section in view, like a running head */
export function SectionMarker() {
  const [label, setLabel] = useState(null)

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-marker]')]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setLabel(e.target.dataset.marker || null)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className={`pj-marker${label ? ' is-on' : ''}`} aria-hidden="true">
      <PaperArt kind="mark" size={30} />
      <span>{label}</span>
    </div>
  )
}

const LINKS = [
  [['Home', '/#top'], ['Projects', '/#projects'], ['Work', '/#work']],
  [['Studyroom', '/projects/studyroom/'], ['Runway', 'https://color19.github.io/runway/en/'], ['Research', '/#work']],
  [['yanhe2026@gmail.com', 'mailto:yanhe2026@gmail.com'], ['LinkedIn', 'https://www.linkedin.com/in/colorho/'], ['GitHub', 'https://github.com/color19']],
]

export function ProjectFooter() {
  return (
    <footer className="pj-footer" data-marker="" data-cursor="ink">
      <div className="wrap">
        <p className="pj-footer-big" aria-hidden="true">
          <span>Keep</span>
          <span>compounding.</span>
        </p>
        <div className="pj-footer-grid">
          <p className="pj-footer-blurb">
            Careful thinking compounds. I build tools that turn messy decisions into
            numbers, write the models down, and show the work, including the parts I
            haven&rsquo;t figured out yet.
          </p>
          {LINKS.map((col, i) => (
            <ul key={i}>
              {col.map(([t, href]) => {
                const ext = href.startsWith('http')
                return (
                  <li key={t}>
                    <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{t}</a>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
        <div className="pj-footer-base">
          <span>© 2026 Yan (Color) He</span>
          <a href="#top">Back to the top ↑</a>
        </div>
      </div>
    </footer>
  )
}
