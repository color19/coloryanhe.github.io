import { useMemo, useState } from 'react'

/* Ramsey–Cass–Koopmans with utility-yielding government spending, simulated in
   the browser with the team notebook's calibration and shooting method. Each φ
   is solved independently, so the identical capital paths are a result of the
   simulation, not drawn from the theorem. */

const P = { alpha: 0.33, beta: 0.96, rho: 2, delta: 0.1, n: 0.01, g: 0.02 }
const f = (k) => k ** P.alpha
const fp = (k) => P.alpha * k ** (P.alpha - 1)
const GROWTH = (1 + P.g) * (1 + P.n)
const K_SS = (P.alpha / ((1 + P.g) ** P.rho * (1 + P.n) / P.beta - 1 + P.delta)) ** (1 / (1 - P.alpha))
const C_SS_BASE = f(K_SS) + (1 - P.delta) * K_SS - GROWTH * K_SS
const K0 = 0.5 * K_SS
const T_SOLVE = 80
const T_SHOW = 50

function simulate(c0, psi) {
  const k = [K0]
  const c = [c0]
  for (let t = 0; t < T_SOLVE - 1; t++) {
    const k1 = (f(k[t]) + (1 - P.delta) * k[t] - psi * c[t]) / GROWTH
    if (!(k1 > 0)) return null
    const R = fp(k1) + 1 - P.delta
    const c1 = (c[t] * (P.beta * R) ** (1 / P.rho)) / ((1 + P.g) * (1 + P.n) ** (1 / P.rho))
    if (!(c1 > 0)) return null
    k.push(k1)
    c.push(c1)
  }
  return { k, c }
}

function solve(phi) {
  const share = phi ** (1 / P.rho)
  const psi = 1 + share
  let lo = 0.01
  let hi = f(K0) + (1 - P.delta) * K0
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const s = simulate(mid, psi)
    if (!s || s.k[T_SOLVE - 1] < K_SS) hi = mid
    else lo = mid
  }
  const { k, c } = simulate((lo + hi) / 2, psi)
  const cStar = C_SS_BASE / psi
  return {
    phi,
    psi,
    k: k.slice(0, T_SHOW + 1),
    c: c.slice(0, T_SHOW + 1),
    G: c.slice(0, T_SHOW + 1).map((x) => share * x),
    cStar,
    gStar: share * cStar,
    converge: c.findIndex((x) => Math.abs(x - cStar) / cStar < 0.01),
  }
}

const PHIS = [0, 0.25, 0.5, 1, 2, 4]

const PANELS = [
  { key: 'k', title: 'Capital', unit: 'per efficiency unit', max: 2.4, ticks: [0, 1, 2], note: 'same path for every φ' },
  { key: 'c', title: 'Private consumption', unit: 'per efficiency unit', max: 1.2, ticks: [0, 0.5, 1] },
  { key: 'G', title: 'Government spending', unit: 'per efficiency unit', max: 0.8, ticks: [0, 0.4, 0.8] },
]

const W = 320
const H = 190
const M = { l: 34, r: 10, t: 12, b: 26 }
const x = (t) => M.l + (t / T_SHOW) * (W - M.l - M.r)
const yOf = (max) => (v) => M.t + (1 - v / max) * (H - M.t - M.b)
const pathOf = (arr, y) => arr.map((v, t) => `${t ? 'L' : 'M'}${x(t).toFixed(1)},${y(v).toFixed(1)}`).join('')
const fmt = (v) => v.toFixed(3)

