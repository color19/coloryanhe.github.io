import { useEffect } from 'react'
import CherryBlossoms from './components/CherryBlossoms'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import Workspace from './components/Workspace'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <>
      <CherryBlossoms />
      <Navbar />
      <Hero />
      <div className="rainbow-divider" />
      <Stats />
      <Portfolio />
      <div className="rainbow-divider" />
      <Workspace />
      <About />
      <div className="rainbow-divider" />
      <Contact />
      <Footer />
    </>
  )
}

export default App
