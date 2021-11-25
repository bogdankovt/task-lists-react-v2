import React from "react";
import ListTasksService from "../ListTasksService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [lists, setLists] = useState([]);

    const updateLists = () => {
      ListTasksService.getAll()
        .then(res => {
          setLists(res.lists)
        })
    }

    useEffect(() => {
      updateLists()
    }, []);

    // const changeActiveList = (lisId) => {
    //     props.onClick(lisId);
    // }  
    return (
      <div className="sidebar">
         

            <ul className="list-group w-100">
                <li className=" text-white list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-primary ">
                  <Link to={'/today'} className="text-white">Tasks For Today</Link>
                </li>
                {lists.map(l => 
    
                    <li key={l.listId} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <Link to={`/lists-tasks/${l.listId}`} activeClassName="current" >{l.title}</Link>
                      {l.countNotDoneTask ? <span className="badge badge-primary badge-pill">{l.countNotDoneTask}</span> : ''}
                    </li>
                    
                )}
              
            </ul>

          
      </div>  
    )
}

export default Sidebar;