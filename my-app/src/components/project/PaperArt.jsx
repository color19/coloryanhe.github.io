import { useId } from 'react'

/* Cut-paper illustrations: plain shapes pushed through a noise displacement
   filter so every edge looks hand-cut. Decorative only. */

const C = {
  blue: '#2f55b8',
  brick: '#ce4631',
  ochre: '#e2a43b',
  green: '#3d7a52',
  paper: '#f6f2e8',
}

const SCENES = {
  /* hero mark: three holdings of different weight */
  mark: (
    <>
      <circle cx="44" cy="40" r="26" fill={C.blue} />
      <rect x="52" y="44" width="38" height="34" rx="4" fill={C.brick} />
      <circle cx="30" cy="80" r="12" fill={C.ochre} />
    </>
  ),
  /* the app: a portfolio of uneven holdings */
  app: (
    <>
      <rect x="28" y="30" width="112" height="92" rx="6" fill={C.blue} />
      <circle cx="62" cy="128" r="30" fill={C.brick} />
      <rect x="118" y="86" width="74" height="62" rx="5" fill={C.ochre} transform="rotate(-6 155 117)" />
      <circle cx="204" cy="150" r="14" fill={C.green} />
      <circle cx="186" cy="34" r="16" fill={C.paper} />
    </>
  ),
  /* the tour: a play button */
  tour: (
    <>
      <circle cx="112" cy="86" r="64" fill={C.paper} />
      <path d="M92 48 L160 86 L92 124 Z" fill={C.ochre} />
      <rect x="34" y="150" width="172" height="14" rx="3" fill={C.brick} transform="rotate(-3 120 157)" />
    </>
  ),
  /* the source: lines of code */
  source: (
    <>
      <rect x="26" y="26" width="188" height="16" rx="3" fill={C.brick} />
      <rect x="26" y="54" width="96" height="74" rx="4" fill={C.blue} />
      <rect x="132" y="54" width="68" height="74" rx="4" fill={C.ochre} />
      <circle cx="166" cy="140" r="18" fill={C.green} />
      <rect x="26" y="142" width="120" height="10" rx="2" fill={C.paper} />
    </>
  ),
  /* target weights vs holdings */
  weights: (
    <>
      <rect x="22" y="36" width="82" height="64" rx="4" fill={C.brick} />
      <rect x="108" y="36" width="82" height="64" rx="4" fill={C.blue} />
      <rect x="22" y="112" width="168" height="16" rx="3" fill={C.ochre} />
    </>
  ),
  /* spaced comebacks on days 1, 3, 7, 14, 29 */
  comebacks: (
    <>
      <rect x="18" y="104" width="196" height="14" rx="3" fill={C.ochre} />
      {[1, 3, 7, 14, 29].map((d, i) => (
        <circle key={d} cx={26 + (d / 29) * 176} cy="78" r={9 + i * 2} fill={i % 2 ? C.brick : C.blue} />
      ))}
    </>
  ),
}

function PaperArt({ kind, size = 240, label }) {
  const id = useId().replace(/:/g, '')
  const vb = kind === 'mark' ? '0 0 100 100' : '0 0 240 180'
  return (
    <svg
      className={`paper-art paper-${kind}`}
      viewBox={vb}
      width={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <filter id={`cut-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#cut-${id})`}>{SCENES[kind]}</g>
    </svg>
  )
}

/* Hand-drawn arrows for the Caveat margin notes */
const ARROWS = {
  curl: 'M20 6 C 8 14, 10 30, 22 30 C 32 30, 30 18, 20 22 C 12 26, 14 44, 18 56 M11 48 L18 57 L24 48',
  down: 'M18 4 C 26 18, 10 32, 18 54 M11 46 L18 55 L25 46',
  swoop: 'M4 8 C 30 4, 52 18, 54 50 M46 43 L54 51 L60 42',
}

export function HandArrow({ kind = 'down', className = '' }) {
  const w = kind === 'swoop' ? 64 : 36
  return (
    <svg className={`hand-arrow ${className}`} viewBox={`0 0 ${w} 60`} width={w} height="60" aria-hidden="true">
      <path d={ARROWS[kind]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default PaperArt
