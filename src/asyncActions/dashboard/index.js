import ListTasksService from "../../ListTasksService";
import { setActiveList } from "../../store/activeList/actions";
import { setDashboardAction } from "../../store/dashboard/actions";

export const fetchDashboard = () => dispatch => {
    ListTasksService.getAll()
    .then(res => dispatch(setDashboardAction(res)))
}

export const fetchListById = listId => dispatch => {
    ListTasksService.getListById(listId)
    .then(res => dispatch(setActiveList(res)))
}