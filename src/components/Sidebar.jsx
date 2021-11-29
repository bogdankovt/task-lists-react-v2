import React from "react";
import ListTasksService from "../ListTasksService";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboard } from "../asyncActions/dashboard";

const Sidebar = () => {
    // const [lists, setLists] = useState([]);
    const dispatch = useDispatch()
    const lists = useSelector(state => state.dashboard.lists)

    console.log(lists)

    useEffect(() => {
      dispatch(fetchDashboard())
    }, [])
    // const updateLists = () => {
    //   ListTasksService.getAll()
    //     .then(res => {
    //       setLists(res.lists)
    //     })
    // }

    // useEffect(() => {
    //   updateLists()
    // }, []);

    

    return (
      <div className="sidebar">
         

            <ul className="list-group w-100">
                {lists.map(l => 
    
                    <li key={l.listId} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <NavLink to={`/lists-tasks/${l.listId}`} >{l.title}</NavLink>
                      {l.countNotDoneTask ? <span className="badge badge-primary badge-pill">{l.countNotDoneTask}</span> : ''}
                    </li>
                )}
            </ul>
            <NavLink to={'/today'} className="text-success mt-3">Tasks For Today</NavLink>
      </div>  
    )
}

export default Sidebar;