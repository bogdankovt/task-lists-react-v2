
import * as actions from '../types'

export const setActiveList = (payload) => ({type: actions.ACTIVE_LIST_LOADED, payload})
export const addTaskToActiveList = (payload) => ({type: actions.TASK_CREATED, payload})
export const updateTaskFromList = (payload) => ({type: actions.TASK_UPDATED, payload})
export const removeTaskFromList = (payload) => ({type: actions.TASK_REMOVED, payload})

