function Stats() {
  return (
    <div className="stats-strip">
      <div className="stat">
        <div className="stat-num rainbow">4.0</div>
        <div className="stat-label">GPA</div>
      </div>
      <div className="stat">
        <div className="stat-num" style={{ color: 'var(--o)' }}>2+</div>
        <div className="stat-label">Internships</div>
      </div>
      <div className="stat">
        <div className="stat-num" style={{ color: 'var(--g)' }}>3+</div>
        <div className="stat-label">Projects</div>
      </div>
      <div className="stat">
        <div className="stat-num" style={{ color: 'var(--b)' }}>DC</div>
        <div className="stat-label">Based in</div>
      </div>
    </div>
  )
}

export default Stats
