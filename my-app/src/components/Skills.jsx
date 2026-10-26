/* Capabilities, grouped and listed plainly. The work above carries the
   proof, so there are no bars or ratings here. */

const GROUPS = [
  ['Data and code', ['Python', 'SQL', 'R', 'Stata', 'SAS', 'WRDS: Compustat, CRSP', 'Bloomberg', 'Excel']],
  ['Methods', ['Regression and econometrics', 'Factor models: PCA, GRS, Fama–MacBeth', 'Credit scoring', 'Dynamic models, solved numerically', 'Network analysis']],
  ['Finance', ['Credit risk', 'Fixed income', 'DCF valuation', 'Financial statement analysis', 'Research writing']],
  ['Building', ['Data visualization', 'Power BI', 'Single-file web apps', 'Claude Code, Cursor', 'Git, LaTeX']],
]

function Skills() {
  return (
    <div className="skills" id="skills">
      <div className="work-list-head" data-reveal>
        <h2>Capabilities</h2>
        <span className="hand">the work above is the proof</span>
      </div>
      <div className="caps" data-reveal>
        {GROUPS.map(([name, items]) => (
          <div key={name} className="caps-col">
            <p className="eyebrow">{name}</p>
            <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="skills-foot">
        <span>Mandarin (native) · English (professional)</span>
        <span>CFA Level I candidate, exam November 2026</span>
      </p>
    </div>
  )
}

export default Skills
