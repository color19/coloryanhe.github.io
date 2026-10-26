import ICONS from '../data/tool-icons.json'
import PaperArt from './project/PaperArt'

/* Skills from her current résumés. A tool or method links only when this
   page shows work that used it; the rest stay plain. Brand marks come from
   Simple Icons (CC0); brands it doesn't carry get a lettered tile in their
   colour. */

const tools = [
  { name: 'Python', icon: { si: 'python' }, note: 'pandas · NumPy · scikit-learn · statsmodels', href: '#research-scorecard' },
  { name: 'SQL', icon: { glyph: 'db', bg: '#3e6a9e' }, href: '#work-pipelines' },
  { name: 'R', icon: { si: 'r' }, href: '#work-panel' },
  { name: 'Stata', icon: { text: 'S', bg: '#1a5d96' }, href: '#work-panel' },
  { name: 'Excel', icon: { text: 'X', bg: '#217346' }, note: 'Power Query · pivots · macros', href: '#work-financial-model' },
  { name: 'Power BI', icon: { glyph: 'bars', bg: '#f2c811', fg: '#1b1b1b' }, href: '#work-dashboard' },
  { name: 'Bloomberg', icon: { text: 'B', bg: '#111111', fg: '#fb8b1e' }, href: '#work-fixed-income' },
  { name: 'WRDS', icon: { text: 'WRDS', bg: '#0b2a55' }, note: 'Compustat · CRSP', href: '#research-bdc' },
  { name: 'EViews', icon: { text: 'EV', bg: '#5b6b7f' } },
  { name: 'Wind', icon: { text: 'W', bg: '#d7261e' } },
  { name: 'Git', icon: { si: 'git' } },
  { name: 'Claude Code', icon: { si: 'claude' } },
  { name: 'Cursor', icon: { si: 'cursor' } },
  { name: 'GitHub Copilot', icon: { si: 'githubcopilot' } },
]

const methods = [
  {
    label: 'Finance',
    art: 'finance',
    tone: '#f3ece0',
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
    art: 'quant',
    tone: '#e5ebe2',
    items: [
      { name: 'Panel data: fixed effects, IV, DID', href: '#work-panel' },
      { name: 'Factor models: PCA, GRS, Fama–MacBeth', href: '#work-asset-pricing' },
      { name: 'Dynamic models, solved numerically', href: '#research-rck' },
      { name: 'Event studies' },
      { name: 'Time series' },
    ],
  },
  {
    label: 'AI & building',
    art: 'ai',
    tone: '#dbe5ef',
    items: [
      { name: 'Apps built end to end with AI agents', href: '#projects' },
      { name: 'Single-file web apps, shipped open source', href: '#projects' },
      { name: 'LLM agent workflows with output validation' },
    ],
  },
]

function ToolIcon({ icon }) {
  if (icon.si) {
    const s = ICONS[icon.si]
    return (
      <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={s.path} fill={s.hex} />
      </svg>
    )
  }
  const fg = icon.fg || '#ffffff'
  return (
    <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill={icon.bg} />
      {icon.glyph === 'db' && (
        <g fill="none" stroke={fg} strokeWidth="1.6">
          <ellipse cx="12" cy="7" rx="6" ry="2.4" />
          <path d="M6 7v10c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V7M6 12c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4" />
        </g>
      )}
      {icon.glyph === 'bars' && (
        <g fill={fg}>
          <rect x="6" y="12" width="3" height="7" rx="1" />
          <rect x="10.5" y="8" width="3" height="11" rx="1" />
          <rect x="15" y="5" width="3" height="14" rx="1" />
        </g>
      )}
      {icon.text && (
        <text
          x="12"
          y={icon.text.length > 2 ? 15 : 16.5}
          textAnchor="middle"
          fill={fg}
          fontFamily="var(--sans)"
          fontWeight="700"
          fontSize={icon.text.length > 2 ? 7.5 : 12}
        >
          {icon.text}
        </text>
      )}
    </svg>
  )
}

function Tool({ t }) {
  const body = (
    <>
      <ToolIcon icon={t.icon} />
      <span className="tool-text">
        <b>{t.name}</b>
        {t.note && <small>{t.note}</small>}
      </span>
      {t.href && <span className="tool-proof">used here ↘</span>}
    </>
  )
  return t.href ? (
    <a className="tool is-linked" href={t.href}>{body}</a>
  ) : (
    <div className="tool">{body}</div>
  )
}

function Skills() {
  return (
    <div className="skills" id="skills">
      <div className="work-list-head" data-reveal>
        <h2>The toolkit</h2>
        <span className="hand">click one to see where I used it</span>
      </div>

      <p className="eyebrow skills-sub">Tools I reach for</p>
      <div className="tool-wall" data-reveal>
        {tools.map((t) => <Tool key={t.name} t={t} />)}
      </div>

      <div className="method-grid">
        {methods.map((g) => (
          <article key={g.label} className="method-card" style={{ background: g.tone }} data-reveal>
            <PaperArt kind={g.art} size={150} />
            <h3>{g.label}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it.name}>
                  {it.href ? (
                    <a href={it.href}>{it.name} <span aria-hidden="true">↘</span></a>
                  ) : (
                    <span>{it.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </article>
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
