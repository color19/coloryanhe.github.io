import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Work from './components/Work'
import NotYet from './components/NotYet'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import './App.css'

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Projects />
        <Work />
        <NotYet />
        <Contact />
      </main>
    </>
  )
}

export default App
