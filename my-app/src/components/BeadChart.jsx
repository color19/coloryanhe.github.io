/* Perler-bead mini charts. Each "bead" is a donut — a filled circle with a
   hole punched through, like a real fuse bead on a pegboard. Every chart sits
   on a visible pegboard (faint empty peg holes), and beads pop in one-by-one
   on scroll (set up in useScrollAnimations), as if being placed by hand.

   Coordinates are in pegboard units; U is the peg pitch. All boards are five
   rows tall so the four charts share a baseline. Shading uses explicit color
   steps (not opacity) so beads stay crisp on the dark background. */

const U = 12
const BEAD_R = 4.7
const HOLE_R = 1.7
const PEG_R = 1.6

const GREY = '#3a3736'
const GREY_TIP = '#514a48'

/* Bottom-to-top / left-to-right color ramps toward each accent */
const REDS = ['#6e3a3a', '#8a4848', '#a65656', '#c06060', '#d46a6a']
const ORANGES = ['#63492a', '#7a5a33', '#916b3c', '#a87c45', '#bf8b4b', '#d49a50']

/* GPA — grey bars climbing, then the 4.0 column in full red */
const gpa = { cols: 4, rows: 5, cells: [] }
;[2, 3, 4].forEach((h, col) => {
  for (let k = 0; k < h; k++) {
    gpa.cells.push({ x: col, y: 4 - k, c: k === h - 1 ? GREY_TIP : GREY })
  }
})
for (let k = 0; k < 5; k++) gpa.cells.push({ x: 3, y: 4 - k, c: REDS[k] })

/* Internships — a sparkline stepping up, brightening as it climbs */
const internships = {
  cols: 6,
  rows: 5,
  cells: [
    { x: 0, y: 4 }, { x: 1, y: 3 }, { x: 2, y: 3 },
    { x: 3, y: 2 }, { x: 4, y: 1 }, { x: 5, y: 0 },
  ].map((p, i) => ({ ...p, c: ORANGES[i] })),
}

/* Projects — six beads, six colors: the pegboard version of the portfolio */
const projects = {
  cols: 5,
  rows: 5,
  cells: [
    { x: 1, y: 1, c: 'var(--r)' }, { x: 2, y: 1, c: 'var(--o)' }, { x: 3, y: 1, c: 'var(--y)' },
    { x: 1, y: 2, c: 'var(--g)' }, { x: 2, y: 2, c: 'var(--b)' }, { x: 3, y: 2, c: 'var(--v)' },
  ],
}

/* Based in DC — a map pin: round blue head, light center, tapered tail */
const B = 'var(--b)'
const pin = {
  cols: 5,
  rows: 5,
  cells: [
    { x: 1, y: 1, c: B }, { x: 2, y: 1, c: B }, { x: 3, y: 1, c: B },
    { x: 0, y: 2, c: B }, { x: 1, y: 2, c: B }, { x: 2, y: 2, c: '#e4f1ff' }, { x: 3, y: 2, c: B }, { x: 4, y: 2, c: B },
    { x: 1, y: 3, c: B }, { x: 2, y: 3, c: B }, { x: 3, y: 3, c: B },
    { x: 2, y: 4, c: '#7fbcff' },
  ],
}

const KIND = { gpa, internships, projects, pin }

function BeadChart({ kind }) {
  const chart = KIND[kind]
  if (!chart) return null

  const { cols, rows, cells } = chart
  const w = cols * U
  const h = rows * U
  const taken = new Set(cells.map((c) => `${c.x},${c.y}`))

  const pegs = []
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (!taken.has(`${x},${y}`)) pegs.push({ x, y })
    }
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="bead-chart" style={{ height: `${h}px` }} aria-hidden="true">
      {pegs.map((p, i) => (
        <circle
          key={`p${i}`}
          className="peg"
          cx={(p.x + 0.5) * U}
          cy={(p.y + 0.5) * U}
          r={PEG_R}
          fill="rgba(255, 255, 255, 0.07)"
        />
      ))}
      {cells.map((cell, i) => {
        const cx = (cell.x + 0.5) * U
        const cy = (cell.y + 0.5) * U
        return (
          <g key={i} className="bead" style={{ color: cell.c }}>
            <circle cx={cx} cy={cy} r={BEAD_R} fill="currentColor" />
            <circle cx={cx} cy={cy} r={HOLE_R} fill="var(--bg)" />
          </g>
        )
      })}
    </svg>
  )
}

export default BeadChart
