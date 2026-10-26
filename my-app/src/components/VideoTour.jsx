import { useEffect, useRef } from 'react'

function VideoTour({ open, onClose }) {
  const dialogRef = useRef(null)
  const videoRef = useRef(null)

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
        />
        <p className="tour-note">
          Recorded on my personal copy. The open-source version runs in English and Chinese,
          with 20 original sample questions.
        </p>
      </div>
    </dialog>
  )
}

export default VideoTour
