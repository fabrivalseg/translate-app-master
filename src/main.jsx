import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TranslateApp from './TranslateApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslateApp />
  </StrictMode>,
)
