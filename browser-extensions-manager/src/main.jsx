import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeProvider.jsx'
import { FilterProvider } from  './contexts/FilterProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </ThemeProvider>
)
