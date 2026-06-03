import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
//import App from './testing/test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
