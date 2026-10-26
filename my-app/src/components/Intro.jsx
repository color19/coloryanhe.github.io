const notes = [
  {
    label: '01 · Who I am',
    body: 'A financial economist by training and a builder by habit. I’ve done fixed income research at a Chinese brokerage, data pipeline work at State Street, and credit risk modeling, and when the tools I need don’t exist, I build them.',
  },
  {
    label: '02 · Where I’m going',
    body: 'Onto a team in investment banking, research, or quant, where rigor is the baseline and the work has to make sense to people who didn’t build it.',
  },
  {
    label: '03 · Why finance',
    body: 'Because it’s where careful thinking compounds. A model no one understands is just noise. I want to build the kind people actually use.',
  },
]

function Intro() {
  return (
    <section className="intro paper" aria-label="About me">
      <div className="wrap intro-grid">
        {notes.map((n) => (
          <div key={n.label} data-reveal>
            <p className="eyebrow">{n.label}</p>
            <p>{n.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Intro
