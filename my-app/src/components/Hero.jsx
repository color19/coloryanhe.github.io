function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="spectrum" />

      <div className="hero-content">
        <p className="hero-tag fade-up delay-1">
          Financial Economics &middot; Johns Hopkins University
        </p>
        <h1 className="fade-up delay-2">
          Finance.<br />
          <em>Colorfully.</em>
        </h1>
        <p className="hero-desc fade-up delay-3">
          I&rsquo;m Yan &mdash; a financial economist who believes data should be
          beautiful, models should be rigorous, and work should speak for itself.
          I build dashboards, financial models, and research that actually get used.
        </p>
        <div className="hero-ctas fade-up delay-4">
          <a href="#work" className="btn btn-primary">
            View My Work &darr;
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
