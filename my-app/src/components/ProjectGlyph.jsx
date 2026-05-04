/* Six animated icon glyphs. Each is a single-color line drawing in a 140×90
   viewBox. Strokes draw on enter (via stroke-dashoffset, set up in
   useScrollAnimations); after that, each icon has its own subtle continuous
   motion driven by CSS keyframes. */

const VIEW = '0 0 140 90'

/* 01 — Power BI dashboard: bars pulse like live data, KPI ring breathes */
function Dashboard() {
  return (
    <svg viewBox={VIEW} className="glyph glyph-dashboard" aria-hidden="true">
      <rect className="glyph-stroke glyph-frame" x="6" y="10" width="128" height="74" rx="2" />
      <line className="glyph-axis" x1="6" y1="22" x2="134" y2="22" />
      <circle className="glyph-mark" cx="13" cy="16" r="1.5" />
      <circle className="glyph-mark" cx="20" cy="16" r="1.5" />
      <circle className="glyph-mark" cx="27" cy="16" r="1.5" />
      <line className="glyph-axis" x1="74" y1="22" x2="74" y2="84" />
      <line className="glyph-axis" x1="6" y1="58" x2="74" y2="58" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 18 + i * 12
        const heights = [12, 22, 16, 24, 8]
        return (
          <line
            key={i}
            className="glyph-stroke glyph-bar"
            x1={x}
            y1="52"
            x2={x}
            y2={52 - heights[i]}
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        )
      })}
      <path className="glyph-stroke glyph-spark" d="M 82 76 L 90 70 L 98 74 L 106 64 L 114 68 L 122 56 L 130 60" />
      <circle className="glyph-node glyph-kpi-ring" cx="104" cy="38" r="9" />
      <line className="glyph-stroke" x1="100" y1="38" x2="108" y2="38" />
    </svg>
  )
}

/* 02 — Data pipeline: packets travel left → right through three databases */
function Pipeline() {
  const cylinders = [24, 70, 116]
  return (
    <svg viewBox={VIEW} className="glyph glyph-pipeline" aria-hidden="true">
      {cylinders.map((cx) => (
        <g key={cx}>
          <ellipse className="glyph-stroke" cx={cx} cy="22" rx="14" ry="4" />
          <line className="glyph-stroke" x1={cx - 14} y1="22" x2={cx - 14} y2="58" />
          <line className="glyph-stroke" x1={cx + 14} y1="22" x2={cx + 14} y2="58" />
          <path className="glyph-stroke" d={`M ${cx - 14} 58 A 14 4 0 0 0 ${cx + 14} 58`} />
          <path className="glyph-axis" d={`M ${cx - 14} 36 A 14 4 0 0 0 ${cx + 14} 36`} />
          <path className="glyph-axis" d={`M ${cx - 14} 48 A 14 4 0 0 0 ${cx + 14} 48`} />
        </g>
      ))}
      <line className="glyph-stroke" x1="40" y1="40" x2="54" y2="40" />
      <path className="glyph-stroke" d="M 50 36 L 56 40 L 50 44" />
      <line className="glyph-stroke" x1="86" y1="40" x2="100" y2="40" />
      <path className="glyph-stroke" d="M 96 36 L 102 40 L 96 44" />
      <line className="glyph-axis" x1="10" y1="76" x2="130" y2="76" />
      {/* Data packets traveling through */}
      <circle className="glyph-packet" cx="24" cy="40" r="2.5" />
      <circle className="glyph-packet glyph-packet-2" cx="24" cy="40" r="2.5" />
    </svg>
  )
}

/* 03 — Panel data: observation dots ripple left-to-right per row */
function PanelData() {
  const rows = [
    { y: 22, dots: [22, 42, 64, 86, 110, 128] },
    { y: 38, dots: [16, 38, 56, 78, 96, 122] },
    { y: 54, dots: [28, 48, 70, 92, 114] },
    { y: 70, dots: [20, 40, 62, 84, 104, 126] },
  ]
  return (
    <svg viewBox={VIEW} className="glyph glyph-panel" aria-hidden="true">
      {rows.map((row, i) => (
        <g key={i}>
          <line className="glyph-axis" x1="10" y1={row.y} x2="130" y2={row.y} />
          {row.dots.map((x, j) => (
            <circle
              key={j}
              className="glyph-dot glyph-pulse-dot"
              cx={x}
              cy={row.y}
              r="2.2"
              style={{ animationDelay: `${(i * 0.15 + j * 0.12).toFixed(2)}s` }}
            />
          ))}
        </g>
      ))}
      <line className="glyph-stroke" x1="10" y1="80" x2="130" y2="80" />
      <line className="glyph-stroke" x1="10" y1="14" x2="10" y2="80" />
    </svg>
  )
}

