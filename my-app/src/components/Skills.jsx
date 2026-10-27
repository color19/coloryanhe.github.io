import { useState } from 'react'

/* Capabilities, listed plainly. Hovering or focusing a skill shows the work on
   this page that used it; the mappings were checked against the project files. */

const WORKS = {
  sc: ['Credit scorecard', '#research-scorecard'],
  bdc: ['BDC paper', '#research-bdc'],
  rck: ['RCK paper', '#research-rck'],
  study: ['Studyroom', '#project-studyroom'],
  runway: ['Runway', '#project-runway'],
  bond: ['Bond research', '#work-fixed-income'],
  ss: ['State Street pipelines', '#work-pipelines'],
  ap: ['Asset pricing', '#work-asset-pricing'],
  panel: ['Panel data', '#work-panel'],
  dcf: ['Financial model', '#work-financial-model'],
  dash: ['Dashboard', '#work-dashboard'],
}

const GROUPS = [
  ['Data and code', [
    ['Python', ['sc', 'bdc', 'rck', 'ss', 'ap']],
    ['SQL', ['bdc', 'ss']],
    ['R', ['bond', 'panel']],
    ['Stata', ['panel']],
    ['SAS', ['ap']],
    ['WRDS: Compustat, CRSP', ['bdc', 'ap']],
    ['Bloomberg', ['bond']],
    ['Excel', ['dcf']],
  ]],
  ['Methods', [
    ['Regression and econometrics', ['sc', 'bdc', 'ap', 'panel']],
    ['Factor models: PCA, GRS, Fama–MacBeth', ['ap']],
    ['Credit scoring', ['sc']],
    ['Dynamic models, solved numerically', ['rck']],
    ['Network analysis', ['ap']],
  ]],
  ['Finance', [
    ['Credit risk', ['sc', 'bdc']],
    ['Fixed income', ['bond']],
    ['DCF valuation', ['dcf']],
    ['Financial statement analysis', ['bdc']],
    ['Research writing', ['bdc', 'rck']],
  ]],
  ['Building', [
    ['Data visualization', ['bdc', 'rck', 'study', 'ap', 'dash']],
    ['Power BI', ['dash']],
    ['Single-file web apps', ['study', 'runway']],
    ['Claude Code, Cursor', ['study']],
    ['Git, LaTeX', ['bdc']],
  ]],
]

function Skills() {
  const [cur, setCur] = useState(null)
  return (
    <div className="skills" id="skills">
      <div className="work-list-head" data-reveal>
        <h2>Capabilities</h2>
        <span className="hand">hover one to see where it&rsquo;s used</span>
      </div>
      <div className={`caps${cur ? ' has-cur' : ''}`} data-reveal onMouseLeave={() => setCur(null)}>
        {GROUPS.map(([name, items]) => (
          <div key={name} className="caps-col">
            <p className="eyebrow">{name}</p>
            <ul>
              {items.map(([t, used]) => (
                <li key={t}>
                  <button
                    type="button"
                    className={cur?.[0] === t ? 'is-cur' : ''}
                    onMouseEnter={() => setCur([t, used])}
                    onFocus={() => setCur([t, used])}
                    onClick={() => setCur([t, used])}
                  >
                    {t}<sup>{used.length}</sup>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="caps-used" aria-live="polite">
          {cur ? (
            <>
              <b>{cur[0]}</b> is in {cur[1].length === 1 ? 'one piece' : `${cur[1].length} pieces`} of work here:{' '}
              {cur[1].map((k, i) => (
                <span key={k}>{i > 0 && ', '}<a href={WORKS[k][1]}>{WORKS[k][0]}</a></span>
              ))}
            </>
          ) : (
            'The small number is how many pieces of work on this page use it.'
          )}
        </p>
      </div>
      <p className="skills-foot">
        <span>Mandarin (native) · English (professional)</span>
        <span>CFA Level I candidate, exam November 2026</span>
      </p>
    </div>
  )
}

export default Skills
