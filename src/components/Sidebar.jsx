import React from "react";
import listTasksService from "../ListTasksService";



const Sidebar = ({lists, ...props}) => {

    const changeActiveList = (lisId) => {
        props.onClick(lisId);
    }  
    return (
      <div className="sidebar">
         

            <ul className="list-group w-100">
                {lists.map(l => 
    
                    <li key={l.listId} onClick={() => changeActiveList(l.listId)} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      {l.title}
                      {l.countNotDoneTask ? <span className="badge badge-primary badge-pill">{l.countNotDoneTask}</span> : ''}
                    </li>

                )}
              
            </ul>

          
      </div>  
    )
}

export default Sidebar;