const dock = [
  {
    cls: 'd-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/colorho/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 7a1.97 1.97 0 0 0 0-3.94ZM20.44 13.4c0-3.1-1.66-4.54-3.86-4.54-1.78 0-2.58.98-3.02 1.67V8.5h-3.38c.04.96 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.69.12-.93.27-.69.88-1.4 1.92-1.4 1.35 0 1.9 1.03 1.9 2.55V20h3.38l-.44-6.6Z" />
      </svg>
    ),
  },
  {
    cls: 'd-github',
    label: 'GitHub',
    href: 'https://github.com/color19',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    cls: 'd-mail',
    label: 'yanhe2026@gmail.com',
    href: 'mailto:yanhe2026@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    cls: 'd-resume',
    label: 'Resume (PDF)',
    href: '/resume.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    ),
  },
]

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <h2 data-reveal>Let&rsquo;s talk.</h2>
        <p className="lede">
          Open to markets research, quant, and FP&amp;A roles in New York or DC.
          The fastest way to reach me is email.
        </p>
        <p className="contact-auth">
          Eligible for up to 3 years of U.S. work authorization under STEM OPT.
        </p>
        <nav className="dock" aria-label="Contact links">
          {dock.map((d) => (
            <a
              key={d.cls}
              className={d.cls}
              href={d.href}
              aria-label={d.label}
              {...(d.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {d.icon}
              <span>{d.label}</span>
            </a>
          ))}
        </nav>

        <footer className="site-footer">
          <span>&copy; 2026 Yan (Color) He</span>
          <span>Washington, DC</span>
        </footer>
      </div>
    </section>
  )
}

export default Contact
