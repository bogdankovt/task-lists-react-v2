
import * as actions from '../types'

export const setActiveListAction = (payload) => ({type: actions.ACTIVE_LIST_LOADED, payload})
export const createTaskForListAction = (payload) => ({type: actions.TASK_CREATED, payload})
export const updateTaskFromListAction = (payload) => ({type: actions.TASK_UPDATED, payload})
export const removeTaskFromListAction = (payload) => ({type: actions.TASK_REMOVED, payload})

