import { map } from "jquery";
import * as actions from "../types"
import { useSelector } from "react-redux";
import { activeListSelector } from "../activeList/reducer";

const toOpenedTasks = (arr) => arr.reduce((a,b) => ({...a, [b['listId']]: b.countNotDoneTask}), {})


const dashboardInit = {
    tasksForToday: 0,
    lists: [],
    openedTasks: {} 
}

export const dashboardReducer = (state = dashboardInit, action) => {
    switch (action.type) {
        case actions.DASHBOARD_LOADED:
            return { ...action.payload, openedTasks: toOpenedTasks(action.payload.lists)};

        case actions.TASK_CREATED: 
            return {...state, openedTasks: {...state.openedTasks, [action.payload.listId] : state.openedTasks[action.payload.listId] +1}} 

        case actions.TASK_UPDATED:
            const {task, newTask} = action.payload
            return {...state, openedTasks: {...state.openedTasks, [task.listId] : state.openedTasks[task.listId] + (task.isDone - newTask.isDone)}} 

        case actions.TASK_REMOVED:
            return {...state, openedTasks: action.payload.isDone ? {...state.openedTasks} : {...state.openedTasks, [action.payload.listId] : state.openedTasks[action.payload.listId] -1}} 

        default:
            return state;
    }
}

export const dashboardSelector = state => state.dashboard

