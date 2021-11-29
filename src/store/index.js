import { applyMiddleware, combineReducers, createStore } from "redux";
import { dashboardReducer } from "./dashboard/reducer";
import { activeListReducer } from "./activeList/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import  thunk  from "redux-thunk"

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    activeList: activeListReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))