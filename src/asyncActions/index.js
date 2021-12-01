import ListTasksService from "../ListTasksService";
import { addTaskToActiveList, setActiveList, removeTaskFromList, updateTaskFromList } from "../store/activeList/actions"
import { setDashboardAction,  } from "../store/dashboard/actions";

export const fetchDashboard = () => dispatch => {
    ListTasksService.getAll()
    .then(setDashboardAction)
    .then(dispatch)
}

export const fetchListById = listId => dispatch => {
    ListTasksService.getListById(listId)
    .then(setActiveList)
    .then(dispatch)
}

export const createTask = task => dispatch => {
    ListTasksService.createTaskForList(task)
    .then(addTaskToActiveList)
    .then(dispatch);        
}

export const updateTask = (task, newTask) => dispatch => {
    ListTasksService.updateTask(newTask)
    .then(() => updateTaskFromList({task, newTask}))
    .then(dispatch)      
}

export const deleteTask = task => dispatch => {
    ListTasksService.removeTask(task.taskId)
    .then(() => removeTaskFromList(task))
    .then(dispatch);        
}
