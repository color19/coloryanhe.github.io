import { useState } from 'react'
import DATA from '../data/bdc-sector.json'

/* BDC sector medians and interquartile ranges by quarter, aggregated from the
   firm-quarter panel (78 BDCs). Rows are [quarter, median, p25, p75]. */

const Q = DATA.acr.map((r) => r[0])
const N = Q.length
const qIndex = (q) => Q.indexOf(q)

const EVENTS = [
  { q: '2008Q3', label: 'Lehman' },
  { q: '2018Q1', label: 'SBCAA' },
  { q: '2022Q1', label: 'Fed hikes' },
]
const RECESSIONS = [['2007Q4', '2009Q2'], ['2020Q1', '2020Q2']]

const PANELS = [
  {
    key: 'acr',
    title: 'Asset coverage ratio',
    unit: 'median, 25–75% band',
    min: 1, max: 4, ticks: [1, 2, 3, 4],
    fmt: (v) => `${Math.round(v * 100)}%`,
    tick: (v) => `${v * 100}%`,
    refs: [
      { v: 2, label: 'old floor 200%' },
      { v: 1.5, label: 'floor since 2018: 150%' },
    ],
    note: 'below the old floor since mid-2021',
  },
  {
    key: 'icr',
    title: 'Interest coverage',
    unit: 'EBIT ÷ interest, TTM',
    min: 1, max: 6, ticks: [2, 4, 6],
    fmt: (v) => `${v.toFixed(2)}×`,
    tick: (v) => `${v}×`,
  },
  {
    key: 'bm',
    title: 'Book-to-market',
    unit: 'above 1 = priced below NAV',
    min: 0.5, max: 2.5, ticks: [0.5, 1, 1.5, 2, 2.5],
    fmt: (v) => v.toFixed(2),
    tick: (v) => String(v),
    refs: [{ v: 1 }],
  },
]

const W = 320
const H = 200
const M = { l: 38, r: 8, t: 14, b: 24 }
const x = (i) => M.l + (i / (N - 1)) * (W - M.l - M.r)

function series(rows, j, y) {
  let d = ''
  let pen = false
  rows.forEach((r, i) => {
    if (r[j] == null) { pen = false; return }
    d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(r[j]).toFixed(1)}`
    pen = true
  })
  return d
}

function band(rows, y) {
  const parts = []
  let seg = []
  const flush = () => {
    if (seg.length > 1) {
      const top = seg.map(([i, r]) => `${x(i).toFixed(1)},${y(r[3]).toFixed(1)}`)
      const bot = seg.slice().reverse().map(([i, r]) => `${x(i).toFixed(1)},${y(r[2]).toFixed(1)}`)
      parts.push(`M${top.join('L')}L${bot.join('L')}Z`)
    }
    seg = []
  }
  rows.forEach((r, i) => (r[2] == null || r[3] == null ? flush() : seg.push([i, r])))
  flush()
  return parts.join('')
}

function Panel({ spec, hover, setHover, showEventLabels }) {
  const rows = DATA[spec.key]
  const span = spec.max - spec.min
  const y = (v) => M.t + (1 - (Math.min(spec.max, Math.max(spec.min, v)) - spec.min) / span) * (H - M.t - M.b)
  const last = rows[N - 1]
  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * W
    setHover(Math.max(0, Math.min(N - 1, Math.round(((px - M.l) / (W - M.l - M.r)) * (N - 1)))))
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setHover((i) => Math.min(N - 1, (i ?? N - 2) + 1))
    if (e.key === 'ArrowLeft') setHover((i) => Math.max(0, (i ?? N) - 1))
  }

  return (
    <figure className="mini-panel">
      <figcaption>
        <b>{spec.title}</b>
        <span>{spec.unit}</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${spec.title}, BDC sector median by quarter, 2005 to 2025`}
        tabIndex={0}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        {RECESSIONS.map(([a, b]) => (
          <rect key={a} x={x(qIndex(a))} y={M.t} width={x(qIndex(b)) - x(qIndex(a)) + 2} height={H - M.t - M.b} className="mini-recession" />
        ))}
        {spec.ticks.map((v) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} className="mini-grid" />
            <text x={M.l - 6} y={y(v) + 4} textAnchor="end" className="mini-tick">{spec.tick(v)}</text>
          </g>
        ))}
        {[2006, 2014, 2022].map((yr) => (
          <text key={yr} x={x(qIndex(`${yr}Q1`))} y={H - 7} textAnchor="middle" className="mini-tick">{yr}</text>
        ))}
        {EVENTS.map((ev) => (
          <g key={ev.q}>
            <line x1={x(qIndex(ev.q))} x2={x(qIndex(ev.q))} y1={M.t} y2={H - M.b} className="mini-event" />
            {showEventLabels && (
              <text x={x(qIndex(ev.q)) + 3} y={M.t + 9} className="mini-event-label">{ev.label}</text>
            )}
          </g>
        ))}
        {(spec.refs || []).map((r) => (
          <g key={r.v}>
            <line x1={M.l} x2={W - M.r} y1={y(r.v)} y2={y(r.v)} className="mini-ref" />
            {r.label && <text x={M.l + 4} y={y(r.v) + 11} className="mini-ref-label">{r.label}</text>}
          </g>
        ))}
        <path d={band(rows, y)} className="mini-band" />
        <path d={series(rows, 1, y)} className="mini-cur" />
        <circle cx={x(N - 1)} cy={y(last[1])} r="4" className="mini-dot" />
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={M.t} y2={H - M.b} className="mini-cross" />}
      </svg>
      {spec.note && <p className="hand mini-note">{spec.note}</p>}
    </figure>
  )
}

