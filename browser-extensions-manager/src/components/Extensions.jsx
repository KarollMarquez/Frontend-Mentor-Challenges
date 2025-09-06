import '../styles/extensions.css'
import { ThemeContext } from '../contexts/themeContext'
import { useContext } from 'react'

export function Extensions({extensions, dispatch}){
    
    const {theme} = useContext(ThemeContext)

    return(
        <div className="extensions">
            {
                extensions.map((extension, index) => (
                    <article key={index} className={`t${theme}`}>
                        <div className={`extension-info t${theme}`}>
                            <img src={extension.logo} alt={extension.name} />
                            <div>
                                <h3>{extension.name}</h3>
                                <p>{extension.description}</p>
                            </div>
                        </div>
                        <div className='options'>
                            <button className={`remove-btn t${theme}`} onClick={() => dispatch({type: 'remove', payload: extension.name})}>Remove</button>
                            <div className={`toggle-btn t${theme} ${extension.isActive}`} onClick={() => dispatch({type: 'edit', payload: extension.name})}>
                                <span className={`toggle-circle t${theme}`}></span>
                            </div>
                        </div>
                    </article>
                ))
            }
        </div>
    )
}