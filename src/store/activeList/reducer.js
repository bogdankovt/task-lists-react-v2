import * as activeList from "./actions"


const activeListInit = {
    listId: 0,
    title: '',
    tasks: []
}

const removeElInArray = (elem, arr) => {
    return arr.filter(t => t.taskId != elem.taskId)
}


export const activeListReducer = (state = activeListInit, action) => {
    switch(action.type){

        case activeList.ACTIVE_LIST_LOADED: 
            return {...action.payload}

        case activeList.TASK_CREATED: 
            return {...state, tasks: [...state.tasks, action.payload]}
        
        case activeList.TASK_REMOVED:
            return {...state, tasks: removeElInArray(action.payload, state.tasks)}

        default:
            return state
    } 
}

export const activeListSelector = state => state.activeList

