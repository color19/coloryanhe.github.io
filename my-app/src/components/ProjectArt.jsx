/* Line drawings for the project cards. Strokes use currentColor so each
   card's ink color carries through; the brick accent marks the one thing
   that moves. */

const VIEW = '0 0 220 170'
const BRICK = 'var(--brick)'

/* Studyroom — a risk/return bubble chart; the underweight subject gets
   rebalanced toward its target */
function Allocation() {
  return (
    <svg viewBox={VIEW} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M22 18 V146 H204" />
      <line x1="22" y1="62" x2="204" y2="62" stroke={BRICK} strokeDasharray="4 5" />
      <circle cx="72" cy="50" r="14" />
      <circle cx="126" cy="74" r="10" />
      <circle cx="170" cy="96" r="19" />
      <circle cx="50" cy="112" r="9" fill={BRICK} stroke={BRICK} />
      <circle cx="104" cy="112" r="9" strokeDasharray="3 4" />
      <path d="M64 112 H88 M82 106 L89 112 L82 118" stroke={BRICK} />
    </svg>
  )
}

/* Runway — a glide path from today (dot) down to the deadline (touchdown) */
function Glide() {
  const dashes = [[136, 126], [114, 106], [96, 90], [82, 77], [70, 66]]
  return (
    <svg viewBox={VIEW} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="14" y1="52" x2="206" y2="52" opacity="0.45" />
      <path d="M58 156 L98 56 M162 156 L122 56" />
      {dashes.map(([y1, y2]) => (
        <line key={y1} x1="110" y1={y1} x2="110" y2={y2} />
      ))}
      <path d="M68 150 H152" />
      <path d="M196 14 C178 50 140 92 112 120" strokeDasharray="2 6" />
      <path d="M167 67 L158 70 L159 60.6" />
      <circle cx="196" cy="14" r="3.5" fill="currentColor" />
      <circle cx="112" cy="122" r="4.5" fill={BRICK} stroke={BRICK} />
    </svg>
  )
}

const KIND = { allocation: Allocation, glide: Glide }

function ProjectArt({ kind }) {
  const Art = KIND[kind]
  return Art ? <Art /> : null
}

export default ProjectArt
