import AmbientField from './components/AmbientField'
import CherryBlossoms from './components/CherryBlossoms'
import CustomCursor from './components/CustomCursor'
import SpectrumSpine from './components/SpectrumSpine'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import Workspace from './components/Workspace'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import './App.css'

function App() {
  useScrollAnimations()

  return (
    <>
      <AmbientField />
      <CherryBlossoms />
      <SpectrumSpine />
      <CustomCursor />
      <Navbar />
      <main className="page-flow">
        <Hero />
        <Stats />
        <Portfolio />
        <Workspace />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
