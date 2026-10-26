import { useState } from 'react'

/* Credit underwriting scorecard (641 midterm project). Everything shown is a
   reported model output: IVs, the score scaling (PDO 20, 600 at 19:1), the
   cutoffs, and the validation confusion matrix. No loan-level data ships. */

const IV = [
  ['Interest rate', 0.5728, 'Loan terms'],
  ['Credit activity', 0.1149, 'Willingness'],
  ['Payment to income', 0.0748, 'Ability'],
  ['Months since last inquiry', 0.0724, 'Willingness'],
  ['Income verified', 0.0657, 'Ability'],
  ['Inquiries, last 6 months', 0.0482, 'Willingness'],
  ['Highest credit limit', 0.0333, 'Ability'],
  ['Term', 0.0304, 'Loan terms'],
  ['Home ownership', 0.0239, 'Loan terms'],
]

const FACTOR = 20 / Math.LN2
const OFFSET = 600 - FACTOR * Math.log(19)
const pdOf = (s) => 1 / (1 + Math.exp((s - OFFSET) / FACTOR))
const oddsOf = (s) => Math.exp((s - OFFSET) / FACTOR)

const CUTOFFS = [
  { s: 592, label: 'KS-optimal' },
  { s: 600, label: 'policy' },
  { s: 612, label: 'stress' },
]

/* validation sample at the KS cutoff, from the confusion matrix */
const CM = { goodApproved: 57577, goodDeclined: 34653, badApproved: 2014, badDeclined: 4808 }

const W = 320
const H = 200

