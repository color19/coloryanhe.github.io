const projects = [
  {
    accent: 'r',
    icon: '\uD83D\uDCCA',
    type: 'Data Visualization',
    title: 'Power BI Dashboard',
    desc: 'Interactive business intelligence dashboard built to surface operational insights. Designed for clarity \u2014 every chart earns its place.',
    tags: ['Power BI', 'DAX', 'Data Modeling'],
  },
  {
    accent: 'g',
    icon: '\uD83D\uDCC8',
    type: 'Financial Modeling',
    title: 'Financial Model',
    desc: 'A comprehensive financial model built from first principles. Forecasting, valuation, and scenario analysis \u2014 all in one rigorous framework.',
    tags: ['Excel', 'DCF', 'Scenario Analysis'],
  },
  {
    accent: 'b',
    icon: '\uD83C\uDFE6',
    type: 'Fixed Income Research',
    title: 'Fixed Income Research',
    desc: 'Research produced during internship at a Chinese brokerage firm. Analysis of bond markets, yield dynamics, and macro implications.',
    tags: ['Bloomberg', 'R', 'Fixed Income'],
  },
  {
    accent: 'v',
    icon: '\uD83E\uDDEE',
    type: 'Quantitative Finance',
    title: 'Credit Scorecard Model',
    desc: 'Logistic regression-based credit scorecard using Weight of Evidence and Information Value methodology. Academic project, production-grade rigor.',
    tags: ['Python', 'Logistic Regression', 'WOE/IV'],
  },
  {
    accent: 'o',
    icon: '\uD83D\uDD01',
    type: 'Data Engineering',
    title: 'Data Pipeline (State Street)',
    desc: 'Operational data pipeline work during internship at State Street. Automating data flows and improving reliability at scale.',
    tags: ['SQL', 'Python', 'Operations'],
  },
  {
    accent: 'y',
    icon: '\uD83D\uDCC9',
    type: 'Econometrics',
    title: 'Panel Data Analysis',
    desc: 'Fixed effects and panel data econometrics. Rigorous methodology applied to real economic questions \u2014 the kind of work that holds up to scrutiny.',
    tags: ['R', 'Fixed Effects', 'Econometrics'],
  },
]

function Portfolio() {
  return (
    <section id="work">
      <div className="section-header scroll-reveal">
        <span className="section-num">01</span>
        <h2>Selected Work</h2>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <div className="portfolio-card scroll-reveal" key={project.title}>
            <div className={`card-accent ${project.accent}`} />
            <span className="card-icon">{project.icon}</span>
            <div className="card-type">{project.type}</div>
            <div className="card-title">{project.title}</div>
            <div className="card-desc">{project.desc}</div>
            <div className="card-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
            <a href="#" className="card-link">View Project &rarr;</a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio
