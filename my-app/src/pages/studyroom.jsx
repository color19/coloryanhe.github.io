import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import StudyroomPage from '../components/project/StudyroomPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyroomPage />
  </StrictMode>,
)
