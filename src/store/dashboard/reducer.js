import { combineReducers } from "redux";
import {
    TASK_CREATED,
    TASK_UPDATED,
    TASK_REMOVED,
    DASHBOARD_LOADED
} from "../types"

const toOpenedTasks = (arr) => arr.reduce((a, b) => ({ ...a, [b['listId']]: b.countNotDoneTask }), {})

const openedTasksReducer = (state = {}, action) => {
    const listId = action.payload?.listId;
    switch (action.type) {
        case DASHBOARD_LOADED:
            return toOpenedTasks(action.payload.lists);

        case TASK_CREATED:
            return { ...state, [listId]: state[listId] + 1 };

        case TASK_UPDATED:
            const { task, newTask } = action.payload
            return { ...state, [task.listId]: state[task.listId] + (task.isDone - newTask.isDone) }

        case TASK_REMOVED:
            return action.payload.isDone ? state : { ...state, [listId]: state[listId] - 1 }

        default:
            return state;
    }
}

export const dashboardReducer = combineReducers({
    tasksForToday: (state = 0, { type, payload }) => type === DASHBOARD_LOADED ? payload.tasksForToday : state,
    lists: (state = [], { type, payload }) => type === DASHBOARD_LOADED ? payload.lists : state,
    openedTasks: openedTasksReducer
})

export const dashboardSelector = state => state.dashboard

