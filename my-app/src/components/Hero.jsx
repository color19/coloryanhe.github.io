function Hero() {
  return (
    <section className="hero" data-section="hero">
      <div className="hero-bg" />

      <div className="hero-content">
        <p className="hero-tag">
          Financial Economics &middot; Johns Hopkins University
        </p>
        <h1 className="hero-title">
          <span className="hero-line">Finance.</span>
          <span className="hero-line"><em>Colorfully.</em></span>
        </h1>
        <p className="hero-desc">
          I&rsquo;m Yan &mdash; a financial economist who believes data should be
          beautiful, models should be rigorous, and work should speak for itself.
          I build dashboards, financial models, and research that actually get used.
        </p>
        <div className="hero-ctas">
          <a href="#work" className="btn btn-primary magnetic">
            <span className="btn-label">View My Work</span>
            <span className="btn-arrow" aria-hidden="true">&darr;</span>
          </a>
          <a href="#contact" className="btn btn-ghost magnetic">
            <span className="btn-label">Get In Touch</span>
          </a>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          <span>Bloomberg</span><span>·</span>
          <span>Power BI</span><span>·</span>
          <span>Python</span><span>·</span>
          <span>R</span><span>·</span>
          <span>SQL</span><span>·</span>
          <span>Stata</span><span>·</span>
          <span>Fixed Income</span><span>·</span>
          <span>Credit Risk</span><span>·</span>
          <span>Econometrics</span><span>·</span>
          <span>Bloomberg</span><span>·</span>
          <span>Power BI</span><span>·</span>
          <span>Python</span><span>·</span>
          <span>R</span><span>·</span>
          <span>SQL</span><span>·</span>
          <span>Stata</span><span>·</span>
          <span>Fixed Income</span><span>·</span>
          <span>Credit Risk</span><span>·</span>
          <span>Econometrics</span><span>·</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