function IVPanel() {
  const M = { l: 132, r: 30, t: 6, b: 22 }
  const max = 0.6
  const x = (v) => M.l + (v / max) * (W - M.l - M.r)
  const band = (H - M.t - M.b) / IV.length
  return (
    <figure className="mini-panel">
      <figcaption><b>What predicts default</b><span>information value · 0.1 medium, 0.3 strong</span></figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Information value of the nine scorecard variables">
        {[0, 0.1, 0.3].map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={M.t} y2={H - M.b} className={v === 0 ? 'mini-axis' : 'mini-ref'} />
            {v > 0 && <text x={x(v)} y={H - 7} textAnchor="middle" className="mini-tick">{v}</text>}
          </g>
        ))}
        {IV.map(([name, v], i) => {
          const y = M.t + i * band + band / 2
          const w = x(v) - x(0)
          return (
            <g key={name}>
              <title>{`${name}: IV ${v.toFixed(3)}`}</title>
              <text x={M.l - 6} y={y + 3.5} textAnchor="end" className="mini-cat">{name}</text>
              <path
                d={`M${x(0)},${y - 5} H${x(0) + w - 3} Q${x(0) + w},${y - 5} ${x(0) + w},${y - 2} V${y + 2} Q${x(0) + w},${y + 5} ${x(0) + w - 3},${y + 5} H${x(0)} Z`}
                className={i === 0 ? 'mini-bar-hi' : 'mini-bar'}
              />
              {i === 0 && <text x={x(0) + w + 4} y={y + 3.5} className="mini-end">0.57</text>}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

function CurvePanel({ hover, setHover }) {
  const M = { l: 34, r: 8, t: 14, b: 24 }
  const lo = 550
  const hi = 680
  const ymax = 0.25
  const x = (s) => M.l + ((s - lo) / (hi - lo)) * (W - M.l - M.r)
  const y = (p) => M.t + (1 - p / ymax) * (H - M.t - M.b)
  const pts = []
  for (let s = lo; s <= hi; s += 2) pts.push(`${pts.length ? 'L' : 'M'}${x(s).toFixed(1)},${y(Math.min(ymax, pdOf(s))).toFixed(1)}`)
  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * W
    setHover(Math.round(Math.max(lo, Math.min(hi, lo + ((px - M.l) / (W - M.l - M.r)) * (hi - lo)))))
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setHover((s) => Math.min(hi, (s ?? 599) + 1))
    if (e.key === 'ArrowLeft') setHover((s) => Math.max(lo, (s ?? 601) - 1))
  }
  return (
    <figure className="mini-panel">
      <figcaption><b>Score to default probability</b><span>+20 points = odds × 2</span></figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Probability of default by score, with the three cutoffs"
        tabIndex={0}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        {[0, 0.1, 0.2].map((p) => (
          <g key={p}>
            <line x1={M.l} x2={W - M.r} y1={y(p)} y2={y(p)} className={p === 0 ? 'mini-axis' : 'mini-grid'} />
            <text x={M.l - 6} y={y(p) + 4} textAnchor="end" className="mini-tick">{p * 100}%</text>
          </g>
        ))}
        {[550, 600, 650].map((s) => (
          <text key={s} x={x(s)} y={H - 7} textAnchor="middle" className="mini-tick">{s}</text>
        ))}
        {CUTOFFS.map((c, i) => (
          <g key={c.s}>
            <line x1={x(c.s)} x2={x(c.s)} y1={M.t} y2={H - M.b} className="mini-event" />
            <text x={x(CUTOFFS[2].s) + 6} y={M.t + 10 + i * 12} className="mini-event-label">{`${c.s} ${c.label}`}</text>
          </g>
        ))}
        <path d={pts.join('')} className="mini-cur" />
        {hover != null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={M.t} y2={H - M.b} className="mini-cross" />
            <circle cx={x(hover)} cy={y(Math.min(ymax, pdOf(hover)))} r="4" className="mini-dot" />
          </>
        )}
      </svg>
    </figure>
  )
}

function OutcomePanel() {
  const M = { l: 70, r: 8, t: 30, b: 26 }
  const rows = [
    { name: 'Good loans', a: CM.goodApproved, d: CM.goodDeclined },
    { name: 'Bad loans', a: CM.badApproved, d: CM.badDeclined },
  ]
  const x = (f) => M.l + f * (W - M.l - M.r)
  return (
    <figure className="mini-panel">
      <figcaption><b>Held-out loans at the KS cutoff</b><span>validation, n = 99,052</span></figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Share of good and bad validation loans approved and declined at the KS cutoff">
        {rows.map((r, i) => {
          const tot = r.a + r.d
          const fa = r.a / tot
          const y = M.t + i * 64
          return (
            <g key={r.name}>
              <text x={M.l - 8} y={y + 16} textAnchor="end" className="mini-cat">{r.name}</text>
              <text x={M.l - 8} y={y + 29} textAnchor="end" className="mini-tick">{tot.toLocaleString()}</text>
              <rect x={x(0)} y={y} width={x(fa) - x(0) - 1} height="24" rx="3" className="mini-seg-a">
                <title>{`${r.name}: ${r.a.toLocaleString()} approved (${(fa * 100).toFixed(1)}%)`}</title>
              </rect>
              <rect x={x(fa) + 1} y={y} width={x(1) - x(fa) - 1} height="24" rx="3" className="mini-seg-d">
                <title>{`${r.name}: ${r.d.toLocaleString()} declined (${((1 - fa) * 100).toFixed(1)}%)`}</title>
              </rect>
              <text x={x(fa / 2)} y={y + 16} textAnchor="middle" className="mini-in">{`${(fa * 100).toFixed(1)}%`}</text>
              <text x={x((1 + fa) / 2)} y={y + 16} textAnchor="middle" className="mini-in">{`${((1 - fa) * 100).toFixed(1)}%`}</text>
            </g>
          )
        })}
        <text x={x(0)} y={M.t - 12} className="mini-tick">approved</text>
        <text x={x(1)} y={M.t - 12} textAnchor="end" className="mini-tick">declined</text>
      </svg>
    </figure>
  )
}

function ResearchScorecard() {
  const [hover, setHover] = useState(null)
  return (
    <article id="research-scorecard" className="research" data-reveal>
      <div className="research-head">
        <div>
          <p className="eyebrow">Research · solo project · credit risk modeling, March 2026</p>
          <h3>A credit scorecard that holds up out of sample.</h3>
        </div>
        <p className="research-desc">
          An underwriting scorecard for consumer loans originated 2015&ndash;2018. Nine
          variables across loan terms, willingness to pay and ability to pay, screened by
          information value and binned to weight of evidence, then a logistic regression
          scaled so that every 20 points doubles the odds. On 99,052 held-out loans the KS
          is 0.33, slightly above the 0.32 in training, and predicted default (6.72%) sits
          within 3% of observed (6.89%).
        </p>
      </div>

      <div className="mini-legend">
        <span><i className="k-bar-hi" />strongest predictor</span>
        <span><i className="k-seg-a" />approved</span>
        <span><i className="k-seg-d" />declined</span>
        <span className="mini-readout" aria-live="polite">
          {hover == null
            ? 'At the KS cutoff of 592: approves 60.2% of held-out applicants, 3.4% of them go bad, and catches 70.5% of bad loans.'
            : `Score ${hover}: probability of default ${(pdOf(hover) * 100).toFixed(2)}% · odds ${oddsOf(hover).toFixed(1)} : 1 · ${hover >= 600 ? 'approved' : 'declined'} under the 600 policy`}
        </span>
      </div>

      <div className="mini-panels">
        <IVPanel />
        <CurvePanel hover={hover} setHover={setHover} />
        <OutcomePanel />
      </div>

      <details className="mini-table">
        <summary>Show as table</summary>
        <table>
          <thead><tr><th>Variable</th><th>Dimension</th><th>Information value</th></tr></thead>
          <tbody>
            {IV.map(([n, v, d]) => <tr key={n}><td>{n}</td><td>{d}</td><td>{v.toFixed(4)}</td></tr>)}
          </tbody>
        </table>
        <table>
          <thead><tr><th>Validation, KS cutoff 592</th><th>Approved</th><th>Declined</th></tr></thead>
          <tbody>
            <tr><td>Good loans</td><td>{CM.goodApproved.toLocaleString()}</td><td>{CM.goodDeclined.toLocaleString()}</td></tr>
            <tr><td>Bad loans</td><td>{CM.badApproved.toLocaleString()}</td><td>{CM.badDeclined.toLocaleString()}</td></tr>
          </tbody>
        </table>
      </details>

      <p className="research-credit">
        Yan He. Python (pandas, statsmodels); score scaled with PDO 20 and 600 points at
        19:1 odds. Cutoffs: 592 maximises KS on training data, 600 is the policy line that
        keeps the approved bad rate under 5%, and 612 adds one PDO for a stress scenario.
        Approval figures come from the validation confusion matrix. Only model outputs are
        shown; no loan-level data.
      </p>
    </article>
  )
}

export default ResearchScorecard
