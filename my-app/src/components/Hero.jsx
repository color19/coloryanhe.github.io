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
          <p className="eyebrow">Financial Economics · Johns Hopkins · Washington, DC</p>
          <div className="hero-name">
            <h1>Yan He</h1>
            <span className="hand">call me Color</span>
          </div>
          <p className="hero-statement">
            I model markets, build tools that think like an analyst, and make
            finance a little less grey.
          </p>
          <p className="hero-sub">
            This is where I put the work: what I&rsquo;ve built, what I&rsquo;ve
            learned, and what I haven&rsquo;t figured out yet.
          </p>
          <p className="hero-open eyebrow">Open to investment banking, research &amp; quant roles</p>
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
            two tools I built for myself &darr;
          </a>
        </div>
      </div>
    </header>
  )
}

export default Hero
