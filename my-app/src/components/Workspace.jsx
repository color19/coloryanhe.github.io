const items = [
  { label: 'Languages', value: 'Python · R · SQL', color: 'var(--r)' },
  { label: 'Finance Tools', value: 'Bloomberg Terminal · Excel', color: 'var(--o)' },
  { label: 'Visualization', value: 'Power BI · ggplot2 · matplotlib', color: 'var(--y)' },
  { label: 'Research', value: 'Fixed Income · Credit · Macro', color: 'var(--g)' },
  { label: 'Education', value: 'M.S. Financial Economics · Johns Hopkins', color: 'var(--b)' },
  { label: 'Currently Reading', value: 'Volatility surfaces · VIX dynamics', color: 'var(--v)' },
]

function Workspace() {
  return (
    <section id="workspace" className="workspace" data-section="workspace">
      <header className="flow-header">
        <span className="flow-eyebrow">My Setup</span>
        <h2 className="flow-title">
          Tools that <em>earn their keep.</em>
        </h2>
      </header>
      <ul className="workspace-list">
        {items.map((item) => (
          <li
            className="workspace-row"
            key={item.label}
            style={{ '--row-color': item.color }}
          >
            <span className="workspace-row-label">{item.label}</span>
            <span className="workspace-row-rule" aria-hidden="true" />
            <span className="workspace-row-value">{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workspace
