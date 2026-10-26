import { useState } from 'react'
import ProjectArt from './ProjectArt'
import VideoTour from './VideoTour'

const projects = [
  {
    tone: 'cream',
    kicker: 'Start here',
    title: 'Studyroom',
    desc: 'A study app that treats the CFA curriculum like a portfolio. Syllabus weights are the target allocation, practiced questions are the holdings, and every session is a rebalancing trade toward whatever I’m underweight in.',
    live: 'https://color19.github.io/studyroom/',
    source: 'https://github.com/color19/studyroom',
    status: 'Open source · Chinese UI, for Chinese-speaking candidates',
    tour: true,
    art: 'allocation',
    note: 'target weight → rebalance',
  },
  {
    tone: 'sage',
    kicker: 'Time, budgeted',
    title: 'Runway',
    desc: 'A calendar that works backwards from every deadline and tells me today’s pace: hold it and I land on time. Fall behind and the shortfall gets spread over the days left, like amortizing a debt.',
    live: 'https://color19.github.io/runway/',
    source: 'https://github.com/color19/runway',
    status: 'Open source',
    art: 'glide',
    note: 'deadline → daily pace',
  },
]

/* Fixed star positions so the sky doesn't reshuffle on every render */
const stars = Array.from({ length: 70 }, (_, i) => {
  const x = (i * 73.13) % 100
  const y = (i * 41.77 + (i % 7) * 9.3) % 100
  const r = i % 9 === 0 ? 1.3 : i % 3 === 0 ? 0.9 : 0.6
  return { x, y, r, o: 0.25 + ((i * 17) % 50) / 100 }
})

function Projects() {
  const [tourOpen, setTourOpen] = useState(false)

  return (
    <section id="projects" className="projects">
      <svg className="stars" aria-hidden="true">
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#faf8f2" opacity={s.o} />
        ))}
      </svg>

      <div className="wrap">
        <div className="projects-head" data-reveal>
          <h2>
            Messy decisions.
            <br />
            Clean numbers.
          </h2>
          <p>
            I build tools when the ones I need don&rsquo;t exist. Two
            projects, one thread: each turns a decision I kept overthinking
            into a number I can act on.
          </p>
        </div>

        <div className="project-cards">
          {projects.map((p) => (
            <article key={p.title} className={`project-card tone-${p.tone}`} data-reveal>
              <div>
                <p className="kicker">{p.kicker}</p>
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="project-actions">
                  {p.tour && (
                    <button type="button" className="btn btn-solid" onClick={() => setTourOpen(true)}>
                      <span aria-hidden="true">▶</span> Watch the 75s tour
                    </button>
                  )}
                  <a
                    className={p.tour ? 'btn btn-text' : 'btn btn-solid'}
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try it live <span aria-hidden="true">↗</span>
                  </a>
                  <a className="btn btn-text" href={p.source} target="_blank" rel="noopener noreferrer">
                    Source
                  </a>
                  <span className="project-status">{p.status}</span>
                </div>
              </div>
              <div className="project-art">
                <ProjectArt kind={p.art} />
                <p className="hand">{p.note}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="projects-foot">
          Both are single HTML files that run in the browser, with no account and no server. Your data stays on your machine.
        </p>
      </div>

      <VideoTour open={tourOpen} onClose={() => setTourOpen(false)} />
    </section>
  )
}

export default Projects
