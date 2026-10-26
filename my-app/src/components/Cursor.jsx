import { useEffect, useRef } from 'react'

/* A brick dot that replaces the mouse pointer: it eases after the pointer,
   swells into a translucent disc over anything clickable, turns navy over
   brick surfaces, and steps aside for the native cursor while a modal dialog
   is open (dialogs render above every z-index). Mouse and trackpad only. */

const CLICKABLE = 'a, button, summary, label, [role="button"], [role="radio"]'

function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    const root = document.documentElement
    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.32
    let x = -100
    let y = -100
    let tx = -100
    let ty = -100
    let raf = 0

    const tick = () => {
      x += (tx - x) * ease
      y += (ty - y) * ease
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      const modal = !!document.querySelector('dialog[open]')
      root.classList.toggle('has-cursor', !modal)
      el.classList.toggle('is-on', !modal)
      const t = e.target instanceof Element ? e.target : null
      el.classList.toggle('is-hover', !!t?.closest(CLICKABLE))
      el.classList.toggle('is-ink', !!t?.closest('[data-cursor="ink"]'))
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => el.classList.remove('is-on')
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')

    root.classList.add('has-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />
}

export default Cursor
