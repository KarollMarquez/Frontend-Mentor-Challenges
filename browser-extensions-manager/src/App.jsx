import { useContext, useEffect, useReducer} from 'react'
import './styles/App.css'
import { NavBar } from './components/NavBar'
import { FilterContext } from './contexts/filterContext';
import { ThemeContext } from './contexts/themeContext'
import { Title } from './components/Title';
import { filteredExtensions } from './reducer/extensions.js';
import { Extensions } from './components/Extensions';

function App() {

  const {theme} = useContext(ThemeContext);
  const {filter} = useContext(FilterContext);
  const [extensions, dispatch] = useReducer(filteredExtensions, {all: []})
  
  useEffect(() => {
    fetch("./data.json")
    .then(response => response.json())
    .then(data => dispatch({type: 'set', payload: data}))
  }, [dispatch])

  const extensionsFiltered = filter === 'all'
    ? extensions.all
    : filter === 'active'
      ? extensions.all.filter(e => e.isActive)
      : extensions.all.filter(e => !e.isActive)

  return (
    <div className={`${theme} app`}>
      <div>
        <NavBar />
        <Title />
        <Extensions extensions={extensionsFiltered} dispatch={dispatch}/>
        <div className={`attribution theme-${theme}`}>
          <p>Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.</p>
          <p>Coded by <a href="#">Karoll Marquez</a>.</p>
        </div>
      </div>
    </div>
  )
}

export default App
