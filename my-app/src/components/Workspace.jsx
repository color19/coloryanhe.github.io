const items = [
  { label: 'Languages', value: 'Python \u00B7 R \u00B7 SQL' },
  { label: 'Finance Tools', value: 'Bloomberg Terminal \u00B7 Excel' },
  { label: 'Visualization', value: 'Power BI \u00B7 ggplot2 \u00B7 matplotlib' },
  { label: 'Research', value: 'Fixed Income \u00B7 Credit \u00B7 Macro' },
  { label: 'Education', value: 'M.S. Financial Economics \u00B7 Johns Hopkins' },
  { label: 'Currently Reading', value: 'Volatility surfaces \u00B7 VIX dynamics' },
]

function Workspace() {
  return (
    <section id="workspace">
      <div className="section-header scroll-reveal">
        <span className="section-num">02</span>
        <h2>My Setup</h2>
      </div>
      <div className="workspace-grid">
        {items.map((item) => (
          <div className="workspace-item scroll-reveal" key={item.label}>
            <div className="workspace-label">{item.label}</div>
            <div className="workspace-val">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workspace
