import { useState } from 'react'
import PaperArt, { HandArrow } from './PaperArt'
import { TopBar, SectionMarker, ProjectFooter } from './ProjectChrome'
import VideoTour from '../VideoTour'
import Cursor from '../Cursor'
import '../../App.css'
import './project.css'

const LIVE = 'https://color19.github.io/studyroom/'
const SOURCE = 'https://github.com/color19/studyroom'

const PREMISE = [
  { text: 'Everyone studies more before an exam. Few study where the exam is weighted. Hours drift toward the subjects you already like.' },
  { text: 'Studyroom rebalances you toward what you’re underweight in.', accent: true },
]

/* Split the statement into words; each lights up over its own slice of the
   pinned scroll range */
function Premise() {
  const words = PREMISE.flatMap((s) => s.text.split(' ').map((w) => ({ w, accent: s.accent })))
  const span = 70 / words.length
  return (
    <section className="pj-premise paper" data-marker="The premise" aria-label="The premise">
      <div className="pj-premise-pin wrap">
        <p className="pj-premise-text">
          {words.map((x, i) => (
            <span
              key={i}
              className={`pj-word${x.accent ? ' is-accent' : ''}`}
              style={{ animationRange: `contain ${(5 + i * span).toFixed(1)}% contain ${(5 + (i + 1) * span).toFixed(1)}%` }}
            >
              {x.w}{' '}
            </span>
          ))}
        </p>
        <aside className="pj-not">
          <p className="eyebrow">What you will not find here</p>
          <ul>
            <li><s>A sign-up form.</s></li>
            <li><s>A subscription.</s></li>
            <li><s>Questions I don&rsquo;t have the rights to.</s></li>
          </ul>
          <p className="pj-not-after">Bring your own bank, or start with twenty I wrote.</p>
        </aside>
      </div>
    </section>
  )
}

function Shelf({ onTour }) {
  const items = [
    {
      art: 'app',
      note: 'start here',
      arrow: 'curl',
      title: 'The app',
      badge: 'Free to open',
      desc: 'Runs in your browser with twenty original sample questions. Import your own question bank when you’re ready.',
      cta: { label: 'Open Studyroom', href: LIVE },
    },
    {
      art: 'tour',
      note: 'no time? watch first',
      arrow: 'down',
      title: 'The tour',
      badge: '75 seconds',
      desc: 'A captioned walk through my own copy, recorded in the middle of my Level I prep.',
      cta: { label: 'Watch the tour', onClick: onTour },
    },
    {
      art: 'source',
      note: 'fork it',
      arrow: 'swoop',
      title: 'The source',
      badge: 'MIT license',
      desc: 'A single-file app built from a handful of source files. Fork it for any multiple-choice exam.',
      cta: { label: 'Read the source', href: SOURCE },
    },
  ]
  return (
    <section className="pj-shelf" data-marker="The shelf">
      <div className="wrap">
        <h2 className="pj-h2">On the shelf.</h2>
        <div className="pj-shelf-grid">
          {items.map((it) => (
            <article key={it.title} className="pj-item">
              <p className="hand pj-item-note">{it.note}</p>
              <HandArrow kind={it.arrow} className="pj-item-arrow" />
              <PaperArt kind={it.art} />
              <h3>
                {it.title}
                <span className="pj-badge">{it.badge}</span>
              </h3>
              <p className="pj-item-desc">{it.desc}</p>
              {it.cta.href ? (
                <a className="pj-item-link" href={it.cta.href} target="_blank" rel="noopener noreferrer">
                  {it.cta.label} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <button type="button" className="pj-item-link" onClick={it.cta.onClick}>
                  {it.cta.label} <span aria-hidden="true">▶</span>
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItThinks() {
  return (
    <section className="pj-how paper" data-marker="How it thinks">
      <div className="wrap">
        <h2 className="pj-h2">How it thinks.</h2>
        <div className="pj-how-grid">
          <div className="pj-how-cols">
            <div className="pj-how-col">
              <span className="pj-rule" aria-hidden="true" />
              <PaperArt kind="weights" size={200} />
              <h3>Target weights</h3>
              <p>
                The syllabus says how much each subject is worth. That&rsquo;s the target
                allocation. What you&rsquo;ve practiced is what you actually hold. Each daily
                set of twenty draws new questions by those weights, with your due mistakes
                mixed in.
              </p>
            </div>
            <div className="pj-how-col">
              <span className="pj-rule" aria-hidden="true" />
              <PaperArt kind="comebacks" size={200} />
              <h3>Spaced comebacks</h3>
              <p>
                Miss a question and it comes back on days 1, 3, 7, 14 and 29. Set your exam
                date and the schedule compresses so every miss gets five rounds before the
                exam.
              </p>
            </div>
          </div>
          <figure className="pj-how-shot">
            <img
              src="/shots/studyroom.jpg"
              alt="Studyroom dashboard: ten CFA topics as holdings against their exam-weight targets"
              loading="lazy"
            />
            <figcaption className="hand">my copy, mid-prep</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function Start() {
  return (
    <section className="pj-start paper" data-marker="Start">
      <div className="wrap">
        <h2 className="pj-h2">Start with your weakest subject.</h2>
        <p>
          Pick the subject you&rsquo;re most underweight in and do twenty questions. If it
          doesn&rsquo;t help, tell me why.
        </p>
        <div className="pj-start-actions">
          <a className="btn btn-solid" href={LIVE} target="_blank" rel="noopener noreferrer">
            Open Studyroom <span aria-hidden="true">↗</span>
          </a>
          <a className="btn btn-text" href="mailto:yanhe2026@gmail.com">yanhe2026@gmail.com</a>
        </div>
      </div>
    </section>
  )
}

function StudyroomPage() {
  const [tourOpen, setTourOpen] = useState(false)
  return (
    <>
      <Cursor />
      <TopBar />
      <main id="top">
        <header className="pj-hero paper">
          <PaperArt kind="mark" size={96} label="Studyroom mark" />
          <h1 className="pj-title">Studyroom</h1>
          <p className="pj-sub">
            I built the CFA study app I wanted: it treats the syllabus like a portfolio.{' '}
            <b>Free, open source, one HTML file.</b>
          </p>
          <p className="hand pj-hero-note">try it, down here</p>
          <HandArrow kind="curl" className="pj-hero-arrow" />
        </header>
        <Premise />
        <Shelf onTour={() => setTourOpen(true)} />
        <HowItThinks />
        <Start />
      </main>
      <ProjectFooter />
      <SectionMarker />
      <VideoTour open={tourOpen} onClose={() => setTourOpen(false)} />
    </>
  )
}

export default StudyroomPage
