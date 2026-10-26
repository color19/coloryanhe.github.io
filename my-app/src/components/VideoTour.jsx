import { useEffect, useRef, useState } from 'react'

/* English captions for the Chinese demo video, shown under the player so they
   don't collide with the subtitles burned into the frames. Times are seconds. */
const cues = [
  { at: 0, h: '6,764 questions, one web page', t: 'Studying for CFA Level I, I vibe-coded my own practice app.' },
  { at: 4.5, h: 'Ten subjects, one portfolio', t: 'Syllabus weights are the target allocation. The questions I’ve done are my holdings.' },
  { at: 9.5, h: 'Subjects on a risk/return chart', t: 'Further right means practiced more. Higher means more first-try accuracy.' },
  { at: 14, h: 'Rebalance daily, or sit a full mock', t: '20 questions a day, drawn by syllabus weight, or a full timed mock exam.' },
  { at: 18.5, h: 'Inside a question', t: 'One-tap translation, key-term definitions, and a tag for why I got it wrong.' },
  { at: 25.5, h: 'Unfinished? Pick it up', t: 'Pause anytime. Close the tab and come back to the same question.' },
  { at: 29.5, h: 'A rebalancing receipt for every set', t: 'See at a glance which subjects are overweight and which are still behind.' },
  { at: 33.5, h: 'Mistakes, filed into 633 knowledge points', t: 'Weak points rank themselves, so review happens in priority order.' },
  { at: 39.5, h: 'Five reviews, done before exam day', t: 'Set the exam date and spaced-repetition intervals compress to fit.' },
  { at: 44.5, h: 'Every set, on the record', t: 'What I chose, what was right, and where I went wrong.' },
  { at: 49.5, h: 'Notes that file themselves', t: 'Every note lands under its subject and chapter.' },
  { at: 53.5, h: '1,100 pages in, 633 cards out', t: 'AI condensed my study notes into knowledge cards, each checked line by line.' },
  { at: 60.5, h: 'LaTeX, previewed live', t: 'Formulas are editable and sync automatically.' },
  { at: 64.5, h: 'A one-page cheat sheet', t: 'Weakest points, my notes, and repeat mistakes, ready to print.' },
  { at: 68.5, h: 'CFA Level I Studyroom', t: 'One HTML file. Works offline. A study tool I built for myself, with AI.' },
]

function cueAt(time) {
  let i = 0
  while (i + 1 < cues.length && cues[i + 1].at <= time) i++
  return i
}

function VideoTour({ open, onClose }) {
  const dialogRef = useRef(null)
  const videoRef = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const d = dialogRef.current
    const v = videoRef.current
    if (!d || !v) return
    if (open) {
      if (!d.open) d.showModal()
      v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
      if (d.open) d.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="tour"
      aria-labelledby="tour-title"
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
    >
      <div className="tour-inner">
        <div className="tour-top">
          <p id="tour-title" className="eyebrow">Studyroom · 75-second tour</p>
          <button type="button" className="tour-close" onClick={onClose} aria-label="Close tour">×</button>
        </div>
        <video
          ref={videoRef}
          src="/tour/studyroom-tour.mp4"
          poster="/tour/studyroom-tour.jpg"
          muted
          playsInline
          controls
          preload="none"
          onTimeUpdate={(e) => setIdx(cueAt(e.currentTarget.currentTime))}
        />
        <div className="tour-caption" aria-live="polite">
          <span className="tour-step">{String(idx + 1).padStart(2, '0')} / {cues.length}</span>
          <div>
            <b>{cues[idx].h}</b>
            <p>{cues[idx].t}</p>
          </div>
        </div>
        <p className="tour-note">
          The interface is in Chinese: it&rsquo;s built for Chinese-speaking candidates
          preparing for an English-language exam. Recorded on my personal copy; the
          open-source version ships with 20 original sample questions.
        </p>
      </div>
    </dialog>
  )
}

export default VideoTour
