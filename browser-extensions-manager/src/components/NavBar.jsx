import { useContext } from "react"
import { ThemeContext } from "../contexts/themeContext"
import '../styles/nav.css'

export function NavBar(){
    const {theme, setTheme} = useContext(ThemeContext)

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark' );
    }

    return(
        <nav className={`nav t${theme}`}>
            <img src="./assets/logo.svg" alt="Extensions Logo" />
            {
                theme == 'dark' ?
                <img className={`themeIcon t${theme}`} src= "./assets/icon-sun.svg" alt="Sun Icon" onClick={toggleTheme}/>:
                <img className={`themeIcon t${theme}`} src= "./assets/icon-moon.svg" alt="Moon Icon" onClick={toggleTheme}/>
            }
        </nav>
    )
}