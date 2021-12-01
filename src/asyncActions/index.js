import ListTasksService from "../ListTasksService";
import { createTaskForListAction, setActiveListAction, removeTaskFromListAction, updateTaskFromListAction } from "../store/activeList/actions"
import { setDashboardAction, } from "../store/dashboard/actions";

export const fetchDashboard = () => dispatch => {
    ListTasksService.getAll()
        .then(setDashboardAction)
        .then(dispatch)
}

export const fetchListById = listId => dispatch => {
    ListTasksService.getListById(listId)
        .then(setActiveListAction)
        .then(dispatch)
}

export const createTask = task => dispatch => {
    ListTasksService.createTaskForList(task)
        .then(createTaskForListAction)
        .then(dispatch);
}

export const updateTask = (task, newTask) => dispatch => {
    ListTasksService.updateTask(newTask)
        .then(() => updateTaskFromListAction({ task, newTask }))
        .then(dispatch)
}

export const deleteTask = task => dispatch => {
    ListTasksService.removeTask(task.taskId)
        .then(() => removeTaskFromListAction(task))
        .then(dispatch);
}
