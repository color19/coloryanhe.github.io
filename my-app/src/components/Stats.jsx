import BeadChart from './BeadChart'

const stats = [
  { num: '4.0', decimals: 1, suffix: '', label: 'GPA', color: 'var(--r)', bead: 'gpa' },
  { num: '4', decimals: 0, suffix: '', label: 'Internships', color: 'var(--o)', bead: 'internships' },
  { num: '6', decimals: 0, suffix: '', label: 'Projects', color: 'var(--g)', bead: 'projects' },
  { num: 'DC', isText: true, label: 'Based in', color: 'var(--b)', bead: 'pin' },
]

function Stats() {
  return (
    <section className="stats" data-section="stats" aria-label="At a glance">
      <div className="stats-row">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-bead" aria-hidden="true">
              <BeadChart kind={s.bead} />
            </div>
            <div
              className="stat-num"
              style={{ color: s.color }}
              data-countup={s.isText ? undefined : s.num}
              data-decimals={s.decimals}
              data-suffix={s.suffix}
            >
              {s.isText ? s.num : `0${s.suffix || ''}`}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
