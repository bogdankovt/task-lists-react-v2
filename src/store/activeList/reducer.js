import * as actions from '../types'


const activeListInit = {
    listId: 0,
    title: '',
    tasks: []
}
const updateTaskFromArray = ({task, newTask}, arr) => {
    let newArr = [...arr]
    const taskIndex = arr.findIndex(e => e.taskId == task.taskId)
    const updatedElement = newArr[taskIndex]
    
    updatedElement.title = newTask.title
    updatedElement.desc = newTask.desc
    updatedElement.isDone = newTask.isDone
    updatedElement.dueDate = newTask.dueDate
    return newArr
}

const removeElInArray = (elem, arr) => {
    return arr.filter(t => t.taskId != elem.taskId)
}

export const activeListReducer = (state = activeListInit, action) => {
    switch(action.type){

        case actions.ACTIVE_LIST_LOADED: 
            return {...action.payload}

        case actions.TASK_CREATED: 
            return {...state, tasks: [...state.tasks, action.payload]}
        
        case actions.TASK_UPDATED: 
            return {...state, tasks: updateTaskFromArray(action.payload, state.tasks)}
                
        case actions.TASK_REMOVED:
            return {...state, tasks: removeElInArray(action.payload, state.tasks)}

        default:
            return state
    } 
}

export const activeListSelector = state => state.activeList

