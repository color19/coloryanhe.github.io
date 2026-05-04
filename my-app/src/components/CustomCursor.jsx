import { useEffect, useRef } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Pointer: fine = mouse / trackpad. Skip on touch-only devices.
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx - 6}px, ${my - 6}px, 0)`
    }

    const tick = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      dot.classList.add('is-hover')
      ring.classList.add('is-hover')
    }
    const onLeave = () => {
      dot.classList.remove('is-hover')
      ring.classList.remove('is-hover')
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, .magnetic, .project',
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  )
}

export default CustomCursor
