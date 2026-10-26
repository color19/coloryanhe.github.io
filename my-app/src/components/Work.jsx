import ResearchBDC from './ResearchBDC'
import ResearchRCK from './ResearchRCK'
import ResearchScorecard from './ResearchScorecard'

const stats = [
  { num: '4', text: 'internships, from a brokerage’s bond research desk to State Street’s data pipelines.' },
  { num: '4.0', text: 'GPA, M.S. in Financial Economics at Johns Hopkins.' },
  { num: '30', text: 'versions of Studyroom, rebuilt around how I actually study.' },
]

const work = [
  {
    title: 'Fixed Income Research',
    where: 'Internship · Chinese brokerage',
    desc: 'Bond market analysis: yield dynamics and what they say about the macro picture.',
    tools: 'Bloomberg · R',
  },
  {
    title: 'Operational Data Pipelines',
    where: 'Internship · State Street',
    desc: 'Automated the data flows operations teams depend on, and made them fail less.',
    tools: 'SQL · Python',
  },
  {
    title: 'Empirical Asset Pricing',
    where: 'Four problem sets · team of two',
    desc: 'On 30 industry portfolios, 1963–2024, the top five principal components pass the GRS test (F = 0.86) where Fama–French five is rejected (F = 2.79). Also: mean–variance frontiers, rating-migration Markov chains, and fund-network systemic risk.',
    tools: 'Python · SAS · WRDS',
  },
  {
    title: 'Panel Data Econometrics',
    where: 'Coursework',
    desc: 'Fixed effects, IV, and difference-in-differences on real economic questions.',
    tools: 'R · Stata',
  },
  {
    title: 'Financial Model',
    where: 'Academic project',
    desc: 'Forecasting, DCF valuation, and scenario analysis in one framework.',
    tools: 'Excel',
  },
  {
    title: 'Operations Dashboard',
    where: 'Project',
    desc: 'An interactive BI dashboard where every chart has to earn its place.',
    tools: 'Power BI · DAX',
  },
]

function Work() {
  return (
    <section id="work" className="work paper">
      <div className="wrap">
        <h2 className="work-title" data-reveal>New grad. Not new to the work.</h2>

        <div className="work-stats">
          {stats.map((s) => (
            <div className="work-stat" key={s.num} data-reveal>
              <div className="num">{s.num}</div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="research-section-head" data-reveal>
          <h2>Research</h2>
          <span className="hand">hover the charts, they&rsquo;re live</span>
        </div>
        <ResearchScorecard />
        <ResearchBDC />
        <ResearchRCK />

        <div className="work-list">
          <div className="work-list-head" data-reveal>
            <h2>The finance work</h2>
            <span className="hand">samples &amp; details on request</span>
          </div>
          <ul>
            {work.map((w) => (
              <li className="work-row" key={w.title} data-reveal>
                <h3>
                  {w.title}
                  <span className="where">{w.where}</span>
                </h3>
                <p>{w.desc}</p>
                <span className="tools">{w.tools}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Work
