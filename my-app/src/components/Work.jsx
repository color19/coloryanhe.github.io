import ResearchBDC from './ResearchBDC'
import ResearchRCK from './ResearchRCK'
import ResearchScorecard from './ResearchScorecard'
import Skills from './Skills'

const work = [
  {
    id: 'work-asset-pricing',
    title: 'Empirical Asset Pricing',
    where: 'Coursework · four problem sets',
    desc: 'On 30 industry portfolios, 1963–2024, the top five principal components pass the GRS test (F = 0.86) where Fama–French five is rejected (F = 2.79). Also: mean–variance frontiers, rating-migration Markov chains, and fund-network systemic risk.',
    tools: 'Python · SAS · WRDS',
  },
  {
    id: 'work-panel',
    title: 'Panel Data Econometrics',
    where: 'Coursework',
    desc: 'Fixed effects, IV, and difference-in-differences on real economic questions.',
    tools: 'R · Stata',
  },
  {
    id: 'work-financial-model',
    title: 'Financial Model',
    where: 'Coursework',
    desc: 'Forecasting, DCF valuation, and scenario analysis in one Excel framework.',
    tools: 'Excel',
  },
  {
    id: 'work-dashboard',
    title: 'Operations Dashboard',
    where: 'Project',
    desc: 'An interactive BI dashboard where every chart has to earn its place.',
    tools: 'Power BI · DAX',
  },
]

function Work() {
  return (
    <section id="research" className="work work-research paper">
      <div className="wrap">
        <div className="research-section-head" data-reveal>
          <h2>Research</h2>
          <span className="hand">hover the charts, they&rsquo;re live</span>
        </div>
        <ResearchScorecard />
        <ResearchBDC />
        <ResearchRCK />

        <div className="work-list">
          <div className="work-list-head" data-reveal>
            <h2>Coursework &amp; projects</h2>
            <span className="hand">the smaller pieces</span>
          </div>
          <ul>
            {work.map((w) => (
              <li id={w.id} className="work-row" key={w.title} data-reveal>
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

        <Skills />
      </div>
    </section>
  )
}

export default Work
