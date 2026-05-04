const STOPS = [
  { id: 'work', label: 'Work', color: 'var(--r)' },
  { id: 'workspace', label: 'Setup', color: 'var(--y)' },
  { id: 'about', label: 'About', color: 'var(--g)' },
  { id: 'contact', label: 'Contact', color: 'var(--v)' },
]

function SpectrumSpine() {
  return (
    <aside className="spectrum-spine" aria-hidden="true">
      <div className="spine-track" />
      <div className="spine-progress" />
      <div className="spine-dot" />
      <ul className="spine-stops">
        {STOPS.map((stop) => (
          <li
            key={stop.id}
            className="spine-stop"
            data-stop={stop.id}
            style={{ '--stop-color': stop.color }}
          >
            <span className="spine-stop-tick" />
            <span className="spine-stop-label">{stop.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SpectrumSpine
