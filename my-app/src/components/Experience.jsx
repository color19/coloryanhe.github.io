const stats = [
  { num: '1', text: 'published paper: the lead article in the first issue of JRAFE, the Johns Hopkins journal of graduate research in applied and financial economics.' },
  { num: '4.0', text: 'GPA, M.S. in Financial Economics at Johns Hopkins.' },
  { num: '4', text: 'roles in finance and research, from Huatai’s bond desk to State Street and AfriLabs.' },
  { num: '30', text: 'versions of Studyroom, rebuilt around how I actually study.' },
]

/* Most recent first. Facts follow her current resume. The ids are link
   targets for the toolkit section. */
const roles = [
  {
    id: 'work-afrilabs',
    firm: 'AfriLabs · Connect Deal Room',
    title: 'Market & Venture Intelligence Intern',
    when: 'Jun 2026 – now · Remote',
    desc: 'Tracking private-market deal flow for a pan-African investment platform: SQL, Python and Power BI pipelines that follow each deal from sourcing to close, and recurring intelligence briefs for investor matching.',
    tools: 'SQL · Python · Power BI',
  },
  {
    id: 'work-pipelines',
    firm: 'State Street',
    title: 'Analytics & Operations Intern, Global Delivery',
    when: 'Jan – Jul 2025 · Hangzhou',
    desc: 'Consolidated 600+ operational checklists into one database with automated validation, replacing manual Excel workflows, and built the Power BI KPI dashboards that senior management used for capacity planning.',
    tools: 'Python · SQL · Power BI',
  },
  {
    id: 'work-fixed-income',
    firm: 'Huatai Securities',
    title: 'Fixed Income Research Intern, Infrastructure Bond Dept.',
    when: 'Jun – Aug 2024 · Shanghai',
    desc: 'Turned 100+ regulatory and policy announcements into event indicators and measured their effect on bond yields with event studies. Stress-tested yields under ±50–200bp curve shifts and wrote issuer credit assessments as investment memos.',
    tools: 'SQL · Bloomberg · R',
  },
  {
    id: 'work-igi',
    firm: 'Institute of Green Investment, CUFE',
    title: 'Research Assistant',
    when: 'Nov 2022 – Jan 2023 · Beijing',
    desc: 'Wrote a 5,500-word report on China’s energy-storage sector: policy incentives, cost trends and investment feasibility. It reached 10,000+ readers and won a Gold Prize in a national university innovation competition.',
    tools: 'Industry research',
  },
]

function Experience() {
  return (
    <section id="experience" className="work paper">
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
            <h2>Experience</h2>
            <span className="hand">most recent first</span>
          </div>
          <ul>
            {roles.map((r) => (
              <li id={r.id} className="work-row" key={r.id} data-reveal>
                <h3>
                  {r.firm}
                  <span className="where">{r.title}</span>
                  <span className="where">{r.when}</span>
                </h3>
                <p>{r.desc}</p>
                <span className="tools">{r.tools}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Experience