function Panel({ spec, base, cur, hoverT, setHoverT }) {
  const y = yOf(spec.max)
  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * W
    const t = Math.round(((px - M.l) / (W - M.l - M.r)) * T_SHOW)
    setHoverT(Math.max(0, Math.min(T_SHOW, t)))
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setHoverT((t) => Math.min(T_SHOW, (t ?? -1) + 1))
    if (e.key === 'ArrowLeft') setHoverT((t) => Math.max(0, (t ?? 1) - 1))
  }
  const showBase = spec.key !== 'G'
  const last = cur[spec.key][T_SHOW]
  return (
    <figure className="mini-panel">
      <figcaption>
        <b>{spec.title}</b>
        <span>{spec.unit}</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${spec.title} over ${T_SHOW} periods`}
        tabIndex={0}
        onPointerMove={onMove}
        onPointerLeave={() => setHoverT(null)}
        onKeyDown={onKey}
        onBlur={() => setHoverT(null)}
      >
        {spec.ticks.map((v) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} className={v === 0 ? 'mini-axis' : 'mini-grid'} />
            <text x={M.l - 6} y={y(v) + 4} textAnchor="end" className="mini-tick">{v}</text>
          </g>
        ))}
        {[0, 25, 50].map((t) => (
          <text key={t} x={x(t)} y={H - 8} textAnchor="middle" className="mini-tick">{t}</text>
        ))}
        {showBase && <path d={pathOf(base[spec.key], y)} className="mini-base" />}
        <path d={pathOf(cur[spec.key], y)} className="mini-cur" />
        <circle cx={x(T_SHOW)} cy={y(last)} r="4" className="mini-dot" />
        <text x={x(T_SHOW) - 4} y={y(last) - 9} textAnchor="end" className="mini-end">{last.toFixed(2)}</text>
        {hoverT != null && (
          <line x1={x(hoverT)} x2={x(hoverT)} y1={M.t} y2={H - M.b} className="mini-cross" />
        )}
      </svg>
      {spec.note && <p className="hand mini-note">{spec.note}</p>}
    </figure>
  )
}

function ResearchRCK() {
  const solved = useMemo(() => Object.fromEntries(PHIS.map((p) => [p, solve(p)])), [])
  const [phi, setPhi] = useState(1)
  const [hoverT, setHoverT] = useState(null)
  const base = solved[0]
  const cur = solved[phi]
  const t = hoverT

  return (
    <article className="research" data-reveal>
      <div className="research-head">
        <div>
          <p className="eyebrow">Research · team project · macroeconomic modeling, May 2026</p>
          <h3>Public goods don&rsquo;t bend the growth path.</h3>
        </div>
        <p className="research-desc">
          In a Ramsey&ndash;Cass&ndash;Koopmans growth model, we let households value public
          goods and let the planner choose government spending. The result is an
          intertemporal neutrality theorem: with separable preferences and lump-sum
          taxes, spending only reshuffles consumption within each period. The capital
          path, the speed of convergence and the interest rate are untouched, whatever
          weight people put on public goods.
        </p>
      </div>

      <div className="mini-controls">
        <span className="mini-label">Weight on public goods, φ</span>
        <div className="mini-seg" role="radiogroup" aria-label="Weight on public goods">
          {PHIS.map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={phi === p}
              className={phi === p ? 'on' : undefined}
              onClick={() => setPhi(p)}
            >
              {p === 0 ? '0 · no gov.' : p}
            </button>
          ))}
        </div>
      </div>

      <div className="mini-legend">
        <span><i className="k-base" />no government (φ = 0)</span>
        <span><i className="k-cur" />φ = {phi}</span>
        <span className="mini-readout" aria-live="polite">
          {t == null
            ? `Steady state: c* = ${fmt(cur.cStar)}, G* = ${fmt(cur.gStar)} · within 1% of c* by period ${cur.converge}`
            : `Period ${t}: capital ${fmt(cur.k[t])} · consumption ${fmt(cur.c[t])} (no gov. ${fmt(base.c[t])}) · government ${fmt(cur.G[t])}`}
        </span>
      </div>

      <div className="mini-panels">
        {PANELS.map((s) => (
          <Panel key={s.key} spec={s} base={base} cur={cur} hoverT={hoverT} setHoverT={setHoverT} />
        ))}
      </div>

      <details className="mini-table">
        <summary>Show as table</summary>
        <table>
          <thead>
            <tr><th>Period</th><th>Capital</th><th>Consumption</th><th>Consumption, no gov.</th><th>Government</th></tr>
          </thead>
          <tbody>
            {[0, 5, 10, 20, 30, 40, 50].map((p) => (
              <tr key={p}>
                <td>{p}</td><td>{fmt(cur.k[p])}</td><td>{fmt(cur.c[p])}</td><td>{fmt(base.c[p])}</td><td>{fmt(cur.G[p])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <p className="research-credit">
        With Mike Santos, Muhong Zhang and Jude Ikemefuna Iziga. Each φ is solved live in
        your browser with our calibration (α 0.33, β 0.96, ρ 2, δ 0.10) and the same
        shooting method, starting from half the steady-state capital stock.
      </p>
    </article>
  )
}

export default ResearchRCK
