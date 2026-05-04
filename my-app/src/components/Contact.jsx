function Contact() {
  return (
    <section className="contact" id="contact" data-section="contact">
      <div className="contact-aurora" aria-hidden="true" />
      <div className="contact-inner">
        <p className="flow-eyebrow contact-eyebrow">The end of the spectrum</p>
        <h2 className="contact-title">
          Let&rsquo;s <em>connect.</em>
        </h2>
        <p className="contact-sub">
          Open to investment banking, research, and quant roles.
        </p>
        <div className="contact-links">
          <a href="mailto:yanhe2026@gmail.com" className="btn btn-primary magnetic">
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/colorho/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost magnetic"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/color19/coloryanhe.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost magnetic"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
