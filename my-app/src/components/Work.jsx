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
    title: 'Credit Scorecard',
    where: 'Academic project',
    desc: 'Logistic-regression scorecard built with Weight of Evidence and Information Value.',
    tools: 'Python · WOE/IV',
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
