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
    status: 'Open source · in English and Chinese',
    page: '/projects/studyroom/',
    tour: true,
    art: 'allocation',
    note: 'target weight → rebalance',
  },
  {
    tone: 'sage',
    kicker: 'Time, budgeted',
    title: 'Runway',
    desc: 'A calendar that works backwards from every deadline and tells me today’s pace: hold it and I land on time. Fall behind and the shortfall gets spread over the days left, like amortizing a debt.',
    live: 'https://color19.github.io/runway/en/',
    source: 'https://github.com/color19/runway',
    status: 'Open source · in English and Chinese',
    art: 'glide',
    note: 'deadline → daily pace',
  },
  {
    tone: 'mist',
    kicker: 'Runs every market day',
    title: 'Autotrader',
    desc: 'An AI trading agent that runs on its own schedule. Each morning it reads the news for the day’s themes, builds a list of candidates, has a panel of LLM analysts argue each one, and places small trades with take-profit rules. Then it keeps score: every rating is checked against the stock’s return 1, 5 and 20 trading days later, against the S&P 500.',
    status: 'Private · built on the open-source TradingAgents framework',
    art: 'signal',
    note: 'news → rating → trade → score',
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
            I build tools when the ones I need don&rsquo;t exist, these days
            with AI agents, and then I use them. Three projects, one thread:
            each turns a decision I kept overthinking into a number I can act on.
          </p>
        </div>

        <div className="project-cards">
          {projects.map((p) => (
            <article key={p.title} id={`project-${p.title.toLowerCase()}`} className={`project-card tone-${p.tone}`} data-reveal>
              <div>
                <p className="kicker">{p.kicker}</p>
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="project-actions">
                  {p.page && (
                    <a className="btn btn-solid" href={p.page}>
                      Explore {p.title} <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {p.tour && (
                    <button type="button" className="btn btn-text" onClick={() => setTourOpen(true)}>
                      Watch the 74s tour
                    </button>
                  )}
                  {p.live && (
                    <a
                      className={p.page ? 'btn btn-text' : 'btn btn-solid'}
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try it live <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {!p.page && p.source && (
                    <a className="btn btn-text" href={p.source} target="_blank" rel="noopener noreferrer">
                      Source
                    </a>
                  )}
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
          Studyroom and Runway are single HTML files that run in the browser, with no account and no server. Your data stays on your machine.
        </p>
      </div>

      <VideoTour open={tourOpen} onClose={() => setTourOpen(false)} />
    </section>
  )
}

export default Projects
