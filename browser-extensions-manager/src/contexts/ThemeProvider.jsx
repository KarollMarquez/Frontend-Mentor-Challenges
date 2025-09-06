import { useState } from "react"
import { ThemeContext } from "./themeContext"

export function ThemeProvider({children}){
    const [theme, setTheme] = useState('dark');

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}