const shots = [
  { src: '/shots/studyroom.png', alt: 'Studyroom: CFA subjects shown as portfolio holdings against target weights' },
  { src: '/shots/runway.jpg', alt: 'Runway: a calendar that works back from deadlines to a daily pace' },
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
              <img key={s.src} src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
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
