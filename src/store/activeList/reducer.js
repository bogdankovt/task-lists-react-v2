import { LOAD_ACTIVE_LIST } from "./actions"


const activeListInit = {
    listId: 0,
    title: '',
    tasks: []
}
export const activeListReducer = (state = activeListInit, action) => {
    switch(action.type){

        case LOAD_ACTIVE_LIST: return {...action.payload}

        default:
            return state
    } 
}