/* 04 — Financial model: DCF tree, nodes pulse outward from root */
function ModelTree() {
  return (
    <svg viewBox={VIEW} className="glyph glyph-tree" aria-hidden="true">
      <line className="glyph-stroke" x1="14" y1="46" x2="46" y2="46" />
      <line className="glyph-stroke" x1="46" y1="46" x2="74" y2="22" />
      <line className="glyph-stroke" x1="46" y1="46" x2="74" y2="46" />
      <line className="glyph-stroke" x1="46" y1="46" x2="74" y2="70" />
      <line className="glyph-stroke" x1="74" y1="22" x2="104" y2="14" />
      <line className="glyph-stroke" x1="74" y1="22" x2="104" y2="30" />
      <line className="glyph-stroke" x1="74" y1="46" x2="104" y2="46" />
      <line className="glyph-stroke" x1="74" y1="70" x2="104" y2="62" />
      <line className="glyph-stroke" x1="74" y1="70" x2="104" y2="78" />
      {/* Level 0 */}
      <circle className="glyph-node tree-l0" cx="14" cy="46" r="3.5" />
      {/* Level 1 */}
      <circle className="glyph-node tree-l1" cx="46" cy="46" r="3" />
      {/* Level 2 */}
      <circle className="glyph-node tree-l2" cx="74" cy="22" r="3" />
      <circle className="glyph-node tree-l2" cx="74" cy="46" r="3" />
      <circle className="glyph-node tree-l2" cx="74" cy="70" r="3" />
      {/* Level 3 */}
      <circle className="glyph-node tree-l3" cx="104" cy="14" r="2.5" />
      <circle className="glyph-node tree-l3" cx="104" cy="30" r="2.5" />
      <circle className="glyph-node tree-l3" cx="104" cy="46" r="2.5" />
      <circle className="glyph-node tree-l3" cx="104" cy="62" r="2.5" />
      <circle className="glyph-node tree-l3" cx="104" cy="78" r="2.5" />
    </svg>
  )
}

/* 05 — Fixed income: coupon arrows tick left-to-right, like payments over time */
function Bond() {
  const coupons = [20, 36, 52, 68, 84, 100, 116]
  return (
    <svg viewBox={VIEW} className="glyph glyph-bond" aria-hidden="true">
      <rect className="glyph-stroke glyph-bond-cert" x="14" y="14" width="112" height="42" rx="2" />
      <rect className="glyph-axis" x="20" y="20" width="100" height="30" />
      <line className="glyph-stroke" x1="70" y1="28" x2="70" y2="42" />
      <path className="glyph-stroke" d="M 76 30 C 76 28, 74 27, 70 27 C 66 27, 64 29, 64 32 C 64 36, 76 36, 76 39 C 76 42, 74 43, 70 43 C 66 43, 64 41, 64 39" />
      <line className="glyph-axis" x1="14" y1="74" x2="126" y2="74" />
      {coupons.map((x, i) => (
        <g
          key={i}
          className="glyph-coupon"
          style={{ animationDelay: `${(i * 0.22).toFixed(2)}s` }}
        >
          <line className="glyph-stroke" x1={x} y1="74" x2={x} y2="64" />
          <path className="glyph-stroke" d={`M ${x - 3} 67 L ${x} 64 L ${x + 3} 67`} />
        </g>
      ))}
    </svg>
  )
}

/* 06 — Credit scorecard: needle sweeps gently around target score */
function ScoreGauge() {
  return (
    <svg viewBox={VIEW} className="glyph glyph-gauge" aria-hidden="true">
      <path className="glyph-axis" d="M 22 64 A 48 48 0 0 1 118 64" />
      <path className="glyph-stroke" d="M 22 64 A 48 48 0 0 1 102 32" />
      <line className="glyph-axis" x1="22" y1="64" x2="22" y2="58" />
      <line className="glyph-axis" x1="34" y1="38" x2="38" y2="42" />
      <line className="glyph-axis" x1="58" y1="22" x2="60" y2="28" />
      <line className="glyph-axis" x1="82" y1="22" x2="80" y2="28" />
      <line className="glyph-axis" x1="106" y1="38" x2="102" y2="42" />
      <line className="glyph-axis" x1="118" y1="64" x2="118" y2="58" />
      <g className="glyph-needle">
        <line className="glyph-stroke" x1="70" y1="64" x2="102" y2="32" />
        <circle className="glyph-node" cx="70" cy="64" r="3.5" />
      </g>
      <line className="glyph-axis" x1="56" y1="78" x2="84" y2="78" />
    </svg>
  )
}

const KIND = {
  dashboard: Dashboard,
  pipeline: Pipeline,
  panel: PanelData,
  tree: ModelTree,
  bond: Bond,
  gauge: ScoreGauge,
}

function ProjectGlyph({ kind }) {
  const Glyph = KIND[kind]
  if (!Glyph) return null
  return <Glyph />
}

export default ProjectGlyph
