/* Skills as portfolio holdings: each skill is a position, its size is the
   number of pieces of work on this page that used it, and the works are
   listed beside it as links. Every mapping was checked against the project
   files (code, reports, notebooks). */

const COLS = [
  { key: 'sc', label: 'Credit scorecard', href: '#research-scorecard', group: 'Research' },
  { key: 'bdc', label: 'BDC paper', href: '#research-bdc', group: 'Research' },
  { key: 'rck', label: 'RCK paper', href: '#research-rck', group: 'Research' },
  { key: 'study', label: 'Studyroom', href: '#project-studyroom', group: 'Built' },
  { key: 'runway', label: 'Runway', href: '#project-runway', group: 'Built' },
  { key: 'bond', label: 'Bond research', href: '#work-fixed-income', group: 'Internships' },
  { key: 'ss', label: 'State Street', href: '#work-pipelines', group: 'Internships' },
  { key: 'ap', label: 'Asset pricing', href: '#work-asset-pricing', group: 'Coursework' },
  { key: 'panel', label: 'Panel data', href: '#work-panel', group: 'Coursework' },
  { key: 'dcf', label: 'Financial model', href: '#work-financial-model', group: 'Coursework' },
  { key: 'dash', label: 'Dashboard', href: '#work-dashboard', group: 'Coursework' },
]

const BY_KEY = Object.fromEntries(COLS.map((c) => [c.key, c]))

const HOLDINGS = [
  ['Python', 'Data', ['sc', 'bdc', 'rck', 'ss', 'ap']],
  ['Data visualization', 'Method', ['bdc', 'rck', 'study', 'ap', 'dash']],
  ['Regression and econometrics', 'Method', ['sc', 'bdc', 'ap', 'panel']],
  ['SQL', 'Data', ['bdc', 'ss']],
  ['Credit risk', 'Finance', ['sc', 'bdc']],
  ['Research writing', 'Finance', ['bdc', 'rck']],
  ['R', 'Data', ['bond', 'panel']],
  ['Single-file web apps', 'Building', ['study', 'runway']],
  ['WRDS: Compustat, CRSP', 'Data', ['bdc']],
  ['Factor models: PCA, GRS, Fama–MacBeth', 'Method', ['ap']],
  ['Excel and DCF valuation', 'Finance', ['dcf']],
  ['Bloomberg and fixed income', 'Finance', ['bond']],
]

const MAX = Math.max(...HOLDINGS.map((h) => h[2].length))

function Skills() {
  return (
    <div className="skills" id="skills">
      <div className="work-list-head" data-reveal>
        <h2>Holdings: where my skills are invested</h2>
        <span className="hand">bigger position, more work behind it</span>
      </div>

      <div className="hold-head" aria-hidden="true">
        <span>Skill</span>
        <span>Position</span>
        <span>Invested in</span>
      </div>
      <ol className="hold-list">
        {HOLDINGS.map(([name, kind, used], i) => (
          <li key={name} className="hold-row" data-reveal>
            <span className="hold-no">{String(i + 1).padStart(2, '0')}</span>
            <span className="hold-name">
              <b>{name}</b>
              <small>{kind}</small>
            </span>
            <span className="hold-pos">
              <span className="hold-bar" style={{ width: (used.length / MAX) * 110 }} />
              <em>{used.length} {used.length === 1 ? 'work' : 'works'}</em>
            </span>
            <span className="hold-in">
              {used.map((k) => (
                <a key={k} href={BY_KEY[k].href}>{BY_KEY[k].label}</a>
              ))}
            </span>
          </li>
        ))}
      </ol>

      <p className="skills-also">
        Also in the kit: Stata, Power BI, LaTeX, network analysis, dynamic models solved
        numerically, EViews, Wind, Git, Claude Code, Cursor, GitHub Copilot.
      </p>
      <p className="skills-foot">
        <span>Mandarin (native) · English (professional)</span>
        <span>CFA Level I candidate, exam November 2026</span>
      </p>
    </div>
  )
}

export default Skills
