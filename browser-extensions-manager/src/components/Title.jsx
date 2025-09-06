import { useContext } from 'react'
import '../styles/title.css'
import { ThemeContext } from '../contexts/themeContext'
import { FilterContext } from '../contexts/filterContext';

export function Title(){
    const {filter, setFilter} = useContext(FilterContext);
    const {theme} = useContext(ThemeContext)

    return(
        <header className={`t${theme}`}>
            <h1>Extensions List</h1>
            <div>
                <button className={`filter-btn t${theme} ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                <button className={`filter-btn t${theme} ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
                <button className={`filter-btn t${theme} ${filter === 'inactive' ? 'active' : ''}`} onClick={() => setFilter('inactive')}>Inactive</button>
            </div>
        </header>
    )
}