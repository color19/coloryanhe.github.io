/* `fill` letterboxes a screenshot whose shape differs from the 16:10 window,
   in its own page colour, so the whole screen stays visible */
const shots = [
  { src: '/shots/studyroom.png', alt: 'Studyroom: your portfolio is underweight in Ethics, 13.3 points below target', fill: '#f3f5f8' },
  { src: '/shots/runway.jpg', alt: 'Runway, minimal edition: still 2h15m to reach today’s pace across three projects' },
]

function Hero() {
  return (
    <header id="top" className="hero paper">
      <div className="wrap hero-grid">
        <div>
          <p className="hero-cred">
            <span>M.S. Financial Economics, Johns Hopkins</span>
            <span>4.0 GPA</span>
          </p>
          <div className="hero-name">
            <h1>Yan He</h1>
            <span className="hand">call me Color</span>
          </div>
          <p className="hero-statement">
            I model markets, build tools that think like an analyst, and make
            finance a little less grey.
          </p>
          <p className="hero-sub">
            This is where I put the work: the research, the roles, and the AI
            tools I&rsquo;ve built and actually use.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Résumé (PDF) <span aria-hidden="true">↗</span>
            </a>
            <a className="btn btn-text" href="mailto:yanhe2026@gmail.com">yanhe2026@gmail.com</a>
          </div>
          <p className="hero-open eyebrow">Graduating December 2026 · open to investment banking, research &amp; quant roles</p>
        </div>

        <div className="hero-window-wrap">
          <div className="hero-window">
            {shots.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                style={s.fill ? { objectFit: 'contain', background: s.fill } : undefined}
              />
            ))}
          </div>
          <a href="#projects" className="hand hero-window-note">
            tools I built and use &darr;
          </a>
        </div>
      </div>
    </header>
  )
}

export default Hero
