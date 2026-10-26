/* Skills from her current résumés. A skill links only when this page shows
   work that used it; the rest stay plain text. */

const groups = [
  {
    label: 'Finance',
    items: [
      { name: 'Credit scorecards and cutoff analysis', href: '#research-scorecard' },
      { name: 'Financial statement and ratio analysis', href: '#research-bdc' },
      { name: 'Fixed income valuation and risk', href: '#work-fixed-income' },
      { name: 'Financial modeling, DCF', href: '#work-financial-model' },
      { name: 'Investment memos and research writing', href: '#research-rck' },
    ],
  },
  {
    label: 'Quant & econometrics',
    items: [
      { name: 'Panel data: fixed effects, IV, DID', href: '#work-panel' },
      { name: 'Factor models: PCA, GRS, Fama–MacBeth', href: '#work-asset-pricing' },
      { name: 'Dynamic models, solved numerically', href: '#research-rck' },
      { name: 'Event studies' },
      { name: 'Time series' },
    ],
  },
  {
    label: 'Data & programming',
    items: [
      { name: 'Python: pandas, NumPy, scikit-learn, statsmodels', href: '#research-scorecard' },
      { name: 'SQL', href: '#work-pipelines' },
      { name: 'WRDS: Compustat, CRSP', href: '#research-bdc' },
      { name: 'R and Stata', href: '#work-panel' },
      { name: 'Power BI', href: '#work-dashboard' },
      { name: 'Excel: Power Query, pivots, macros', href: '#work-financial-model' },
      { name: 'Bloomberg', href: '#work-fixed-income' },
      { name: 'EViews, Wind, Git' },
    ],
  },
  {
    label: 'AI & building',
    items: [
      { name: 'Apps built end to end with AI agents', href: '#projects' },
      { name: 'Claude Code, Cursor, GitHub Copilot' },
      { name: 'LLM agent workflows with output validation' },
    ],
  },
]

function Skills() {
  return (
    <div className="skills" id="skills">
      <div className="work-list-head" data-reveal>
        <h2>The toolkit</h2>
        <span className="hand">underlined = used on this page</span>
      </div>
      <div className="skills-grid">
        {groups.map((g) => (
          <div className="skills-group" key={g.label} data-reveal>
            <p className="eyebrow">{g.label}</p>
            <ul>
              {g.items.map((it) => (
                <li key={it.name}>
                  {it.href ? (
                    <a href={it.href}>
                      {it.name} <span aria-hidden="true">↘</span>
                    </a>
                  ) : (
                    <span>{it.name}</span>
                  )}
                </li>
              ))}
            </ul>
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
