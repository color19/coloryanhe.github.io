import ProjectGlyph from './ProjectGlyph'

const projects = [
  {
    accent: 'r',
    glyph: 'dashboard',
    type: 'Data Visualization',
    title: 'Power BI Dashboard',
    desc: 'Interactive business intelligence dashboard built to surface operational insights. Designed for clarity, every chart earns its place.',
    tags: ['Power BI', 'DAX', 'Data Modeling'],
  },
  {
    accent: 'o',
    glyph: 'pipeline',
    type: 'Data Engineering',
    title: 'Data Pipeline (State Street)',
    desc: 'Operational data pipeline work during internship at State Street. Automating data flows and improving reliability at scale.',
    tags: ['SQL', 'Python', 'Operations'],
  },
  {
    accent: 'y',
    glyph: 'panel',
    type: 'Econometrics',
    title: 'Panel Data Analysis',
    desc: 'Fixed effects and panel data econometrics. Rigorous methodology applied to real economic questions, the kind of work that holds up to scrutiny.',
    tags: ['R', 'Fixed Effects', 'Econometrics'],
  },
  {
    accent: 'g',
    glyph: 'tree',
    type: 'Financial Modeling',
    title: 'Financial Model',
    desc: 'A comprehensive financial model built from first principles. Forecasting, valuation, and scenario analysis in one rigorous framework.',
    tags: ['Excel', 'DCF', 'Scenario Analysis'],
  },
  {
    accent: 'b',
    glyph: 'bond',
    type: 'Fixed Income Research',
    title: 'Fixed Income Research',
    desc: 'Research produced during internship at a Chinese brokerage firm. Analysis of bond markets, yield dynamics, and macro implications.',
    tags: ['Bloomberg', 'R', 'Fixed Income'],
  },
  {
    accent: 'v',
    glyph: 'gauge',
    type: 'Quantitative Finance',
    title: 'Credit Scorecard Model',
    desc: 'Logistic regression-based credit scorecard using Weight of Evidence and Information Value methodology. Academic project, production-grade rigor.',
    tags: ['Python', 'Logistic Regression', 'WOE/IV'],
  },
]

function Portfolio() {
  return (
    <section id="work" className="portfolio" data-section="work">
      <header className="flow-header">
        <span className="flow-eyebrow">Selected Work</span>
        <h2 className="flow-title">
          Six pieces, six colors.
        </h2>
      </header>

      <div className="featured-project">
        <a
          className="featured-media"
          href="https://color19.github.io/studyroom/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the Studyroom live demo"
        >
          <img
            src="/studyroom-home.png"
            alt="Studyroom home screen: CFA subjects shown as portfolio holdings against syllabus target weights"
            loading="lazy"
          />
        </a>
        <div className="featured-body">
          <div className="project-meta">
            <span className="project-type rainbow">Featured · Open Source · Live</span>
          </div>
          <h3 className="project-title">Studyroom</h3>
          <p className="project-desc">
            A single-file study app that treats the CFA curriculum like a
            portfolio: syllabus weights are the target allocation, practiced
            questions are the holdings, and each session is a rebalancing
            trade. Spaced repetition, timed mocks, zero backend &mdash; built
            for my own Level I prep, open-sourced for any multiple-choice exam.
          </p>
          <ul className="project-tags">
            {['MIT Open Source', 'Single-file HTML', 'Spaced Repetition', 'Local-first'].map((tag) => (
              <li className="project-tag" key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="featured-links">
            <a
              href="https://color19.github.io/studyroom/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary magnetic"
            >
              <span className="btn-label">Try It Live</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/color19/studyroom"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost magnetic"
            >
              <span className="btn-label">Source</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <ol className="project-stream">
        {projects.map((p, i) => (
          <li
            className={`project project-${p.accent} ${i % 2 === 0 ? 'is-odd' : 'is-even'}`}
            key={p.title}
            style={{ '--accent': `var(--${p.accent})` }}
          >
            <div className="project-figure">
              <div className="project-numeral" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="project-glyph-wrap">
                <ProjectGlyph kind={p.glyph} />
              </div>
            </div>
            <div className="project-body">
              <div className="project-meta">
                <span className="project-type">{p.type}</span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-tags">
                {p.tags.map((tag) => (
                  <li className="project-tag" key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Portfolio
