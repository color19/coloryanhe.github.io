import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'expo.out'
const EASE_IO = 'power3.inOut'

/* Per-section accent — drives the ambient field + spine dot.
   The page background "radiates" the foreground accent currently in view. */
const SECTION_ACCENT = {
  hero: 'var(--v)',       // opens with violet/magenta
  stats: 'var(--r)',      // first warm color
  work: 'var(--o)',       // baseline for portfolio (each project overrides)
  workspace: 'var(--b)',
  about: 'var(--g)',
  contact: 'var(--v)',    // closes back to violet
}

const PROJECT_ACCENT = {
  r: 'var(--r)', o: 'var(--o)', y: 'var(--y)',
  g: 'var(--g)', b: 'var(--b)', v: 'var(--v)',
}

/* Secondary lags one stop behind for depth in the second orb */
const SECONDARY_OFFSET = {
  'var(--r)': 'var(--v)',
  'var(--o)': 'var(--r)',
  'var(--y)': 'var(--o)',
  'var(--g)': 'var(--y)',
  'var(--b)': 'var(--g)',
  'var(--v)': 'var(--b)',
}

export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document
        .querySelectorAll('.scroll-reveal')
        .forEach((el) => el.classList.add('revealed'))
      return
    }

    const ctx = gsap.context(() => {
      gsap.set('.scroll-reveal', { opacity: 0, y: 36 })

      /* ============================================================
         GLOBAL SCROLL-DRIVEN STATE
         The page shares CSS vars updated as the user scrolls:
         --spine-progress  (0–1)  — height of the spine progress bar
         --active-color    (color) — the foreground accent the bg radiates
         --active-color-2  (color) — secondary, lags one stop behind
         ============================================================ */
      const ambientField = document.querySelector('.ambient-field')
      const spine = document.querySelector('.spectrum-spine')
      const navbar = document.querySelector('.navbar')
      const stops = Array.from(document.querySelectorAll('.spine-stop'))

      const setAccent = (color) => {
        if (!ambientField) return
        ambientField.style.setProperty('--active-color', color)
        ambientField.style.setProperty(
          '--active-color-2',
          SECONDARY_OFFSET[color] || color,
        )
      }

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (spine) spine.style.setProperty('--spine-progress', self.progress)
          if (navbar) navbar.classList.toggle('is-scrolled', self.scroll() > 80)
        },
      })

      /* Section-level accents: ambient takes the section's color while the
         section is the dominant thing on screen. */
      const sections = Array.from(document.querySelectorAll('[data-section]'))
      sections.forEach((sec) => {
        const id = sec.getAttribute('data-section')
        const accent = SECTION_ACCENT[id]

        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            stops.forEach((s) => {
              s.classList.toggle('is-active', self.isActive && s.dataset.stop === id)
            })
            if (self.isActive && accent) setAccent(accent)
          },
        })
      })

      /* Per-project accents override the work-section default — each project
         has its own color and the background radiates THAT specific hue while
         the project is in view. */
      gsap.utils.toArray('.project').forEach((proj) => {
        const accentKey = Array.from(proj.classList)
          .find((c) => c.startsWith('project-') && PROJECT_ACCENT[c.slice(8)])
          ?.slice(8)
        const color = PROJECT_ACCENT[accentKey]
        if (!color) return

        ScrollTrigger.create({
          trigger: proj,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setAccent(color)
          },
        })
      })

      /* ============================================================
         HERO LOAD-IN
         ============================================================ */
      const hero = document.querySelector('.hero')
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: EASE, duration: 1.1 } })
        tl.from('.hero-tag', { opacity: 0, y: 22 })
          .from('.hero-line', { opacity: 0, y: 80, duration: 1.4, stagger: 0.12 }, '-=0.85')
          .from('.hero-desc', { opacity: 0, y: 24 }, '-=1.1')
          .from('.hero-ctas .btn', { opacity: 0, y: 22, stagger: 0.09 }, '-=1.0')
          .from('.hero-marquee', { opacity: 0, duration: 1.2 }, '-=0.8')

        gsap.to('.hero-bg', {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-title', {
          yPercent: -22,
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-marquee', {
          yPercent: 80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
      }

      /* ============================================================
         FLOW HEADERS — eyebrow widens, title slides up
         ============================================================ */
      gsap.utils.toArray('.flow-header').forEach((header) => {
        const eyebrow = header.querySelector('.flow-eyebrow')
        const title = header.querySelector('.flow-title')
        if (eyebrow) {
          gsap.from(eyebrow, {
            opacity: 0, y: 16, letterSpacing: '0.5em', duration: 1.1, ease: EASE,
            scrollTrigger: { trigger: header, start: 'top 85%' },
          })
        }
        if (title) {
          gsap.from(title, {
            opacity: 0, y: 50, duration: 1.3, ease: EASE,
            scrollTrigger: { trigger: header, start: 'top 85%' },
          })
        }
      })

      /* ============================================================
         STATS — count-up + rise
         ============================================================ */
      gsap.utils.toArray('.stat').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 1.0, ease: EASE, delay: i * 0.08,
          scrollTrigger: { trigger: '.stats-row', start: 'top 88%' },
        })
      })

      gsap.utils.toArray('[data-countup]').forEach((el) => {
        const target = parseFloat(el.dataset.countup)
        if (Number.isNaN(target)) return
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        const suffix = el.dataset.suffix || ''
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 1.8, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals) + suffix
          },
        })
      })

      /* ============================================================
         PORTFOLIO — numeral overshoots, glyph strokes draw, body slides
         ============================================================ */
      gsap.utils.toArray('.project').forEach((proj) => {
        const numeral = proj.querySelector('.project-numeral')
        const body = proj.querySelector('.project-body')
        const glyphStrokes = proj.querySelectorAll('.glyph-stroke')
        const glyphAxes = proj.querySelectorAll('.glyph-axis')
        const glyphMarks = proj.querySelectorAll('.glyph-dot, .glyph-node, .glyph-mark')
        const isEven = proj.classList.contains('is-even')

        if (numeral) {
          gsap.from(numeral, {
            opacity: 0,
            y: 80,
            scale: 0.85,
            rotate: isEven ? 4 : -4,
            duration: 1.4,
            ease: EASE,
            scrollTrigger: { trigger: proj, start: 'top 82%' },
          })
        }

        if (body) {
          const dir = isEven ? 50 : -50
          gsap.from(body.children, {
            opacity: 0, y: 30, x: dir, duration: 0.95, ease: EASE,
            stagger: 0.08, delay: 0.15,
            scrollTrigger: { trigger: proj, start: 'top 82%' },
          })
        }

        /* Glyph axes fade in first as scaffolding */
        if (glyphAxes.length) {
          gsap.from(glyphAxes, {
            opacity: 0, duration: 0.6, ease: 'power2.out',
            stagger: 0.05, delay: 0.1,
            scrollTrigger: { trigger: proj, start: 'top 78%' },
          })
        }

        /* Each stroke draws via stroke-dashoffset */
        glyphStrokes.forEach((stroke) => {
          const len = typeof stroke.getTotalLength === 'function'
            ? stroke.getTotalLength()
            : 200
          gsap.set(stroke, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(stroke, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power3.out',
            delay: 0.35,
            scrollTrigger: { trigger: proj, start: 'top 78%' },
          })
        })

        /* Dots / nodes pop in last */
        if (glyphMarks.length) {
          gsap.from(glyphMarks, {
            scale: 0,
            opacity: 0,
            transformOrigin: 'center',
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(2)',
            delay: 0.9,
            scrollTrigger: { trigger: proj, start: 'top 78%' },
          })
        }
      })

      /* ============================================================
         WORKSPACE — rows slide in with their dot pulse
         ============================================================ */
      gsap.utils.toArray('.workspace-row').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: -40, duration: 0.95, ease: EASE, delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      /* ============================================================
         ABOUT — paragraphs stagger; skill bars fill from zero
         ============================================================ */
      gsap.utils.toArray('.about-text p').forEach((p, i) => {
        gsap.from(p, {
          opacity: 0, y: 30, duration: 1, ease: EASE, delay: i * 0.08,
          scrollTrigger: { trigger: '.about-text', start: 'top 82%' },
        })
      })

      gsap.utils.toArray('.skill-fill').forEach((bar) => {
        const target = bar.style.width
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: target, duration: 1.5, ease: EASE,
            scrollTrigger: { trigger: bar, start: 'top 90%' },
          },
        )
      })

      gsap.utils.toArray('.skill-item').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: 30, duration: 0.85, ease: EASE, delay: i * 0.06,
          scrollTrigger: { trigger: '.skills-list', start: 'top 85%' },
        })
      })

      /* ============================================================
         CONTACT — title scales, aurora pulses
         ============================================================ */
      const contact = document.querySelector('.contact')
      if (contact) {
        gsap.from(contact.querySelector('.contact-eyebrow'), {
          opacity: 0, y: 20, letterSpacing: '0.5em', duration: 1.1, ease: EASE,
          scrollTrigger: { trigger: contact, start: 'top 80%' },
        })
        gsap.from(contact.querySelector('.contact-title'), {
          opacity: 0, y: 60, scale: 0.94, duration: 1.4, ease: EASE,
          scrollTrigger: { trigger: contact, start: 'top 80%' },
        })
        gsap.from(contact.querySelector('.contact-sub'), {
          opacity: 0, y: 24, duration: 1, ease: EASE, delay: 0.15,
          scrollTrigger: { trigger: contact, start: 'top 80%' },
        })
        gsap.from(contact.querySelectorAll('.contact-links .btn'), {
          opacity: 0, y: 24, stagger: 0.1, duration: 1, ease: EASE, delay: 0.3,
          scrollTrigger: { trigger: contact, start: 'top 80%' },
        })
      }

      /* ============================================================
         GENERIC FALLBACK
         ============================================================ */
      gsap.utils.toArray('.scroll-reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      /* Refresh once after fonts/layout settle so triggers measure correctly. */
      const refresh = () => ScrollTrigger.refresh()
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)
      window.addEventListener('load', refresh, { once: true })
    })

    /* ============================================================
       MAGNETIC BUTTONS — pull toward cursor on hover
       ============================================================ */
    const magnets = Array.from(document.querySelectorAll('.magnetic'))
    const magnetState = new Map()

    const onMagnetMove = (el) => (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.25
      const dy = (e.clientY - cy) * 0.35
      gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: 'power3.out' })
    }

    const onMagnetLeave = (el) => () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    }

    magnets.forEach((el) => {
      const move = onMagnetMove(el)
      const leave = onMagnetLeave(el)
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      magnetState.set(el, { move, leave })
    })

    return () => {
      ctx.revert()
      magnets.forEach((el) => {
        const handlers = magnetState.get(el)
        if (!handlers) return
        el.removeEventListener('mousemove', handlers.move)
        el.removeEventListener('mouseleave', handlers.leave)
      })
    }
  }, [])
}
