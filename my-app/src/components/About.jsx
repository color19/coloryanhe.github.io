const skills = [
  { name: 'Financial Modeling', width: '90%', color: 'var(--r)' },
  { name: 'Python / Data Analysis', width: '85%', color: 'var(--o)' },
  { name: 'Power BI', width: '80%', color: 'var(--y)' },
  { name: 'R / Econometrics', width: '82%', color: 'var(--g)' },
  { name: 'Bloomberg Terminal', width: '75%', color: 'var(--b)' },
  { name: 'Fixed Income Research', width: '78%', color: 'var(--v)' },
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
          {skills.map((skill) => (
            <li className="skill-item" key={skill.name} style={{ '--skill-color': skill.color }}>
              <span className="skill-name">{skill.name}</span>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: skill.width, background: skill.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
