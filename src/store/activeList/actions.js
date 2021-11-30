import { type } from "jquery"

export const ACTIVE_LIST_LOADED = 'activeList/loaded'
export const TASK_CREATED = 'task/created'
export const TASK_REMOVED = 'task/removed'

export const setActiveList = (payload) => ({type: ACTIVE_LIST_LOADED, payload})
export const addTaskToActiveList = (payload) => ({type: TASK_CREATED, payload})
export const removeTaskFromList = (payload) => ({type: TASK_REMOVED, payload})
