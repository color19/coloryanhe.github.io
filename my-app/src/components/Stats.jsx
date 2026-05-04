const stats = [
  { num: '4.0', decimals: 1, suffix: '', label: 'GPA', color: 'var(--r)' },
  { num: '2', decimals: 0, suffix: '+', label: 'Internships', color: 'var(--o)' },
  { num: '3', decimals: 0, suffix: '+', label: 'Projects', color: 'var(--g)' },
  { num: 'DC', isText: true, label: 'Based in', color: 'var(--b)' },
]

function Stats() {
  return (
    <section className="stats" data-section="stats" aria-label="At a glance">
      <div className="stats-row">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
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