const val = (key, i) => DATA[key][i][1]

function ResearchBDC() {
  const [hover, setHover] = useState(null)
  const i = hover ?? N - 1
  const fmt = Object.fromEntries(PANELS.map((p) => [p.key, p.fmt]))
  const show = (k) => (val(k, i) == null ? 'n/a' : fmt[k](val(k, i)))

  return (
    <article className="research" data-reveal>
      <div className="research-head">
        <div>
          <p className="eyebrow">Research · first author · empirical finance, May 2026</p>
          <h3>Private credit lenders now run below the old leverage floor.</h3>
        </div>
        <p className="research-desc">
          Business development companies are the listed face of private credit. We
          identified 418 of them in SEC filings, linked them to Compustat and CRSP, and
          tracked 78 through 3,575 firm-quarters. The median BDC has sat below the
          original 200% asset-coverage floor every quarter since mid-2021, legal only
          because a 2018 law lowered it to 150%. Interest coverage has slid from about 4.5× in 2011 to
          2.4×, and rate hikes deepened a decline already underway. Markets, meanwhile,
          only price in stress during crises.
        </p>
      </div>

      <div className="mini-legend">
        <span><i className="k-cur" />sector median</span>
        <span><i className="k-band" />25th–75th percentile</span>
        <span><i className="k-rec" />recession</span>
        <span className="mini-readout" aria-live="polite">
          {Q[i]}: asset coverage {show('acr')} · interest coverage {show('icr')} · book-to-market {show('bm')}
          {DATA.n[Q[i]] ? ` · ${DATA.n[Q[i]]} firms` : ''}
        </span>
      </div>

      <div className="mini-panels">
        {PANELS.map((s, k) => (
          <Panel key={s.key} spec={s} hover={hover} setHover={setHover} showEventLabels={k === 0} />
        ))}
      </div>

      <details className="mini-table">
        <summary>Show as table</summary>
        <table>
          <thead>
            <tr><th>Quarter</th><th>Asset coverage</th><th>Interest coverage</th><th>Book-to-market</th><th>Firms</th></tr>
          </thead>
          <tbody>
            {Q.map((q, j) => (q.endsWith('Q4') ? (
              <tr key={q}>
                <td>{q}</td>
                <td>{val('acr', j) == null ? '–' : fmt.acr(val('acr', j))}</td>
                <td>{val('icr', j) == null ? '–' : fmt.icr(val('icr', j))}</td>
                <td>{val('bm', j) == null ? '–' : fmt.bm(val('bm', j))}</td>
                <td>{DATA.n[q] ?? '–'}</td>
              </tr>
            ) : null))}
          </tbody>
        </table>
      </details>

      <p className="research-credit">
        With Shuyang Song and Long Chen. Data: SEC EDGAR (N-54A/N-54C filings), Compustat
        and CRSP via WRDS. Ratios are winsorised at the 5th and 95th percentiles each
        quarter; quarters with fewer than 10 firms are left blank. Only sector-level
        aggregates are shown here.
      </p>
    </article>
  )
}

export default ResearchBDC
