import { useState } from 'react';
import { FilterContext } from './filterContext'

export function FilterProvider({children}){
    const [filter, setFilter] = useState('all');
    
    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}