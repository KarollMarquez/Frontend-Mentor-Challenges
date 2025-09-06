export const filteredExtensions = (state, action) => {
    switch(action.type){
        case 'set':
            return {all: action.payload}
        case 'remove':
            const removed = state.all.filter(extension => extension.name !== action.payload);
            return {...state, all: removed}
        case 'edit':
            const update = state.all.map(extension => {
                if(extension.name === action.payload){
                    return {...extension, isActive: !extension.isActive}
                }
                return extension
            })
            return { all: update}
    }
}