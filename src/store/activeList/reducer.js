import * as actions from '../types'


const activeListInit = {
    listId: 0,
    title: '',
    tasks: []
}
const updateTaskFromList = ({newTask}, arr) => {
    return arr.map(t => t.taskId === newTask.taskId ? newTask : t)
}

const removeTaskFromList = (elem, arr) => {
    return arr.filter(t => t.taskId !== elem.taskId)
}

export const activeListReducer = (state = activeListInit, action) => {
    switch(action.type){

        case actions.ACTIVE_LIST_LOADED: 
            return {...action.payload}

        case actions.TASK_CREATED: 
            return {...state, tasks: [...state.tasks, action.payload]}
        
        case actions.TASK_UPDATED: 
            return {...state, tasks: updateTaskFromList(action.payload, state.tasks)}
                
        case actions.TASK_REMOVED:
            return {...state, tasks: removeTaskFromList(action.payload, state.tasks)}

        default:
            return state
    } 
}

export const activeListSelector = state => state.activeList

