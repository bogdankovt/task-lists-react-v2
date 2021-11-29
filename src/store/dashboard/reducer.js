import { DASHBOARD_LOADED } from "./actions";


const dashboardInit = {
    tasksForToday: 0,
    lists: []
}


export const dashboardReducer = (state = dashboardInit, action) => {
    switch(action.type) {
        case DASHBOARD_LOADED: 
            return {...action.payload}
        default:
            return state;
    }
}

