import React from "react";
import ListTasksService from "../ListTasksService";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dashboardSelector } from "../store/dashboard/reducer";
import { fetchDashboard } from "../asyncActions";

const Sidebar = () => {

    const dispatch = useDispatch()

    const dashboard = useSelector(dashboardSelector)
    const state = useSelector(state => state)

    useEffect(() => {
      dispatch(fetchDashboard())
    }, [])
    
    console.log(dashboard);

    return (
      <div className="sidebar">
         

            <ul className="list-group w-100">
                {dashboard.lists.map(l => 
    
                    <li key={l.listId} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <NavLink to={`/lists-tasks/${l.listId}`} >{l.title}</NavLink>
                      {dashboard.openedTasks[l.listId] ? <span className="badge badge-primary badge-pill">{dashboard.openedTasks[l.listId]}</span> : ''}
                    </li>
                )}
            </ul>
            <NavLink to={'/today'} className="text-success mt-3">Tasks For Today</NavLink>
      </div>  
    )
}

export default Sidebar;