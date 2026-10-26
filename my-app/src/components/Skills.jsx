import { useState } from 'react'

/* Skills as a dot matrix: each dot is a piece of work on this page that used
   the skill. Every mapping was checked against the project files (code,
   reports, notebooks); tools with no project here are listed underneath. */

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

const GROUPS = [
  {
    label: 'Data & programming',
    rows: [
      ['Python', ['sc', 'bdc', 'rck', 'ss', 'ap']],
      ['SQL', ['bdc', 'ss']],
      ['R', ['bond', 'panel']],
      ['WRDS: Compustat, CRSP', ['bdc']],
      ['Stata', ['panel']],
      ['Excel', ['dcf']],
      ['Power BI', ['dash']],
      ['Bloomberg', ['bond']],
      ['LaTeX', ['bdc']],
    ],
  },
  {
    label: 'Methods',
    rows: [
      ['Data visualization', ['bdc', 'rck', 'study', 'ap', 'dash']],
      ['Regression and econometrics', ['sc', 'bdc', 'ap', 'panel']],
      ['Factor models: PCA, GRS, Fama–MacBeth', ['ap']],
      ['Network analysis', ['ap']],
      ['Dynamic models, solved numerically', ['rck']],
    ],
  },
  {
    label: 'Finance',
    rows: [
      ['Credit risk', ['sc', 'bdc']],
      ['Research writing', ['bdc', 'rck']],
      ['Financial statement and ratio analysis', ['bdc']],
      ['Fixed income', ['bond']],
      ['Valuation, DCF', ['dcf']],
    ],
  },
  {
    label: 'Building',
    rows: [
      ['Single-file web apps', ['study', 'runway']],
      ['Apps built with AI agents', ['study']],
    ],
  },
]

const MAX = Math.max(...GROUPS.flatMap((g) => g.rows.map((r) => r[1].length)))

/* consecutive columns sharing a group label, for the top header row */
const COL_GROUPS = COLS.reduce((acc, c) => {
  const last = acc[acc.length - 1]
  if (last && last.label === c.group) last.span++
  else acc.push({ label: c.group, span: 1 })
  return acc
}, [])

function Skills() {
  const [row, setRow] = useState(null)
  const [col, setCol] = useState(null)
  const rowCols = row ? GROUPS.flatMap((g) => g.rows).find((r) => r[0] === row)[1] : []

  return (
    <div className="skills" id="skills">
      <div className="work-list-head" data-reveal>
        <h2>The toolkit, with receipts</h2>
        <span className="hand">every dot is a piece of work on this page</span>
      </div>

      <div className="kit-scroll" data-reveal>
        <table className="kit" onMouseLeave={() => { setRow(null); setCol(null) }}>
          <colgroup>
            <col className="kit-c-name" />
            {COLS.map((c) => <col key={c.key} />)}
            <col className="kit-c-count" />
          </colgroup>
          <thead>
            <tr className="kit-groups">
              <th aria-hidden="true" />
              {COL_GROUPS.map((g) => (
                <th key={g.label} colSpan={g.span} scope="colgroup"><span>{g.label}</span></th>
              ))}
              <th aria-hidden="true" />
            </tr>
            <tr className="kit-cols">
              <th scope="col" className="kit-corner">Skill</th>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={col === c.key || rowCols.includes(c.key) ? 'is-on' : undefined}
                  onMouseEnter={() => { setCol(c.key); setRow(null) }}
                >
                  <a href={c.href}><span>{c.label}</span></a>
                </th>
              ))}
              <th scope="col" className="kit-count-h">Used in</th>
            </tr>
          </thead>
          {GROUPS.map((g) => (
            <tbody key={g.label}>
              <tr className="kit-group">
                <th colSpan={COLS.length + 2} scope="rowgroup">{g.label}</th>
              </tr>
              {g.rows.map(([name, used]) => {
                const onRow = row === name || (col && used.includes(col))
                return (
                  <tr
                    key={name}
                    className={onRow ? 'is-on' : undefined}
                    onMouseEnter={() => { setRow(name); setCol(null) }}
                  >
                    <th scope="row">{name}</th>
                    {COLS.map((c) => {
                      const hit = used.includes(c.key)
                      return (
                        <td key={c.key} className={col === c.key ? 'is-col' : undefined}>
                          {hit ? (
                            <span className="kit-dot" role="img" aria-label={`used in ${c.label}`} />
                          ) : (
                            <span className="kit-empty" aria-hidden="true" />
                          )}
                        </td>
                      )
                    })}
                    <td className="kit-count">
                      <span className="kit-bar" style={{ width: `${(used.length / MAX) * 100}%` }} />
                      <b>{used.length}</b>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          ))}
        </table>
      </div>

      <p className="skills-also">
        Also in the kit, without a project on this page yet: EViews, Wind, Git, Claude Code,
        Cursor, GitHub Copilot.
      </p>
      <p className="skills-foot">
        <span>Mandarin (native) · English (professional)</span>
        <span>CFA Level I candidate, exam November 2026</span>
      </p>
    </div>
  )
}

export default Skills
