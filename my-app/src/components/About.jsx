const skillTiers = [
  {
    tier: 'Advanced',
    color: 'var(--r)',
    items: ['SQL', 'Power BI', 'Stata', 'Bloomberg Terminal', 'Excel / Power Query', 'Git'],
  },
  {
    tier: 'Working Proficiency',
    color: 'var(--y)',
    items: [
      'Python (Pandas, Statsmodels)',
      'R',
      'Panel Econometrics (FE, IV, DID)',
      'Time Series Analysis',
      'Credit Risk Modeling (WOE/IV)',
    ],
  },
  {
    tier: 'Domain',
    color: 'var(--b)',
    items: [
      'Fixed Income Valuation',
      'Credit Analysis',
      'ESG / Sustainable Finance',
      'Macro & Event-Study Research',
    ],
  },
]

function About() {
  return (
    <section id="about" className="about" data-section="about">
      <header className="flow-header">
        <span className="flow-eyebrow">About Me</span>
        <h2 className="flow-title">
          Rigorous, and <em>communicable.</em>
        </h2>
      </header>
      <div className="about-layout">
        <div className="about-text">
          <p>
            I&rsquo;m <strong>Yan (Color) He</strong>, a graduate student in
            Financial Economics at Johns Hopkins University with a 4.0 GPA and a
            genuine obsession with making finance less grey.
          </p>
          <p>
            My background spans <strong>fixed income research</strong>,{' '}
            <strong>data pipeline engineering</strong>, and{' '}
            <strong>quantitative modeling</strong> &mdash; from the trading desks of
            Chinese brokerage firms to the operational infrastructure of global asset
            managers.
          </p>
          <p>
            I believe the best financial work is rigorous <em>and</em> communicable.
            A model no one understands is just noise. I build things that get used.
          </p>
          <p>
            When I&rsquo;m not in spreadsheets, I&rsquo;m listening to Jay Chou,
            making perler bead art, and probably thinking about my next options trade.
          </p>
        </div>
        <ul className="skills-list">
          {skillTiers.map((tier) => (
            <li className="skill-item" key={tier.tier} style={{ '--skill-color': tier.color }}>
              <span className="skill-tier-label">{tier.tier}</span>
              <ul className="skill-chips">
                {tier.items.map((item) => (
                  <li className="skill-chip" key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
