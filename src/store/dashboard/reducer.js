import { map } from "jquery";
import * as dashboard from "./actions";
import * as activeList from "../activeList/actions"
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
        case dashboard.DASHBOARD_LOADED:
            return { ...action.payload, openedTasks: toOpenedTasks(action.payload.lists)};

        case activeList.TASK_CREATED: 
            return {...state, openedTasks: {...state.openedTasks, [action.payload.listId] : state.openedTasks[action.payload.listId] +1}} 

        case activeList.TASK_REMOVED:
            return {...state, openedTasks: {...state.openedTasks, [action.payload.listId] : state.openedTasks[action.payload.listId] -1}} 

        default:
            return state;
    }
}

export const dashboardSelector = state => state.dashboard

